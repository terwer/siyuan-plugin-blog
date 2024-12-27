/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import {Menu, showMessage} from "siyuan"
import {StrUtil} from "zhi-common"
import PageUtil from "./utils/pageUtil.ts"
import {createBootStrap} from "./bootstrap.ts"
import Share from "./share.vue"
import Setting from "./setting.vue"
import SiyuanBlogPlugin from "./index"

/**
 * 顶部按钮
 */
export class Topbar {
  private readonly pluginInstance: SiyuanBlogPlugin
  private rect: DOMRect
  private topBarElement: HTMLElement
  private contentMenu: Menu
  private contentMenuElement: HTMLElement

  constructor(pluginInstance: SiyuanBlogPlugin) {
    this.pluginInstance = pluginInstance
  }

  public initTopbar() {
    this.topBarElement = this.pluginInstance.addTopBar({
      icon: "iconShare",
      title: this.pluginInstance.i18n.siyuanBlog,
      position: "right",
      callback: () => {
      },
    })

    this.topBarElement.addEventListener("click", async () => {
      // 挂载内容到菜单
      const pageId = PageUtil.getPageId()
      if (StrUtil.isEmptyString(pageId)) {
        showMessage("必须先打开一篇文档才能分享")
        return
      }
      this.addMenu(Share, {
        pluginInstance: this.pluginInstance,
        id: pageId,
        origin: window.location.origin,
      }, "share-free-edition-content-menu")
    })

    // 添加右键菜单
    this.topBarElement.addEventListener("contextmenu", async () => {
      // 挂载内容到菜单
      this.addMenu(Setting, {}, "share-free-edition-context-menu")
    })
  }

  private addMenu(content: any, props: any, menuID: string) {
    if (!this.contentMenu) {
      this.contentMenu = new Menu(menuID)
    }
    this.contentMenuElement?.remove()
    const contentWrapper = Object.assign(document.createElement("div"), {
      id: `${menuID}-wrapper`,
      className: "share-free-edition-menu-content"
    })
    this.contentMenuElement = this.contentMenu.element.appendChild(contentWrapper)
    if (!this.rect) {
      this.rect = this.topBarElement.getBoundingClientRect()
    }
    createBootStrap(content, props, this.contentMenuElement)
    // 显示菜单
    const rect = this.rect
    this.contentMenu.open({
      x: rect.left,
      y: rect.bottom,
      isLeft: true,
    })
  }
}