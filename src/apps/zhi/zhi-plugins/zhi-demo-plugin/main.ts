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

import logFactory from "~/src/utils/logUtil"
import cjsUtil from "~/src/utils/cjsUtil"
import Translucify from "~/src/apps/zhi/zhi-plugins/zhi-demo-plugin/translucify"

const siyuan = cjsUtil.nodeRequire("siyuan")
const Plugin = siyuan.Plugin

/**
 * zhi demo plugin
 *
 * @author terwer
 * @since 1.0.0
 */
class ZhiDemoPlugin extends Plugin {
  private readonly logger = logFactory.getLogger("ZhiDemoPlugin")
  private translucify

  constructor() {
    super()
    this.translucify = new Translucify().init()
    this.logger.info("ZhiDemoPlugin created")
  }

  onload() {
    this.logger.info("siyuan=>", siyuan)

    const zhiDemoButton = document.createElement("button")
    zhiDemoButton.classList.add("toolbar__item")
    // 使用思源图标
    // 图标地址：http://127.0.0.1:6806/appearance/icons/ant/icon.js?v=2.7.7
    // zhiDemoButton.insertAdjacentHTML(
    //   "beforeend",
    //   '<svg><use xlink:href="#iconHand"></use></svg>'
    // )
    zhiDemoButton.addEventListener("click", (event) => {
      this.translucify(document.querySelectorAll("img"), 0.05)
      this.logger.info("Picture is transplanted.")
      event.stopPropagation()
    })
    zhiDemoButton.insertAdjacentHTML(
      "beforeend",
      '<i class="fa-solid fa-lightbulb"></i>'
    )
    siyuan.clientApi.addToolbarRight(zhiDemoButton)
    this.logger.info("ZhiDemoPlugin loaded")
  }

  onunload() {
    this.logger.info("ZhiDemoPlugin unloaded")
  }
}

module.exports = {
  default: ZhiDemoPlugin,
}
