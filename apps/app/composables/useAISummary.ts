/**
 * useAISummary - AI 摘要核心逻辑独立模块
 *
 * 定位：阅读辅助工具，帮助读者快速理解文档内容
 *   - 3 句话总结（核心摘要）
 *   - 5 个关键要点（可点击跳转）
 *   - 1 个延伸思考问题
 *
 * 设计原则：
 *   - 完全独立，与页面层零耦合
 *   - 真实 AI 调用（OpenAI 兼容协议）
 *   - 不做持久化（阅读辅助，非复习工具）
 *
 * 架构分层：
 *   Page → useAISummary (composable) → callAI (内置服务)
 */

// ==================== 类型定义 ====================

/** AI 服务配置（可选覆盖，默认使用内置代理） */
export interface AISummaryConfig {
  baseUrl?: string
  apiKey?: string
  model?: string
}

/** AI 摘要结果 */
export interface AISummaryResult {
  /** 核心摘要（2-3 句话） */
  summary: string
  /** 关键要点列表（3-5 条） */
  keyPoints: string[]
  /** 延伸思考问题（1 条，引导深度阅读） */
  thinkingQuestion: string
  /** 延伸思考答案（与问题对应，默认折叠） */
  thinkingAnswer: string
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

function buildPrompt(content: string, title: string): string {
  return `你是一个专业的阅读助手，请帮助读者快速理解以下文档内容。

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

function parseAIResponse(text: string): AISummaryResult | null {
  // 去除思考链（qwen3 等模型输出）
  const cleanText = text.replace(/<think>[\s\S]*?<\/think>/gi, "").trim()

  // 提取 JSON
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
    // JSON 解析失败
  }

  return null
}

async function callAI(
  content: string,
  title: string,
  config: AISummaryConfig
): Promise<{ success: boolean; result?: AISummaryResult; error?: string }> {
  const baseUrl = config.baseUrl || "https://ai.terwer.space"
  const apiKey = config.apiKey || "sk-105036"
  const model = config.model || "qwen3-max"

  const prompt = buildPrompt(content, title)

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
        temperature: 0.5,
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
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
    const result = parseAIResponse(rawText)

    if (!result) {
      return { success: false, error: "AI 返回格式异常，请重试" }
    }

    return { success: true, result }
  } catch (e: any) {
    return { success: false, error: e?.message ?? "网络请求失败" }
  }
}

// ==================== Composable ====================

export function useAISummary(
  title: Ref<string> | string,
  htmlContent: Ref<string> | string
) {
  const _title = isRef(title) ? title : ref(title)
  const _html = isRef(htmlContent) ? htmlContent : ref(htmlContent)

  const result = ref<AISummaryResult | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const hasSummary = computed(() => result.value !== null)

  const generate = async (config: AISummaryConfig = {}) => {
    if (!_html.value) {
      error.value = "文档内容为空"
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const processedContent = preprocessHtmlContent(_html.value)
      const res = await callAI(processedContent, _title.value, config)

      if (!res.success || !res.result) {
        error.value = res.error ?? "生成失败，请重试"
        return
      }

      result.value = res.result
    } catch (e: any) {
      error.value = e?.message ?? "生成失败"
    } finally {
      isLoading.value = false
    }
  }

  const clear = () => {
    result.value = null
    error.value = null
  }

  return {
    result,
    isLoading,
    error,
    hasSummary,
    generate,
    clear,
  }
}
