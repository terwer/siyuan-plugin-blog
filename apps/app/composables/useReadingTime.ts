/**
 * useReadingTime - 独立的阅读时间计算模块
 *
 * 设计原则：
 * - 完全独立，无外部依赖，零污染
 * - 支持中英文混排，权重精确
 * - 可单独测试和维护
 */

// ==================== 类型定义 ====================

export interface ReadingTimeOptions {
  /** 中文阅读速度（字/分钟），默认 300 */
  chineseWordsPerMinute?: number
  /** 英文阅读速度（词/分钟），默认 200 */
  englishWordsPerMinute?: number
  /** 每张图片附加阅读时间（秒），默认 12 */
  secondsPerImage?: number
  /** 代码块每行阅读时间（秒），默认 3 */
  secondsPerCodeLine?: number
}

export interface ReadingTimeResult {
  /** 总分钟数（向上取整） */
  minutes: number
  /** 总秒数（精确） */
  seconds: number
  /** 中文字符数 */
  chineseChars: number
  /** 英文单词数 */
  englishWords: number
  /** 图片数量 */
  imageCount: number
  /** 代码行数 */
  codeLines: number
  /** 格式化显示文本（中文） */
  displayTextZh: string
  /** 格式化显示文本（英文） */
  displayTextEn: string
}

// ==================== 核心算法 ====================

const DEFAULT_OPTIONS: Required<ReadingTimeOptions> = {
  chineseWordsPerMinute: 300,
  englishWordsPerMinute: 200,
  secondsPerImage: 12,
  secondsPerCodeLine: 3,
}

/**
 * 从 HTML 字符串中提取并计算阅读时间
 * 算法设计参考 Medium、掘金的阅读时间计算策略
 */
function calcReadingTime(html: string, opts?: ReadingTimeOptions): ReadingTimeResult {
  const options = { ...DEFAULT_OPTIONS, ...opts }

  // 1. 提取代码块，避免代码内容干扰字数统计
  let content = html ?? ""
  let codeLines = 0
  content = content.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (_, code) => {
    const lines = code.replace(/<[^>]+>/g, "").split("\n").filter((l: string) => l.trim())
    codeLines += lines.length
    return ""
  })

  // 2. 统计图片数量
  const imageCount = (html.match(/<img[^>]*>/gi) ?? []).length

  // 3. 去除剩余 HTML 标签，得到纯文本
  const plainText = content
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim()

  // 4. 分离中文字符
  const chineseChars = (plainText.match(/[\u4e00-\u9fa5\u3000-\u303f\uff01-\uff60]/g) ?? []).length

  // 5. 提取英文单词（去掉中文后剩余的词组）
  const withoutChinese = plainText.replace(/[\u4e00-\u9fa5\u3000-\u303f\uff01-\uff60]/g, " ")
  const englishWords = (withoutChinese.match(/\b[a-zA-Z][a-zA-Z'-]*\b/g) ?? []).length

  // 6. 计算各部分时间（秒）
  const chineseSeconds = (chineseChars / options.chineseWordsPerMinute) * 60
  const englishSeconds = (englishWords / options.englishWordsPerMinute) * 60
  const imageSeconds = imageCount * options.secondsPerImage
  const codeSeconds = codeLines * options.secondsPerCodeLine

  const totalSeconds = chineseSeconds + englishSeconds + imageSeconds + codeSeconds

  // 7. 最少 1 分钟
  const minutes = Math.max(1, Math.ceil(totalSeconds / 60))

  return {
    minutes,
    seconds: Math.round(totalSeconds),
    chineseChars,
    englishWords,
    imageCount,
    codeLines,
    displayTextZh: `约 ${minutes} 分钟`,
    displayTextEn: `${minutes} min read`,
  }
}

// ==================== Composable ====================

/**
 * useReadingTime
 *
 * 用法：
 * ```ts
 * const { readingTime } = useReadingTime(computed(() => post.editorDom))
 * ```
 */
export function useReadingTime(
  htmlSource: Ref<string> | ComputedRef<string>,
  opts?: ReadingTimeOptions
) {
  const readingTime = computed<ReadingTimeResult>(() => {
    const html = isRef(htmlSource) ? htmlSource.value : htmlSource
    return calcReadingTime(html as string, opts)
  })

  return { readingTime }
}
