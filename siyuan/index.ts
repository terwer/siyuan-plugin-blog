/*
 * MIT License
 *
 * Copyright (c) 2023. Terwer
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { App, getFrontend, IObject, Plugin } from "siyuan"
import { initTopbar, showSettingPage } from "./topbar"
import { simpleLogger } from "zhi-lib-base"
import { isDev } from "~/common/Constants"

import "./index.styl"
import { icons } from "~/siyuan/utils/svg"
import { registerIframeEvent } from "~/siyuan/iframeEvent"

export default class SiyuanBlog extends Plugin {
  public isMobile
  public logger
  constructor(options: { app: App; id: string; name: string; i18n: IObject }) {
    super(options)

    this.logger = simpleLogger("index", "siyuan-blog", isDev)
    const frontEnd = getFrontend()
    this.isMobile = frontEnd === "mobile" || frontEnd === "browser-mobile"
  }

  onload() {
    // 注册图标
    this.addIcons(icons.iconShare)
    // 初始化顶部栏以及图标
    initTopbar(this)
    // 注册 iframe 事件
    registerIframeEvent()
  }

  openSetting() {
    showSettingPage(this)
  }

  onunload() {
    console.log("siyuan blog unloaded")
  }
}
