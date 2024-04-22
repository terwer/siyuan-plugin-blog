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
import { useSvg } from "~/plugins/domparser/useSvg"
import { useBlockRef } from "~/plugins/domparser/useBlockRef"

/**
 * 页面渲染插件(图标等) - 客户端
 * https://github.com/nuxt/nuxt/issues/13382
 * client = browser only
 *
 * @author terwer
 * @version 1.0.0
 * @since 0.0.1
 */
export default defineNuxtPlugin(({ vueApp }) => {
  const logger = createAppLogger("domparser-client-plugin")
  const { addSvgToPage } = useSvg()
  const { convertAllLinks } = useBlockRef()

  vueApp.directive("domparser", (el: HTMLElement) => {
    // svg
    logger.info("Start handling svg on client")
    addSvgToPage([
      // 任务列表未选中
      `<symbol id="iconUncheck" viewBox="0 0 32 32">
        <path d="M30.72-0h-29.44c-0.708 0-1.28 0.572-1.28 1.28v29.44c0 0.708 0.572 1.28 1.28 1.28h29.44c0.708 0 1.28-0.572 1.28-1.28v-29.44c0-0.708-0.572-1.28-1.28-1.28zM29.12 29.12h-26.24v-26.24h26.24v26.24z"></path>
      </symbol>`,
      // 任务列表已选中
      `<symbol id="iconCheck" viewBox="0 0 32 32">
        <path d="M12.844 21.828c0.234 0.323 0.61 0.531 1.034 0.531s0.8-0.208 1.031-0.527l0.003-0.004 8.424-11.68c0.152-0.212 0-0.508-0.26-0.508h-1.876c-0.408 0-0.796 0.196-1.036 0.532l-6.284 8.72-2.848-3.952c-0.24-0.332-0.624-0.532-1.036-0.532h-1.876c-0.26 0-0.412 0.296-0.26 0.508l4.984 6.912z"></path>
        <path d="M30.72 0h-29.44c-0.708 0-1.28 0.572-1.28 1.28v29.44c0 0.708 0.572 1.28 1.28 1.28h29.44c0.708 0 1.28-0.572 1.28-1.28v-29.44c0-0.708-0.572-1.28-1.28-1.28zM29.12 29.12h-26.24v-26.24h26.24v26.24z"></path>
      </symbol>`,
      // 有序列表
      `<symbol id="iconDot" viewBox="0 0 32 32">
        <path d="M22.286 16c0 3.471-2.814 6.286-6.286 6.286s-6.286-2.814-6.286-6.286c0-3.471 2.814-6.286 6.286-6.286s6.286 2.814 6.286 6.286z"></path>
      </symbol>`,
    ])

    // block ref links
    logger.info("Start handling links on client")
    convertAllLinks(el)
  })
})
