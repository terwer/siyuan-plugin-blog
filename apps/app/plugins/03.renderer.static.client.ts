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

import { useStaticClientAssets } from "~/plugins/libs/renderer/useStaticClientAssets"
import { useClientFormulate } from "~/plugins/libs/renderer/useClientFormulate"

/**
 * 页面渲染插件(图片、链接、公式等) - 客户端
 * https://github.com/nuxt/nuxt/issues/13382
 * client = browser only
 *
 * @author terwer
 * @version 1.0.0
 * @since 0.0.1
 */
export default defineNuxtPlugin(({ vueApp }) => {
  const logger = createAppLogger("renderer-static-client-plugin")
  const { addClientAssetsPrefix } = useStaticClientAssets()
  const { renderFormulate } = useClientFormulate()

  vueApp.directive("sbeauty", (el: HTMLElement) => {
    // if (process.env.SSR === "true") {
    //   logger.warn("SSR is enabled, render is handled with nitro, so the client conversion is ignored")
    //   return
    // }

    // assets
    logger.info("Start handling images on static client")
    addClientAssetsPrefix(el)

    // 公式（Formulate）
    logger.info("Start handling formula on static client")
    renderFormulate(el)
  })
})
