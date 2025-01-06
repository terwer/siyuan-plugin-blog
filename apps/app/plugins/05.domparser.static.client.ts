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

import { useSvg } from "~/plugins/libs/domparser/useSvg"
import { useStaticBlockRef } from "~/plugins/libs/domparser/useStaticBlockRef"

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
  const { convertAllLinks } = useStaticBlockRef()

  vueApp.directive("sdomparser", (el: HTMLElement) => {
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
      // 代码块复制按钮
      `<symbol id="iconCopy" viewBox="0 0 32 32">
        <path d="M22.545-0h-17.455c-1.6 0-2.909 1.309-2.909 2.909v20.364h2.909v-20.364h17.455v-2.909zM26.909 5.818h-16c-1.6 0-2.909 1.309-2.909 2.909v20.364c0 1.6 1.309 2.909 2.909 2.909h16c1.6 0 2.909-1.309 2.909-2.909v-20.364c0-1.6-1.309-2.909-2.909-2.909zM26.909 29.091h-16v-20.364h16v20.364z"></path>
      </symbol>`,
      // 代码块更多
      `<symbol id="iconMore" viewBox="0 0 32 32">
        <path d="M16 10.667c1.467 0 2.667-1.2 2.667-2.667s-1.2-2.667-2.667-2.667-2.667 1.2-2.667 2.667 1.2 2.667 2.667 2.667zM16 13.333c-1.467 0-2.667 1.2-2.667 2.667s1.2 2.667 2.667 2.667 2.667-1.2 2.667-2.667-1.2-2.667-2.667-2.667zM16 21.333c-1.467 0-2.667 1.2-2.667 2.667s1.2 2.667 2.667 2.667 2.667-1.2 2.667-2.667-1.2-2.667-2.667-2.667z"></path>
      </symbol>`,
      // 语言
      `<symbol id="iconLanguage" viewBox="0 0 32 32">
        <path d="M22.986 19.23h5.408q0.451-2.103 0.451-3.23t-0.451-3.23h-5.408q0.225 1.577 0.225 3.23t-0.225 3.23zM20.131 28.094q1.878-0.601 3.906-2.291t3.080-3.418h-4.732q-0.751 3.005-2.254 5.709zM19.756 19.23q0.225-1.577 0.225-3.23t-0.225-3.23h-7.512q-0.225 1.577-0.225 3.23t0.225 3.23h7.512zM16 28.77q2.103-3.080 3.080-6.385h-6.16q0.977 3.305 3.080 6.385zM9.615 9.615q0.901-3.23 2.254-5.709-1.878 0.601-3.944 2.291t-3.042 3.418h4.732zM4.883 22.385q0.977 1.728 3.042 3.418t3.944 2.291q-1.502-2.704-2.254-5.709h-4.732zM3.606 19.23h5.408q-0.225-1.577-0.225-3.23t0.225-3.23h-5.408q-0.451 2.103-0.451 3.23t0.451 3.23zM16 3.23q-2.103 3.080-3.080 6.385h6.16q-0.977-3.305-3.080-6.385zM27.117 9.615q-1.052-1.728-3.080-3.418t-3.906-2.291q1.352 2.479 2.254 5.709h4.732zM16 0q6.61 0 11.305 4.695t4.695 11.305-4.695 11.305-11.305 4.695-11.305-4.695-4.695-11.305 4.695-11.305 11.305-4.695z"></path>
      </symbol>`,
    ])

    // block ref links
    logger.info("Start handling links on client")
    convertAllLinks(el)
  })
})
