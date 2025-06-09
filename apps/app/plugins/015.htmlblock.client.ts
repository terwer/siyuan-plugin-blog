/*
 * Copyright (c) 2024, Terwer . All rights reserved.
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

/**
 * HTML 块渲染插件 - 客户端
 *
 * @author terwer
 * @version 1.0.0
 * @since 0.0.1
 */
export default defineNuxtPlugin(({ vueApp }) => {
  const logger = createAppLogger("htmlblock-client-plugin")

  vueApp.directive("htmlblock", (el: HTMLElement) => {
    // 处理 HTML 块
    logger.info("Start handling HTML blocks on client")
    const htmlBlocks = el.querySelectorAll("[data-type=\"NodeHTMLBlock\"]")
    htmlBlocks.forEach((block) => {
      const protyleHtml = block.querySelector("protyle-html")
      if (protyleHtml) {
        const content = protyleHtml.getAttribute("data-content")
        if (content) {
          // 创建一个新的 div 来放置渲染后的 HTML
          const renderedDiv = document.createElement("div")
          renderedDiv.innerHTML = content
          // 替换 protyle-html 元素
          protyleHtml.replaceWith(renderedDiv)
        }
      }
    })
  })
})
