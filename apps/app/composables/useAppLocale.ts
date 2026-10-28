/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2026 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import { APP_FALLBACK_LOCALE, matchSupportedLocale } from "~/utils/i18nLocale"

/**
 * 统一管理分享页语言。
 *
 * 语言来源优先级：
 * 1. URL 查询参数 `?lang=`（用户显式指定）
 * 2. 站点配置 `setting.lang`（分享者配置）
 * 3. 应用默认语言
 *
 * 所有来源都会经过同一套归一化规则，服务端与客户端得到完全一致的结果。
 */
export const useAppLocale = () => {
  const { locale, locales, defaultLocale, setLocale } = useI18n()
  const route = useRoute()

  const supportedLocales = computed<string[]>(() => {
    return (locales.value ?? []).map((item) => (typeof item === "string" ? item : item.code))
  })

  const fallbackLocale = computed<string>(() => {
    return defaultLocale || APP_FALLBACK_LOCALE
  })

  const queryLang = computed(() => {
    const lang = route.query.lang
    return Array.isArray(lang) ? lang[0] : lang
  })

  const matchLocale = (lang: unknown) => {
    return matchSupportedLocale(lang, supportedLocales.value)
  }

  const resolveLocale = (settingLang?: unknown) => {
    return matchLocale(queryLang.value) ?? matchLocale(settingLang) ?? fallbackLocale.value
  }

  /**
   * 应用语言。
   *
   * 必须在子组件开始渲染之前调用（服务端与客户端同理），
   * 否则会出现 SSR 文本与客户端水合文本不一致。
   */
  const applyLocale = async (settingLang?: unknown) => {
    const targetLocale = resolveLocale(settingLang)
    if (targetLocale !== locale.value) {
      await setLocale(targetLocale)
    }
    return targetLocale
  }

  return {
    applyLocale,
    matchLocale,
    resolveLocale,
    supportedLocales,
  }
}
