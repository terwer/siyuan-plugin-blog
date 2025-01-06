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

import { useHljs } from "~/plugins/libs/hljs/useHljs"

/**
 * 代码高亮插件
 * https://github.com/nuxt/nuxt/issues/13382
 * client = browser only
 *
 * @author terwer
 * @version 1.0.0
 * @since 0.0.1
 */
export default defineNuxtPlugin(({ vueApp }) => {
  const logger = createAppLogger("hljs-client-plugin")
  const { hljs } = useHljs()
  const env = useRuntimeConfig()
  logger.info("hljs plugin load")

  vueApp.directive("highlight", {
    mounted (el, binding) {
      const w = Number(env.public.waitTime ?? "500")
      setTimeout(() => {
        // 先转换成 pre code，再进行高亮
        const divCodeBlocks = el.querySelectorAll("div[class='hljs']")
        // 遍历每个 block
        Array.prototype.forEach.call(divCodeBlocks, (block) => {
          // 创建 <pre> 和 <code> 元素
          const pre = document.createElement("pre")
          const code = document.createElement("code")
          const div = document.createElement("div")
          div.className = "hljs"
          // 将 block 的内容移动到 <code> 中
          code.innerHTML = block.innerHTML
          // 将 <code> 添加到 <pre> 中
          pre.appendChild(code)
          div.appendChild(pre)
          // 将 <pre> 插入到 block 的位置，并移除原始的 block
          block.parentNode?.insertBefore(div, block)
          block.remove()
        })

        const blocks = el.querySelectorAll("pre code")
        Array.prototype.forEach.call(blocks, hljs.highlightBlock)
        logger.info("hljs code highlighted")
      }, w)

      // setTimeout(() => {
      //   const blocks = el.querySelectorAll("div[class='hljs']")
      //   alert(blocks[0].innerHTML)
      //   Array.prototype.forEach.call(blocks, hljs.highlightBlock)
      //   logger.info("hljs div highlighted")
      // }, w)
    },
  })
})
