/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

type ThemeType = "system" | "dark" | "light"

interface AppConfig {
  lang?: string
  siteUrl?: string
  siteTitle?: string
  siteSlogan?: string
  siteDescription?: string
  homePageId?: string
  header?: string,
  footer?: string
  shareTemplate?: string

  theme?: {
    mode?: ThemeType
    lightTheme?: string
    darkTheme?: string
    themeVersion?: string
  }

  /** 文档元信息栏全局源配置，兼容历史线上默认显示行为 */
  postMetaEnabled?: boolean

  /**
   * AI 助手全局源配置。
   * 该字段用于跨产品线表达“全局默认策略”的存在，
   * 免费版思源插件当前不暴露该能力的 UI。
   */
  aiAssistantEnabled?: boolean

  customCss: Array<{
    name: string
    content: string
  }>

  // 加上字符串索引签名，兼容 AppConfigInput 约束
  [key: string]: any
}

export const AppConfig = {
  lang: "zh_CN",
  siteUrl: "",
  siteTitle: "在线分享",
  siteSlogan: "您的自部署 notion 替代品",
  siteDescription: "您的自部署 notion 替代品",
  homePageId: "",
  header: "",
  footer: "",
  shareTemplate: "[url]",
  postMetaEnabled: true,
  aiAssistantEnabled: true,

  theme: {
    mode: "light",
    lightTheme: "Zhihu",
    darkTheme: "Zhihu",
    themeVersion: "0.1.5",
  },

  customCss: []
}
