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

import SiyuanBlog from "./index"
import { DeviceDetection, DeviceTypeEnum } from "zhi-device"
import { icons } from "./utils/svg"
import { Dialog } from "siyuan"

/**
 * 顶栏按钮
 *
 * @param pluginInstance - 插件实例
 * @author terwer
 * @version 0.0.1
 * @since 0.0.1
 */
export function initTopbar(pluginInstance: SiyuanBlog) {
  const topBarElement = pluginInstance.addTopBar({
    icon: icons.iconTopbar,
    title: pluginInstance.i18n.kanbanGirl,
    position: "right",
    callback: () => {},
  })

  topBarElement.addEventListener("click", async () => {
    loadBlog(pluginInstance)
  })
}

const loadBlog = (pluginInstance: SiyuanBlog) => {
  const win = window as any
  const deviceType: DeviceTypeEnum = DeviceDetection.getDevice()
  console.log(`you are from ${deviceType}`)
  const blogIndex = "/plugins/siyuan-blog/index.html"

  if (deviceType == DeviceTypeEnum.DeviceType_Siyuan_MainWin) {
    const basePath = "/plugins/siyuan-blog"
    import(`${basePath}/libs/zhi-electron/index.js`).then((electron) => {
      console.log(electron.default())
      const zhiWin = win.zhiWindow
      const url = `${window.location.origin}${blogIndex}`
      zhiWin.openBrowserWindow(url, undefined, undefined, true, false)
    })
  } else {
    showBlog(pluginInstance, blogIndex)
  }
}

const showBlog = (pluginInstance: SiyuanBlog, blogIndex: string) => {
  const contentHtml = `<style>
        iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
        </style>
        <iframe src="${blogIndex}" width="100%"></iframe>`

  new Dialog({
    title: pluginInstance.i18n.siyuanBlog,
    transparent: false,
    content: contentHtml,
    width: "90%",
    height: "750px",
  } as any)
}
