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

import { createAppLogger } from "~/common/appLogger"
import { useHljs } from "~/plugins/hljs/useHljs"

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
  const logger = createAppLogger("hljs-plugin")
  const { hljs } = useHljs()
  const env = useRuntimeConfig()
  logger.info("hljs plugin load")

  vueApp.directive("highlight", {
    mounted(el, binding) {
      setTimeout(() => {
        const blocks = el.querySelectorAll("pre code")
        Array.prototype.forEach.call(blocks, hljs.highlightBlock)
        logger.info("hljs code highlighted")
      }, env.public.waitTime ?? 500)

      setTimeout(() => {
        const blocks = el.querySelectorAll("div[class='hljs']")
        Array.prototype.forEach.call(blocks, hljs.highlightBlock)
        logger.info("hljs div highlighted")
      }, env.public.waitTime ?? 500)
    },
  })
})
