/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import { matchSupportedLocale } from "~/utils/i18nLocale"

/**
 * Nuxt 插件，根据 `lang` 查询参数设置语言环境
 *
 * 服务端与客户端都会执行，保证 SSR 输出与客户端水合使用同一语言。
 * 支持 zh-CN、zh_CN、zh、zh-Hans-CN、en-US、en_US、en 等常见写法。
 *
 * @author terwer
 * @since 5.4.0
 */
export default defineNuxtPlugin(async (context) => {
  const i18n = context.$i18n as any
  const route = useRoute()
  const queryLang = Array.isArray(route.query.lang) ? route.query.lang[0] : route.query.lang

  if (!queryLang) {
    return
  }

  const supportedLocales: string[] = Array.from(i18n.availableLocales ?? [])
  const targetLocale = matchSupportedLocale(queryLang, supportedLocales)

  // 无法识别的语言保持当前语言，交给站点配置或默认语言处理
  if (!targetLocale || targetLocale === i18n.locale.value) {
    return
  }

  await i18n.setLocale(targetLocale)
})
