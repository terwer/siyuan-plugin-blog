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

import hljs from "highlight.js/lib/core"
import javascript from "highlight.js/lib/languages/javascript"
import typescript from "highlight.js/lib/languages/typescript"
import c from "highlight.js/lib/languages/c"
import cpp from "highlight.js/lib/languages/cpp"
import java from "highlight.js/lib/languages/java"
import kotlin from "highlight.js/lib/languages/kotlin"
import bash from "highlight.js/lib/languages/bash"
import xml from "highlight.js/lib/languages/xml"
import css from "highlight.js/lib/languages/css"
import plaintext from "highlight.js/lib/languages/plaintext"
import php from "highlight.js/lib/languages/php"
import properties from "highlight.js/lib/languages/properties"
import sql from "highlight.js/lib/languages/sql"
import markdown from "highlight.js/lib/languages/markdown"
import { CopyButtonPlugin } from "~/plugins/hljs/codecopy"
import "./codecopy/codecopy.css"

export const useHljs = () => {
  // 按需加载语言，防止打包体积过大
  hljs.registerLanguage("javascript", javascript)
  hljs.registerLanguage("js", javascript)
  hljs.registerLanguage("typescript", typescript)
  hljs.registerLanguage("ts", typescript)
  hljs.registerLanguage("c", c)
  hljs.registerLanguage("cpp", cpp)
  hljs.registerLanguage("java", java)
  hljs.registerLanguage("kotlin", kotlin)
  hljs.registerLanguage("csharp", java)
  hljs.registerLanguage("cs", java)
  hljs.registerLanguage("bash", bash)
  hljs.registerLanguage("shell", bash)
  hljs.registerLanguage("xml", xml)
  hljs.registerLanguage("html", xml)
  hljs.registerLanguage("css", css)
  hljs.registerLanguage("plaintext", plaintext as any)
  hljs.registerLanguage("plantuml", plaintext as any)
  hljs.registerLanguage("php", php)
  hljs.registerLanguage("properties", properties)
  hljs.registerLanguage("sql", sql)
  hljs.registerLanguage("markdown", markdown)
  hljs.registerLanguage("md", markdown)

  // 代码复制
  hljs.addPlugin(
    new CopyButtonPlugin({
      callback: (text: string, el: HTMLElement) => console.log("Copied to clipboard", text),
    })
  )

  return { hljs }
}
