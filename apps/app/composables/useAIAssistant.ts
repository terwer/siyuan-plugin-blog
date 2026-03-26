/**
 * useAIAssistant - Unified AI Reading Assistant
 *
 * 统一 AI 助手核心逻辑
 * 定位：将速读、问答、自由聊天整合为单一对话流
 *
 * 设计理念：
 * - 所有 AI 交互都是对话中的气泡
 * - "速读" = 发送预定义的系统指令
 * - "问答" = 发送预定义的 QA 生成指令
 * - "自由聊天" = 用户自定义问题
 *
 * 模型模式：
 * - builtin: 使用服务端内置模型，无次数限制
 * - custom: 使用用户自定义模型，受次数限制
 *
 * 架构优势：
 * - 上下文连续性
 * - Token 效率（文档内容只发送一次）
 * - 统一的使用计数（仅自定义模型）
 * - 更好的用户体验
 */

import { hasMeaningfulTextContent } from "~/utils/content"

// ==================== Type Definitions ====================

/** AI 模型模式 */
export type AIModelMode = "builtin" | "custom"

/** AI 配置 */
export interface AIAssistantConfig {
  mode?: AIModelMode // 内置模型 或 自定义模型
  baseUrl?: string
  apiKey?: string
  model?: string
}

export interface ChatMessage {
  id: string
  role: "system" | "user" | "assistant"
  content: string
  timestamp: number
  type?: "summary" | "qa" | "chat" // 消息类型标记
}

// Note: AISummaryResult and QAItem interfaces removed
// Now using raw Markdown output

// ==================== Content Preprocessing ====================

function preprocessHtmlContent (html: string): string {
  if (!html) { return "" }

  let content = html
    .replace(/<h([1-3])[^>]*>([\s\S]*?)<\/h\1>/gi, (_, level, t) =>
      `${"#".repeat(Number(level))} ${t.replace(/<[^>]+>/g, "")}\n`
    )
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, t) =>
      `- ${t.replace(/<[^>]+>/g, "").trim()}\n`
    )
    .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, (_, t) =>
      `**${t.replace(/<[^>]+>/g, "")}**`
    )
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/\n{3,}/g, "\n\n")
    .trim()

  // Control token length
  if (content.length > 6000) {
    content = content.substring(0, 6000) + "\n...(内容已截断)"
  }

  return content
}

// ==================== AI API Calls ====================

/**
 * 调用 AI API（通过服务端代理）
 *
 * @param messages - 消息数组
 * @param config - AI 配置
 * @param onStream - 流式回调（可选）
 * @returns 成功返回内容和模式，失败返回错误信息
 *
 * 模式区分：
 * - builtin: 使用服务端 private config，无次数限制
 * - custom: 使用用户配置，客户端计数限制
 */
async function callAI (
  messages: any[],
  config: AIAssistantConfig,
  onStream?: (chunk: string) => void
): Promise<{ success: boolean; content?: string; error?: string; mode?: AIModelMode }> {
  const mode = config.mode || "builtin"
  const stream = !!onStream

  try {
    // 调用服务端 API（安全，不暴露 API key）
    const response = await fetch("/api/ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mode,
        messages,
        stream,
        customConfig: mode === "custom"
          ? {
              baseUrl: config.baseUrl,
              apiKey: config.apiKey,
              model: config.model,
            }
          : undefined,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return {
        success: false,
        error: errorData.statusMessage || `API_ERROR_${response.status}`,
        mode
      }
    }

    // 流式响应处理
    if (stream && response.body) {
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let fullContent = ""

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) { break }

          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split("\n")

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6)
              if (data === "[DONE]") { continue }

              try {
                const parsed = JSON.parse(data)
                const delta = parsed.choices?.[0]?.delta?.content
                if (delta) {
                  fullContent += delta
                  onStream?.(fullContent)
                }
              } catch {
                // 忽略解析失败的行
              }
            }
          }
        }
      } finally {
        reader.releaseLock()
      }

      // Remove thinking chain (for models like qwen3)
      const content = fullContent.replace(/<tool_call>[\s\S]*?<\/think>/gi, "").trim()
      return { success: true, content, mode }
    }

    // 非流式响应处理
    const data = await response.json()

    if (!data.success || !data.data?.choices || data.data.choices.length === 0) {
      return {
        success: false,
        error: "EMPTY_AI_RESPONSE",
        mode
      }
    }

    const rawText = data.data.choices[0].message?.content ?? ""
    // Remove thinking chain (for models like qwen3)
    const content = rawText.replace(/<tool_call>[\s\S]*?<\/think>/gi, "").trim()

    return { success: true, content, mode }
  } catch (e: any) {
    return {
      success: false,
      error: e?.message ?? "NETWORK_ERROR",
      mode
    }
  }
}

