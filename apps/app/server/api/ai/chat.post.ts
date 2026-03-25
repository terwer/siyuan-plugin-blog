/**
 * AI Chat API - 服务端代理
 * 
 * 安全地处理 AI 请求：
 * - 内置模型：使用服务端 private config（不暴露 API key）
 * - 自定义模型：使用用户提供的配置（客户端传参）
 * 
 * 模式区分：
 * - mode: 'builtin' | 'custom'
 * - builtin: 无次数限制（或服务端控制）
 * - custom: 客户端计数
 */

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const body = await readBody(event)

    const { mode, messages, customConfig } = body

    // 验证必填参数
    if (!messages || !Array.isArray(messages)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Messages array is required'
        })
    }

    // 确定 API 配置
    let baseUrl: string
    let apiKey: string
    let model: string

    if (mode === 'custom' && customConfig) {
        // 自定义模型模式（用户自己配置的 API）
        baseUrl = customConfig.baseUrl || 'https://api.openai.com'
        apiKey = customConfig.apiKey || ''
        model = customConfig.model || 'gpt-3.5-turbo'

        if (!apiKey) {
            throw createError({
                statusCode: 400,
                statusMessage: 'API Key is required for custom model'
            })
        }
    } else {
        // 内置模型模式（使用服务端 private config）
        baseUrl = config.aiBaseUrl as string
        apiKey = config.aiApiKey as string
        model = config.aiModel as string

        if (!apiKey) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Builtin AI is not configured. Please set NUXT_AI_API_KEY env variable or use custom mode.'
            })
        }
    }

    try {
        const response = await fetch(`${baseUrl}/v1/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model,
                max_tokens: 2048,
                temperature: 0.7,
                messages,
            }),
        })

        if (!response.ok) {
            const errorText = await response.text()
            console.error('AI API Error:', response.status, errorText)

            throw createError({
                statusCode: response.status,
                statusMessage: `AI API Error: ${response.status} ${errorText.slice(0, 100)}`
            })
        }

        const data = await response.json()

        // 返回结果和模式标记
        return {
            success: true,
            mode, // 返回模式，客户端据此决定是否计数
            data: {
                choices: data.choices,
                usage: data.usage,
            }
        }

    } catch (error: any) {
        console.error('AI Chat API Error:', error)

        // 如果是已经创建的错误，直接抛出
        if (error.statusCode) {
            throw error
        }

        // 网络或其他错误
        throw createError({
            statusCode: 500,
            statusMessage: error.message || 'Network request failed'
        })
    }
})
