/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

/**
 * Nuxt 插件，根据 `lang` 查询参数设置语言环境
 *
 * @author terwer
 * @since 5.4.0
 */
export default defineNuxtPlugin((context) => {
  const i18n = context.$i18n as any
  const route = useRoute()

  if (route.query.lang && route.query.lang !== i18n.locale.value) {
    if (i18n.locales.value.includes(route.query.lang)) {
      i18n.locale.value = route.query.lang
    } else {
      i18n.locale.value = i18n.defaultLocale
    }
  }
})
