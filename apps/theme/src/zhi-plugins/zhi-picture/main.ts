/*
 Copyright (c) 2023 Terwer. All rights reserved.

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

import siyuan from "siyuan"
import ZhiUtil from "../../../../../../../../../../../zhi-common"
import Translucify from "~/src/zhi-plugins/zhi-picture/translucify"
import Env from "zhi-env"

/**
 * 图片背景自动透明插件
 * 开发调试地址：http://localhost:5173/src/zhi-plugins/zhi-picture-plugin/main.ts
 *
 * @author terwer
 * @since 1.0.0
 */
class ZhiPicturePlugin extends siyuan.Plugin {
  private readonly logger
  private readonly translucify

  constructor() {
    super()
    const env = new Env(import.meta.env)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const zhiSdk = ZhiUtil.zhiSdk(env)
    this.logger = zhiSdk.getLogger()

    this.translucify = new Translucify().init()
  }

  onload() {
    const zhiDemoButton = document.createElement("button")
    zhiDemoButton.classList.add("toolbar__item")

    // 使用思源图标
    // 图标地址：http://127.0.0.1:6806/appearance/icons/ant/icon.js?v=2.7.7
    zhiDemoButton.insertAdjacentHTML("beforeend", '<svg><use xlink:href="#iconLight"></use></svg>')
    zhiDemoButton.addEventListener("click", (event) => {
      this.translucify(document.querySelectorAll("img"), 0.05)
      this.logger.info("Picture is transplanted.")
      event.stopPropagation()
    })

    siyuan.clientApi.addToolbarRight(zhiDemoButton)
    this.logger.info("ZhiPicturePlugin loaded")
  }

  onunload() {
    this.logger.info("ZhiPicturePlugin unloaded")
  }
}

export default ZhiPicturePlugin