// ==================== Prompt Builders ====================

function buildSpeedReadSystemPrompt (): string {
  return `你是一位高效的文档分析师，擅长快速提取文档精华。

## 你的风格
- 简洁直接，不废话
- 结构化输出，层次分明
- 抓重点，舍细节

## 输出格式
使用 Markdown，包含：
- ## 核心摘要（2-3句话）
- ## 关键要点（3-5条）
- ## 延伸思考（1个问题+答案）`
}

function buildSpeedReadPrompt (content: string, title: string): string {
  return `文档标题：${title}

文档内容：
${content}`
}

function buildQASystemPrompt (): string {
  return `你是一位启发式教学专家，擅长通过问答引导读者深入理解文档。

## 你的风格
- 由浅入深，循序渐进
- 问题有启发性，不是简单的"找原文"
- 答案简洁准确，2-3句话

## 输出格式
使用 Markdown，5个问答：
- ## Q1/Q2: 基础理解题
- ## Q3/Q4/Q5: 进阶思考题`
}

function buildQAPrompt (content: string, title: string): string {
  return `文档标题：${title}

文档内容：
${content}`
}

// ==================== Composable ====================

export function useAIAssistant (
  title: Ref<string> | string,
  htmlContent: Ref<string> | string
) {
  const _title = isRef(title) ? title : ref(title)
  const _html = isRef(htmlContent) ? htmlContent : ref(htmlContent)

  // Unified message list (all interactions as chat bubbles)
  const messages = ref<ChatMessage[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Processed document content (cached)
  const processedContent = computed(() => preprocessHtmlContent(_html.value))
  const hasUsableContent = computed(() => hasMeaningfulTextContent(_html.value))

  // Generate unique message ID
  const generateMessageId = () => {
    return `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
  }

  /**
   * Send Speed Read request
   * Converts to system message + AI response format
   */
  const sendSpeedRead = async (cfg: AIAssistantConfig = {}) => {
    if (!hasUsableContent.value) {
      error.value = "EMPTY_CONTENT"
      return { success: false, mode: cfg.mode }
    }

    isLoading.value = true
    error.value = null

    try {
      const aiMessages = [
        { role: "system", content: buildSpeedReadSystemPrompt() },
        { role: "user", content: buildSpeedReadPrompt(processedContent.value, _title.value) }
      ]

      // Add placeholder assistant message for streaming
      const assistantMessage: ChatMessage = {
        id: generateMessageId(),
        role: "assistant",
        content: "",
        timestamp: Date.now(),
        type: "summary"
      }
      messages.value.push(assistantMessage)

      // Stream callback to update UI
      const onStream = (chunk: string) => {
        assistantMessage.content = chunk
        // Trigger reactivity
        messages.value = [...messages.value]
      }

      const res = await callAI(aiMessages, cfg, onStream)

      if (!res.success || !res.content) {
        // Remove placeholder message on error
        messages.value.pop()
        error.value = res.error ?? "GENERATE_FAILED"
        return { success: false, mode: res.mode }
      }

      // Content is already updated via streaming, just ensure final content is set
      assistantMessage.content = res.content
      messages.value = [...messages.value]

      return { success: true, mode: res.mode }
    } catch (e: any) {
      error.value = e?.message ?? "GENERATE_FAILED"
      return { success: false, mode: cfg.mode }
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Send QA generation request
   */
  const sendQA = async (cfg: AIAssistantConfig = {}) => {
    if (!hasUsableContent.value) {
      error.value = "EMPTY_CONTENT"
      return { success: false, mode: cfg.mode }
    }

    isLoading.value = true
    error.value = null

    try {
      const aiMessages = [
        { role: "system", content: buildQASystemPrompt() },
        { role: "user", content: buildQAPrompt(processedContent.value, _title.value) }
      ]

      // Add placeholder assistant message for streaming
      const assistantMessage: ChatMessage = {
        id: generateMessageId(),
        role: "assistant",
        content: "",
        timestamp: Date.now(),
        type: "qa"
      }
      messages.value.push(assistantMessage)

      // Stream callback to update UI
      const onStream = (chunk: string) => {
        assistantMessage.content = chunk
        // Trigger reactivity
        messages.value = [...messages.value]
      }

      const res = await callAI(aiMessages, cfg, onStream)

      if (!res.success || !res.content) {
        // Remove placeholder message on error
        messages.value.pop()
        error.value = res.error ?? "GENERATE_FAILED"
        return { success: false, mode: res.mode }
      }

      // Content is already updated via streaming, just ensure final content is set
      assistantMessage.content = res.content
      messages.value = [...messages.value]

      return { success: true, mode: res.mode }
    } catch (e: any) {
      error.value = e?.message ?? "GENERATE_FAILED"
      return { success: false, mode: cfg.mode }
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Send custom chat message (with streaming support)
   */
  const sendMessage = async (userInput: string, cfg: AIAssistantConfig = {}) => {
    if (!userInput.trim()) {
      error.value = "EMPTY_MESSAGE"
      return { success: false, mode: cfg.mode }
    }

    if (!hasUsableContent.value) {
      error.value = "EMPTY_CONTENT"
      return { success: false, mode: cfg.mode }
    }

    isLoading.value = true
    error.value = null

    try {
      // Add user message first
      const userMessage: ChatMessage = {
        id: generateMessageId(),
        role: "user",
        content: userInput.trim(),
        timestamp: Date.now(),
        type: "chat"
      }
      messages.value.push(userMessage)

      // Add placeholder assistant message for streaming
      const assistantMessage: ChatMessage = {
        id: generateMessageId(),
        role: "assistant",
        content: "",
        timestamp: Date.now(),
        type: "chat"
      }
      messages.value.push(assistantMessage)

      // Build conversation context
      const aiMessages = [
        {
          role: "system",
          content: `你是一位友善的文档阅读助手，正在帮助用户理解文档内容。

## 你的风格
- 友好耐心，像朋友一样交流
- 回答基于文档，但不局限于文档
- 适当扩展，提供有价值的补充信息

## 当前文档
标题：${_title.value}
内容：${processedContent.value.slice(0, 2000)}...`
        },
        ...messages.value.slice(0, -1).map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        { role: "user", content: userInput.trim() }
      ]

      // Stream callback to update UI
      const onStream = (chunk: string) => {
        assistantMessage.content = chunk
        // Trigger reactivity
        messages.value = [...messages.value]
      }

      const res = await callAI(aiMessages, cfg, onStream)

      if (!res.success) {
        // Remove placeholder message on error
        messages.value.pop()
        messages.value.pop()
        error.value = res.error ?? "SEND_FAILED"
        return { success: false, mode: res.mode }
      }

      // Final update with cleaned content
      assistantMessage.content = res.content ?? ""
      messages.value = [...messages.value]

      return { success: true, mode: res.mode }
    } catch (e: any) {
      error.value = e?.message ?? "SEND_FAILED"
      return { success: false, mode: cfg.mode }
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
    sendSpeedRead,
    sendQA,
    sendMessage,
    clearMessages,
  }
}

// ==================== Message Formatters ====================

// Note: formatSummaryAsMessage and formatQAAsMessage removed
// Now using raw Markdown output with Lute rendering
