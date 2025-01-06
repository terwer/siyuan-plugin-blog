/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
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

// @ts-ignore
import { addThirdLanguages } from "./lib/third-languages"

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
  // 第三方语言支持
  addThirdLanguages(hljs)

  return { hljs }
}
