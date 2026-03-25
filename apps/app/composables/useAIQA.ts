/**
 * useAIQA - AI 问答生成核心逻辑独立模块
 *
 * 定位：学习辅助工具，帮助读者检验对文档内容的理解
 *   - 生成 5 个 QA 问答对（类似闪卡）
 *   - 问题覆盖核心概念和关键细节
 *   - 由浅入深，适合自测学习
 *
 * 设计原则：
 *   - 完全独立，与页面层零耦合
 *   - 真实 AI 调用（OpenAI 兼容协议）
 *   - 不做持久化（学习辅助，按需生成）
 *
 * 架构分层：
 *   Page → useAIQA (composable) → callAI (内置服务)
 */

// ==================== 类型定义 ====================

/** AI 服务配置（可选覆盖，默认使用内置代理） */
export interface AIQAConfig {
  baseUrl?: string
  apiKey?: string
  model?: string
}

/** QA 问答对 */
export interface QAItem {
  question: string
  answer: string
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

function parseAIResponse(text: string): QAItem[] | null {
  // 去除思考链（qwen3 等模型输出）
  const cleanText = text.replace(/<think>[\s\S]*?<\/think>/gi, "").trim()

  // 提取 JSON
  const jsonMatch =
    cleanText.match(/```(?:json)?\s*([\s\S]*?)```/) ||
    cleanText.match(/(\{[\s\S]*\})/)
  const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : cleanText

  try {
    const parsed = JSON.parse(jsonStr)
    const qaList = Array.isArray(parsed.qaList) ? parsed.qaList : []

    // 验证并过滤有效的 QA 项
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
    // JSON 解析失败
  }

  return null
}

async function callAI(
  content: string,
  title: string,
  config: AIQAConfig
): Promise<{ success: boolean; result?: QAItem[]; error?: string }> {
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

export function useAIQA(
  title: Ref<string> | string,
  htmlContent: Ref<string> | string
) {
  const _title = isRef(title) ? title : ref(title)
  const _html = isRef(htmlContent) ? htmlContent : ref(htmlContent)

  const qaList = ref<QAItem[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const hasQA = computed(() => qaList.value.length > 0)

  const generate = async (config: AIQAConfig = {}) => {
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

      qaList.value = res.result
    } catch (e: any) {
      error.value = e?.message ?? "生成失败"
    } finally {
      isLoading.value = false
    }
  }

  const clear = () => {
    qaList.value = []
    error.value = null
  }

  return {
    qaList,
    isLoading,
    error,
    hasQA,
    generate,
    clear,
  }
}
