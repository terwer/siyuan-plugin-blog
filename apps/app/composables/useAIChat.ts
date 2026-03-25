/**
 * useAIChat - AI 自由聊天核心逻辑
 *
 * 定位：基于文档上下文的多轮对话
 * - 将文档内容作为 system prompt 上下文
 * - 支持多轮对话历史
 * - 使用与 useAISummary 相同的 AI 服务
 *
 * 架构分层：
 *   AIPanel → useAIChat (composable) → callAI (内置服务)
 */

// ==================== 类型定义 ====================

/** AI 服务配置（可选覆盖，默认使用内置代理） */
export interface AIChatConfig {
  baseUrl?: string
  apiKey?: string
  model?: string
}

/** 聊天消息 */
export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

// ==================== 内容预处理 ====================

function preprocessHtmlContent(html: string): string {
  if (!html) return ""

  let content = html
    // 保留标题结构
    .replace(/<h([1-3])[^>]*>([\s\S]*?)<\/h\1>/gi, (_, level, t) =>
      `${"#".repeat(Number(level))} ${t.replace(/<[^>]+>/g, "")}\n`
    )
    // 保留列表项
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, t) =>
      `- ${t.replace(/<[^>]+>/g, "").trim()}\n`
    )
    // 保留加粗
    .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, (_, t) =>
      `**${t.replace(/<[^>]+>/g, "")}**`
    )
    // 去除所有剩余标签
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, "\n\n")
    .trim()

  // 控制 token 长度
  if (content.length > 6000) {
    content = content.substring(0, 6000) + "\n...(内容已截断)"
  }

  return content
}

// ==================== AI 调用 ====================

function buildSystemPrompt(title: string, content: string): string {
  return `你是一个专业的文档阅读助手。以下是用户正在阅读的文档内容，请根据文档回答用户的问题。

文档标题：${title}

文档内容：
${content}

请注意：
1. 优先基于文档内容回答问题
2. 如果问题超出文档范围，可以结合你的知识给出建议，但要说明这不是来自文档
3. 回答要简洁清晰，使用中文回复`
}

function cleanAIResponse(text: string): string {
  // 去除思考链（qwen3 等模型输出）
  return text.replace(/<think>[\s\S]*?<\/think>/gi, "").trim()
}

function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

interface AIMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

async function callAI(
  messages: AIMessage[],
  config: AIChatConfig
): Promise<{ success: boolean; content?: string; error?: string }> {
  const baseUrl = config.baseUrl || "https://ai.terwer.space"
  const apiKey = config.apiKey || "sk-105036"
  const model = config.model || "qwen3-max"

  try {
    const res = await fetch(`${baseUrl}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        max_tokens: 2048,
        temperature: 0.7,
        messages,
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      return { success: false, error: `API 请求失败: ${res.status} ${errText.slice(0, 100)}` }
    }

    const data = await res.json()

    if (!data.choices || data.choices.length === 0) {
      return { success: false, error: data.msg || data.message || "AI 返回空结果" }
    }

    const rawText = data.choices[0].message?.content ?? ""
    const content = cleanAIResponse(rawText)

    return { success: true, content }
  } catch (e: any) {
    return { success: false, error: e?.message ?? "网络请求失败" }
  }
}

// ==================== Composable ====================

export function useAIChat(
  title: Ref<string> | string,
  htmlContent: Ref<string> | string
) {
  const _title = isRef(title) ? title : ref(title)
  const _html = isRef(htmlContent) ? htmlContent : ref(htmlContent)

  const messages = ref<ChatMessage[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // 预处理后的文档内容（缓存）
  const processedContent = computed(() => preprocessHtmlContent(_html.value))

  const sendMessage = async (userInput: string, config: AIChatConfig = {}) => {
    if (!userInput.trim()) {
      error.value = "请输入消息"
      return
    }

    if (!_html.value) {
      error.value = "文档内容为空"
      return
    }

    isLoading.value = true
    error.value = null

    // 添加用户消息
    const userMessage: ChatMessage = {
      id: generateMessageId(),
      role: 'user',
      content: userInput.trim(),
      timestamp: Date.now(),
    }
    messages.value.push(userMessage)

    try {
      // 构建消息列表：system + 历史消息
      const aiMessages: AIMessage[] = [
        { role: 'system', content: buildSystemPrompt(_title.value, processedContent.value) },
        ...messages.value.map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        })),
      ]

      const res = await callAI(aiMessages, config)

      if (!res.success || !res.content) {
        error.value = res.error ?? "发送失败，请重试"
        // 移除刚添加的用户消息
        messages.value.pop()
        return
      }

      // 添加助手回复
      const assistantMessage: ChatMessage = {
        id: generateMessageId(),
        role: 'assistant',
        content: res.content,
        timestamp: Date.now(),
      }
      messages.value.push(assistantMessage)
    } catch (e: any) {
      error.value = e?.message ?? "发送失败"
      // 移除刚添加的用户消息
      messages.value.pop()
    } finally {
      isLoading.value = false
    }
  }

  const clearMessages = () => {
    messages.value = []
    error.value = null
  }

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  }
}
