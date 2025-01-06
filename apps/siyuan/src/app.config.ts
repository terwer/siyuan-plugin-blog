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

  customCss: Array<{
    name: string
    content: string
  }>

  // 加上字符串索引签名，兼容 AppConfigInput 约束
  [key: string]: any
}

export const AppConfig = {
  lang: "zh_CN",
  siteUrl: "https://siyuan.wiki",
  siteTitle: "在线分享",
  siteSlogan: "随时随便分享您的思源笔记",
  siteDescription: "致力于做 obsidian.publish 国内替代品，notion 发布国内替代品",
  homePageId: "",
  header: "",
  footer: "",
  shareTemplate: "[url]",

  theme: {
    mode: "light",
    lightTheme: "Zhihu",
    darkTheme: "Zhihu",
    themeVersion: "0.1.5",
  },

  customCss: []
}
