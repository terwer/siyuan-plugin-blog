/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2023-2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

// @ts-ignore
export const isDev = typeof process === "undefined" ? false : process?.dev
// export const isDev = import.meta.dev
// https://github.com/nuxt/nuxt/discussions/18779#discussioncomment-5082909
// typeof process === "undefined" ? false : process?.env?.DEV_MODE === "true"
export const SIYUAN_VERSION = "3.1.17"
export const HLJS_VERSION = "11.5.0"

// ==================== AI 功能相关常量 ====================
/** AI 速读：用户已同意服务协议的 localStorage key */
export const AI_SUMMARY_TERMS_KEY = "siyuan_blog_ai_summary_terms_accepted"

/** AI 功能：每日使用次数 localStorage key */
export const AI_USAGE_KEY = "siyuan_blog_ai_usage"
/** AI 功能：每日使用次数上限 */
export const AI_DAILY_LIMIT = 30
