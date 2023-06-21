/*
 * Copyright (c) 2023, Terwer . All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Terwer designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Terwer in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Terwer, Shenzhen, Guangdong, China, youweics@163.com
 * or visit www.terwer.space if you need additional information or have any
 * questions.
 */

type ThemeType = "system" | "dark" | "light"

interface AppConfig {
  lang?: string
  siteUrl?: string
  siteTitle?: string
  siteSlogan?: string
  siteDescription?: string
  homePageId?: string

  theme?: {
    mode?: ThemeType
    lightTheme?: string
    darkTheme?: string
  }

  // 加上字符串索引签名，兼容 AppConfigInput 约束
  [key: string]: any
}

export default defineAppConfig<AppConfig>({
  lang: "zh_CN",
  siteUrl: "",
  siteTitle: "浅海拾贝",
  siteSlogan: "寻找未知的技术拼图",
  siteDescription: "专注于Java后端开发及服务端、软件架构、微服务、自然语言处理等领域的技术分享。",

  theme: {
    mode: "system",
    lightTheme: "Zhihu",
    darkTheme: "Zhihu",
  },
})
