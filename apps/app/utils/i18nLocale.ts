/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2026 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

/**
 * 应用兜底语言。
 * 当上游配置缺失或无法识别时，分享页统一使用中文，而不是向用户展示原始 i18n key。
 */
export const APP_FALLBACK_LOCALE = "zh_CN"

/**
 * 语言代码归一化。
 *
 * 兼容用户与上游系统可能产生的各种写法：
 * - 大小写混写：ZH_CN、En-Us
 * - 下划线与连字符：zh_CN、zh-CN
 * - POSIX 修饰：zh_CN.UTF-8、en_US.utf8
 * - 变体修饰：zh_CN@variant
 */
const normalizeLocaleCode = (code: string): string => {
  return code
    .trim()
    .replace(/@.*$/, "")
    .split(".")[0]
    .replace(/_/g, "-")
    .toLowerCase()
}

/**
 * 从应用支持的语言列表中匹配最合适的语言代码。
 *
 * 匹配顺序：
 * 1. 完整匹配（忽略大小写、下划线与连字符差异）
 * 2. 语言 + 书写体系匹配（如 zh-Hans-CN → zh-Hans）
 * 3. 仅语言匹配（如 zh-TW、en-GB → 对应语言的第一个受支持地区）
 *
 * 无法识别时返回 undefined，由调用方决定最终兜底值。
 */
export const matchSupportedLocale = (lang: unknown, supportedLocales: readonly string[]): string | undefined => {
  if (typeof lang !== "string" || !lang.trim()) {
    return undefined
  }

  const normalizedLang = normalizeLocaleCode(lang)
  if (!normalizedLang) {
    return undefined
  }

  const candidates = supportedLocales
    .filter((locale): locale is string => typeof locale === "string" && Boolean(locale.trim()))
    .map((locale) => ({
      locale,
      normalized: normalizeLocaleCode(locale),
    }))

  if (candidates.length === 0) {
    return undefined
  }

  // 1. 完整匹配
  const exactMatch = candidates.find((candidate) => candidate.normalized === normalizedLang)
  if (exactMatch) {
    return exactMatch.locale
  }

  const [language, ...rest] = normalizedLang.split("-")
  if (!language) {
    return undefined
  }

  // 2. 语言 + 书写体系匹配
  if (rest.length > 0) {
    const languageWithScript = `${language}-${rest[0]}`
    const scriptMatch = candidates.find(
      (candidate) =>
        candidate.normalized === languageWithScript || candidate.normalized.startsWith(`${languageWithScript}-`),
    )
    if (scriptMatch) {
      return scriptMatch.locale
    }
  }

  // 3. 仅语言匹配
  const languageMatch = candidates.find(
    (candidate) => candidate.normalized === language || candidate.normalized.startsWith(`${language}-`),
  )

  return languageMatch?.locale
}

/**
 * 将任意语言写法解析为应用支持的语言代码，无法识别时返回兜底语言。
 */
export const resolveSupportedLocale = (
  lang: unknown,
  supportedLocales: readonly string[],
  fallbackLocale: string = APP_FALLBACK_LOCALE,
): string => {
  return matchSupportedLocale(lang, supportedLocales) ?? fallbackLocale
}
