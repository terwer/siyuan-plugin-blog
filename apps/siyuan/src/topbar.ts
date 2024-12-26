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

import {Menu, showMessage} from "siyuan"
import {StrUtil} from "zhi-common"
import PageUtil from "./utils/pageUtil.ts"
import {createBootStrap} from "./bootstrap.ts"
import {icons} from "./icons.ts"
import {getAvailableOrigin} from "./utils/urlUtil.ts"
import SiyuanBlogPlugin from "./index"

const initContextMenu = async (pluginInstance: SiyuanBlogPlugin, rect: DOMRect) => {
  const menu = new Menu("blogContextMenu")

  // menu.addItem({
  //   iconHTML: `<span class="font-awesome-icon">${icons.iconSetting}</span>`,
  //   label: pluginInstance.i18n.setting,
  //   click: () => {
  //     showSettingPage(pluginInstance)
  //   },
  // })
  //
  // menu.addSeparator()
  // menu.addItem({
  //   iconHTML: `<span class="iconfont-icon">${icons.iconHome}</span>`,
  //   label: pluginInstance.i18n.showHome,
  //   click: () => {
  //     const blogIndex = "/plugins/siyuan-blog/#/"
  //     const origin = getAvailableOrigin()
  //     // showPage(pluginInstance, blogIndex, pluginInstance.i18n.home)
  //     window.open(`${origin}${blogIndex}`)
  //   },
  // })
  //
  // menu.addSeparator()
  // menu.addItem({
  //   iconHTML: `<span class="font-awesome-icon">${icons.iconBrowser}</span>`,
  //   label: pluginInstance.i18n.browserOpen,
  //   click: () => {
  //     const pageId = PageUtil.getPageId()
  //     const blogIndex = `/plugins/siyuan-blog/#/s/${pageId}`
  //     const origin = getAvailableOrigin()
  //     window.open(`${origin}${blogIndex}`)
  //   },
  // })

  if (pluginInstance.isMobile) {
    menu.fullscreen()
  } else {
    menu.open({
      x: rect.left,
      y: rect.top,
      w: rect.width,
      h: rect.height,
      isLeft: false,
    })
  }
}

const showSettingPage = (pluginInstance: SiyuanBlogPlugin) => {
  showMessage("setting page")
}

/**
 * 顶部按钮
 */
export class Topbar {
  private readonly pluginInstance: SiyuanBlogPlugin

  constructor(pluginInstance: SiyuanBlogPlugin) {
    this.pluginInstance = pluginInstance
  }

  public initTopbar() {
    const topBarElement = this.pluginInstance.addTopBar({
      icon: "iconShare",
      title: this.pluginInstance.i18n.siyuanBlog,
      position: "right",
      callback: () => {
      },
    })

    topBarElement.addEventListener("click", async () => {
      const menu = new Menu("shareProMenu")
      const el = menu.addItem({
        iconHTML: "",
        label: "",
      })
      // 挂载内容到菜单
      const pageId = PageUtil.getPageId()
      if (StrUtil.isEmptyString(pageId)) {
        showMessage("必须先打开一篇文档才能分享")
        return
      }
      createBootStrap(el, {
        pluginInstance: this.pluginInstance,
        id: pageId,
        origin: window.location.origin,
      })
      // 显示菜单
      const rect = topBarElement.getBoundingClientRect()
      menu.open({
        x: rect.right,
        y: rect.bottom,
        isLeft: true,
      })
    })

    // 添加右键菜单
    topBarElement.addEventListener("contextmenu", async () => {
      let rect = topBarElement.getBoundingClientRect()
      // 如果获取不到宽度，则使用更多按钮的宽度
      if (rect.width === 0) {
        rect = document?.querySelector("#barMore")?.getBoundingClientRect() as any
      }
      await initContextMenu(this.pluginInstance, rect)
    })
  }
}