/**
 * AI Models API - 获取可用模型列表
 * 
 * 支持两种模式：
 * - builtin: 返回内置模型（从服务端配置获取）
 * - custom: 从用户配置的 API 端点动态拉取可用模型列表
 */

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const query = getQuery(event)

    const { mode, baseUrl: customBaseUrl, apiKey: customApiKey } = query

    // 确定 API 配置
    let baseUrl: string
    let apiKey: string

    if (mode === 'custom') {
        // 自定义模式：使用用户提供的配置
        baseUrl = (customBaseUrl as string) || 'https://api.openai.com'
        apiKey = (customApiKey as string) || ''

        if (!apiKey) {
            return {
                success: false,
                error: 'API Key is required'
            }
        }
    } else {
        // 内置模式：使用服务端配置
        baseUrl = config.aiBaseUrl as string
        apiKey = config.aiApiKey as string

        if (!apiKey) {
            return {
                success: false,
                error: 'Builtin AI is not configured'
            }
        }
    }

    // 规范化 baseUrl
    const normalizeBaseUrl = (url: string): string => {
        let normalized = url.replace(/\/$/, '')
        if (normalized.endsWith('/v1')) {
            normalized = normalized.slice(0, -3)
        }
        return normalized
    }

    const normalizedBaseUrl = normalizeBaseUrl(baseUrl)

    try {
        // 从 API 获取模型列表
        const response = await fetch(`${normalizedBaseUrl}/v1/models`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
            },
        })

        if (!response.ok) {
            return {
                success: false,
                error: `API request failed: ${response.status}`,
                models: []
            }
        }

        const data = await response.json()
        const models = (data.data || []).map((m: any) => ({
            id: m.id,
            name: m.id,
            provider: m.owned_by || 'Custom'
        }))

        // 如果 API 返回空列表，返回错误
        if (models.length === 0) {
            return {
                success: false,
                error: 'No models available from API',
                models: []
            }
        }

        return {
            success: true,
            models
        }

    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch models',
            models: []
        }
    }
})


