/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import en_US from "~/i18n/en_US"
import zh_CN from "~/i18n/zh_CN"

/**
 * 国际化
 *
 * @see locale-detector https://i18n.nuxtjs.org/docs/composables/define-i18n-locale-detector
 */
export default defineI18nConfig(() => ({
  legacy: false,
  messages: {
    zh_CN,
    en_US,
  },
}))
