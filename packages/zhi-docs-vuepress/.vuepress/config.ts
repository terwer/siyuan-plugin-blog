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

import { defaultTheme, defineUserConfig } from "vuepress"
// @ts-ignore
import { typedocPlugin } from "vuepress-plugin-typedoc/next"

// https://v2.vuepress.vuejs.org/zh/reference/config.html
export default defineUserConfig({
  lang: "zh-CN",
  title: "你好， VuePress ！",
  description: "这是我的第一个 VuePress 站点",

  base: "/",

  locales: {
    "/": {
      lang: "en-US",
      title: "Zhi",
      description: "Docs for zhi related projects",
    },
    "/zh": {
      lang: "zh-CN",
      title: "Zhi",
      description: "Zhi 系列项目的文档",
    },
  },

  theme: defaultTheme({}),

  plugins: [
    typedocPlugin({
      entryPoints: ["packages/zhi/src/theme.ts", "packages/zhi-blog-api/src/index.ts"],
      tsconfig: "tsconfig.typedoc.json",
      plugin: ["typedoc-plugin-rename-defaults"],
    }),
  ],
})
