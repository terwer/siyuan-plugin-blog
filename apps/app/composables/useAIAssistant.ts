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

// ==================== Type Definitions ====================

/** AI 模型模式 */
export type AIModelMode = 'builtin' | 'custom'

/** AI 配置 */
export interface AIAssistantConfig {
  mode?: AIModelMode  // 内置模型 或 自定义模型
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

export interface AISummaryResult {
  summary: string
  keyPoints: string[]
  thinkingQuestion: string
  thinkingAnswer: string
}

export interface QAItem {
  question: string
  answer: string
}

// ==================== Content Preprocessing ====================

function preprocessHtmlContent(html: string): string {
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
    .replace(/&quot;/g, '"')
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
async function callAI(
  messages: any[],
  config: AIAssistantConfig,
  onStream?: (chunk: string) => void
): Promise<{ success: boolean; content?: string; error?: string; mode?: AIModelMode }> {
  const mode = config.mode || 'builtin'
  const stream = !!onStream

  try {
    // 调用服务端 API（安全，不暴露 API key）
    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mode,
        messages,
        stream,
        customConfig: mode === 'custom' ? {
          baseUrl: config.baseUrl,
          apiKey: config.apiKey,
          model: config.model,
        } : undefined,
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
      let fullContent = ''

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              if (data === '[DONE]') continue

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
        error: 'EMPTY_AI_RESPONSE',
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

function buildSystemPrompt(title: string, content: string): string {
  return `你是一个专业的阅读助手。以下是用户正在阅读的文档内容，请根据文档回答用户的问题。

文档标题：${title}

文档内容：
${content}

请注意：
1. 优先基于文档内容回答问题
2. 如果问题超出文档范围，可以结合你的知识给出建议，但要说明这不是来自文档
3. 回答要简洁清晰，使用中文回复`
}

function buildSpeedReadPrompt(content: string, title: string): string {
  return `你是一个专业的阅读助手。请帮助读者快速理解以下文档内容。

请以 JSON 格式返回，包含以下四个字段：
1. "summary"：2-3 句话的核心摘要，概括文档最重要的内容
2. "keyPoints"：3-5 个关键要点，每条简洁清晰（不超过 30 字）
3. "thinkingQuestion"：1 个延伸思考问题，引导读者深度理解（不是考试题）
4. "thinkingAnswer"：针对上面问题的参考答案（100-200 字，结合文档内容给出有见地的回答）

格式示例：
{
  "summary": "本文介绍了...",
  "keyPoints": ["要点一", "要点二", "要点三"],
  "thinkingQuestion": "如果你要在实际工作中应用这些知识，你会...",
  "thinkingAnswer": "结合文档中提到的...，在实际应用中可以..."
}

文档标题：${title}

文档内容：
${content}

请直接返回 JSON，不要有其他说明文字。`
}

function buildQAPrompt(content: string, title: string): string {
  return `你是一个文档阅读助手。请根据以下文档内容，生成 5 个有价值的问答对，帮助读者检验对文档的理解。

要求：
1. 问题应覆盖文档的核心概念和关键细节
2. 问题由浅入深，前 2 个基础，后 3 个进阶
3. 答案简洁准确，2-3 句话即可
4. 使用中文

格式示例：
{
  "qaList": [
    { "question": "这篇文档主要讨论了什么主题？", "answer": "本文主要讨论了..." },
    { "question": "文中提到的核心概念是什么？", "answer": "核心概念包括..." }
  ]
}

文档标题：${title}

文档内容：
${content}

请以 JSON 格式返回：{"qaList": [{"question": "...", "answer": "..."}]}`
}

// ==================== Response Parsers ====================

function parseSummaryResponse(text: string): AISummaryResult | null {
  const cleanText = text.replace(/<tool_call>[\s\S]*?<\/think>/gi, "").trim()

  const jsonMatch =
    cleanText.match(/```(?:json)?\s*([\s\S]*?)```/) ||
    cleanText.match(/(\{[\s\S]*\})/)
  const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : cleanText

  try {
    const parsed = JSON.parse(jsonStr)
    const summary = typeof parsed.summary === "string" ? parsed.summary.trim() : ""
    const keyPoints = Array.isArray(parsed.keyPoints)
      ? parsed.keyPoints.filter((s: any) => typeof s === "string" && s.trim()).map((s: string) => s.trim())
      : []
    const thinkingQuestion = typeof parsed.thinkingQuestion === "string"
      ? parsed.thinkingQuestion.trim()
      : ""
    const thinkingAnswer = typeof parsed.thinkingAnswer === "string"
      ? parsed.thinkingAnswer.trim()
      : ""

    if (summary || keyPoints.length > 0) {
      return { summary, keyPoints, thinkingQuestion, thinkingAnswer }
    }
  } catch {
    // JSON parsing failed
  }

  return null
}

function parseQAResponse(text: string): QAItem[] | null {
  const cleanText = text.replace(/<tool_call>[\s\S]*?<\/think>/gi, "").trim()

  const jsonMatch =
    cleanText.match(/```(?:json)?\s*([\s\S]*?)```/) ||
    cleanText.match(/(\{[\s\S]*\})/)
  const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : cleanText

  try {
    const parsed = JSON.parse(jsonStr)
    const qaList = Array.isArray(parsed.qaList) ? parsed.qaList : []

    const validItems = qaList
      .filter(
        (item: any) =>
          item &&
          typeof item.question === "string" &&
          typeof item.answer === "string" &&
          item.question.trim() &&
          item.answer.trim()
      )
      .map((item: any) => ({
        question: item.question.trim(),
        answer: item.answer.trim(),
      }))

    if (validItems.length > 0) {
      return validItems
    }
  } catch {
    // JSON parsing failed
  }

  return null
}

// ==================== Composable ====================

export function useAIAssistant(
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

  // Generate unique message ID
  const generateMessageId = () => {
    return `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
  }

  /**
   * Send Speed Read request
   * Converts to system message + AI response format
   */
  const sendSpeedRead = async (cfg: AIAssistantConfig = {}) => {
    if (!_html.value) {
      error.value = "EMPTY_CONTENT"
      return { success: false, mode: cfg.mode }
    }

    isLoading.value = true
    error.value = null

    try {
      const aiMessages = [
        { role: 'system', content: buildSystemPrompt(_title.value, processedContent.value) },
        { role: 'user', content: buildSpeedReadPrompt(processedContent.value, _title.value) }
      ]

      const res = await callAI(aiMessages, cfg)

      if (!res.success || !res.content) {
        error.value = res.error ?? "GENERATE_FAILED"
        return { success: false, mode: res.mode }
      }

      const result = parseSummaryResponse(res.content)

      if (!result) {
        error.value = "INVALID_FORMAT"
        return { success: false, mode: res.mode }
      }

      // Format as rich chat bubble
      const formattedResponse = formatSummaryAsMessage(result)

      const assistantMessage: ChatMessage = {
        id: generateMessageId(),
        role: 'assistant',
        content: formattedResponse,
        timestamp: Date.now(),
        type: 'summary'
      }

      messages.value.push(assistantMessage)
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
    if (!_html.value) {
      error.value = "EMPTY_CONTENT"
      return { success: false, mode: cfg.mode }
    }

    isLoading.value = true
    error.value = null

    try {
      const aiMessages = [
        { role: 'system', content: buildSystemPrompt(_title.value, processedContent.value) },
        { role: 'user', content: buildQAPrompt(processedContent.value, _title.value) }
      ]

      const res = await callAI(aiMessages, cfg)

      if (!res.success || !res.content) {
        error.value = res.error ?? "GENERATE_FAILED"
        return { success: false, mode: res.mode }
      }

      const result = parseQAResponse(res.content)

      if (!result) {
        error.value = "INVALID_FORMAT"
        return { success: false, mode: res.mode }
      }

      // Format as rich chat bubble
      const formattedResponse = formatQAAsMessage(result)

      const assistantMessage: ChatMessage = {
        id: generateMessageId(),
        role: 'assistant',
        content: formattedResponse,
        timestamp: Date.now(),
        type: 'qa'
      }

      messages.value.push(assistantMessage)
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

    if (!_html.value) {
      error.value = "EMPTY_CONTENT"
      return { success: false, mode: cfg.mode }
    }

    isLoading.value = true
    error.value = null

    try {
      // Add user message first
      const userMessage: ChatMessage = {
        id: generateMessageId(),
        role: 'user',
        content: userInput.trim(),
        timestamp: Date.now(),
        type: 'chat'
      }
      messages.value.push(userMessage)

      // Add placeholder assistant message for streaming
      const assistantMessage: ChatMessage = {
        id: generateMessageId(),
        role: 'assistant',
        content: '',
        timestamp: Date.now(),
        type: 'chat'
      }
      messages.value.push(assistantMessage)

      // Build conversation context
      const aiMessages = [
        { role: 'system', content: buildSystemPrompt(_title.value, processedContent.value) },
        ...messages.value.slice(0, -1).map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        { role: 'user', content: userInput.trim() }
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
      assistantMessage.content = res.content ?? ''
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

/**
 * Format summary result as rich HTML message
 */
function formatSummaryAsMessage(result: AISummaryResult): string {
  return `
<div class="ai-summary-bubble">
  <div class="summary-section">
    <h4>📌 核心摘要</h4>
    <p>${result.summary}</p>
  </div>
  
  <div class="summary-section">
    <h4>🔑 关键要点</h4>
    <ul>
      ${result.keyPoints.map(point => `<li>${point}</li>`).join('')}
    </ul>
  </div>
  
  ${result.thinkingQuestion ? `
  <div class="summary-section">
    <h4>💭 延伸思考</h4>
    <p><strong>问题：</strong>${result.thinkingQuestion}</p>
    ${result.thinkingAnswer ? `
    <details class="thinking-answer">
      <summary>点击查看答案</summary>
      <p>${result.thinkingAnswer}</p>
    </details>
    ` : ''}
  </div>
  ` : ''}
</div>
  `.trim()
}

/**
 * Format QA result as rich HTML message
 */
function formatQAAsMessage(qaList: QAItem[]): string {
  return `
<div class="ai-qa-bubble">
  <h4>📚 文档问答</h4>
  ${qaList.map((qa, idx) => `
  <div class="qa-item">
    <div class="qa-question">
      <strong>Q${idx + 1}:</strong> ${qa.question}
    </div>
    <details class="qa-answer">
      <summary>点击查看答案</summary>
      <p>${qa.answer}</p>
    </details>
  </div>
  `).join('')}
</div>
  `.trim()
}
