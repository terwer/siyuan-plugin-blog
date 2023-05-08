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

import { Dialog, Plugin } from "siyuan"
import "./index.styl"
import { DeviceDetection, DeviceTypeEnum } from "zhi-device"

export default class SiyuanBlog extends Plugin {
  private showBlog(blogIndex: string) {
    const contentHtml = `<style>
        iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
        </style>
        <iframe src="${blogIndex}" width="100%"></iframe>`

    new Dialog({
      title: this.i18n.siyuanBlog,
      transparent: false,
      content: contentHtml,
      width: "90%",
      height: "750px",
    } as any)
  }

  onload() {
    const win = window as any
    const deviceType: DeviceTypeEnum = DeviceDetection.getDevice()
    console.log(`you are from ${deviceType}`)
    const blogIndex = "/plugins/siyuan-blog/index.html"

    if (deviceType == DeviceTypeEnum.DeviceType_Siyuan_MainWin) {
      import("/plugins/publish-bridge/lib/zhi-electron/index.js" as any).then((electron) => {
        console.log(electron.default())
        const zhiWin = win.zhiWindow
        zhiWin.openBrowserWindow(blogIndex, undefined, undefined, true, false)
      })
    } else {
      this.showBlog(blogIndex)
    }
  }

  onunload() {
    console.log("siyuan blog unloaded")
  }
}
