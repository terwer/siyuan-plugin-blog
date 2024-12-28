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
  footer?: string
  shareTemplate?: string

  theme?: {
    mode?: ThemeType
    lightTheme?: string
    darkTheme?: string
    themeVersion?: string
  }

  // 加上字符串索引签名，兼容 AppConfigInput 约束
  [key: string]: any
}

export const AppConfig = {
  lang: "zh_CN",
  siteUrl: "",
  siteTitle: "浅海拾贝",
  siteSlogan: "寻找未知的技术拼图",
  siteDescription: "专注于Java后端开发及服务端、软件架构、微服务、自然语言处理等领域的技术分享。",

  theme: {
    mode: "light",
    lightTheme: "Zhihu",
    darkTheme: "Zhihu",
    themeVersion: "0.1.5",
  },

  header: "",
  footer: "",
  shareTemplate: "[url]",
  homePageId: "",

  customCss: [
    {
      name: "custom.css",
      // content: "body { background-color: #f5f5f5; }",
      content: "",
    },
  ],

  outline: [],
  docTree: [],
}
