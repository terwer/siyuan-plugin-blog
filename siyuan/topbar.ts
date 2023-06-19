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
import { icons } from "./utils/svg"
import { Dialog, Menu } from "siyuan"
import PageUtil from "~/siyuan/utils/pageUtil"
import { getAvailableOrigin } from "~/siyuan/utils/utils"
import { contentElement, contentHtml } from "~/siyuan/customElement"

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
    icon: "iconShare",
    title: pluginInstance.i18n.siyuanBlog,
    position: "right",
    callback: async (evt) => {},
  })

  topBarElement.addEventListener("click", async () => {
    const sharePage = "/plugins/siyuan-blog/#/share"
    showPopView(pluginInstance, topBarElement, sharePage)
  })

  // topBarElement.addEventListener("click", async () => {
  //   const sharePage = "/plugins/siyuan-blog/#/share"
  //   showPage(pluginInstance, sharePage, pluginInstance.i18n.shareOptions)
  // })

  // 添加右键菜单
  topBarElement.addEventListener("contextmenu", async () => {
    let rect = topBarElement.getBoundingClientRect()
    // 如果获取不到宽度，则使用更多按钮的宽度
    if (rect.width === 0) {
      rect = document?.querySelector("#barMore")?.getBoundingClientRect() as any
    }
    await initContextMenu(pluginInstance, rect)
  })
}

const initContextMenu = async (pluginInstance: SiyuanBlog, rect: DOMRect) => {
  const menu = new Menu("blogContextMenu")

  menu.addItem({
    iconHTML: `<span class="font-awesome-icon">${icons.iconSetting}</span>`,
    label: pluginInstance.i18n.setting,
    click: () => {
      showSettingPage(pluginInstance)
    },
  })

  menu.addSeparator()
  menu.addItem({
    iconHTML: `<span class="iconfont-icon">${icons.iconHome}</span>`,
    label: pluginInstance.i18n.showHome,
    click: () => {
      const blogIndex = "/plugins/siyuan-blog/#/"
      const origin = getAvailableOrigin()
      // showPage(pluginInstance, blogIndex, pluginInstance.i18n.home)
      window.open(`${origin}${blogIndex}`)
    },
  })

  menu.addSeparator()
  menu.addItem({
    iconHTML: `<span class="font-awesome-icon">${icons.iconBrowser}</span>`,
    label: pluginInstance.i18n.browserOpen,
    click: () => {
      const pageId = PageUtil.getPageId()
      const blogIndex = `/plugins/siyuan-blog/#/s/${pageId}`
      const origin = getAvailableOrigin()
      window.open(`${origin}${blogIndex}`)
    },
  })

  if (pluginInstance.isMobile) {
    menu.fullscreen()
  } else {
    menu.open({
      x: rect.right,
      y: rect.bottom,
      isLeft: true,
    })
  }
}

export const showSettingPage = (pluginInstance: SiyuanBlog) => {
  const settingPage = "/plugins/siyuan-blog/#/setting"
  showPage(pluginInstance, settingPage, pluginInstance.i18n.setting)
}

const showPage = (pluginInstance: SiyuanBlog, pageUrl: string, title?: string) => {
  pluginInstance.logger.info("open page =>", pageUrl)
  new Dialog({
    title: `${pluginInstance.i18n.siyuanBlog}${title ? " - " + title : ""}`,
    transparent: false,
    content: contentHtml(pageUrl),
    width: "60%",
    height: "550px",
  } as any)
}

/**
 * 分享选项显示区域
 * 在 box 元素下方显示一个弹出框
 *
 * @param pluginInstance 插件实例对象
 * @param boxElement 被点击的 box 元素
 * @param pageUrl 当前页面的 URL
 */
const showPopView = (pluginInstance: SiyuanBlog, boxElement: HTMLElement, pageUrl: string) => {
  const popContentId = "pop-content"
  let popContent = document.getElementById(popContentId)

  // 第一次点击，创建浮动框并显示
  popContent = document.createElement("div")
  popContent.id = popContentId

  // 获取 box 元素的位置和大小信息
  const boxRect = boxElement.getBoundingClientRect()

  // 计算浮动框的宽度和位置
  const popContentWidth = 750 // 假设弹出框的宽度为 750 像素
  const left = boxRect.left - popContentWidth // 基于 box 元素的左侧定位
  const top = boxRect.bottom + window.pageYOffset

  // 设置浮动框的样式
  popContent.style.width = `${popContentWidth}px`
  popContent.style.left = `${left}px`
  popContent.style.top = `${top}px`
  popContent.style.zIndex = "9999"
  popContent.style.opacity = "0"
  popContent.style.transition = "opacity 0.3s ease-in-out"

  // 填充内容
  popContent.innerHTML = contentElement(pageUrl).innerHTML

  document.body.appendChild(popContent)

  // 开启淡入动画
  setTimeout(() => {
    if (popContent) {
      popContent.style.opacity = "1"
    }
  }, 50)

  // 监听点击事件，以实现点击弹出框以外区域隐藏弹出框的功能
  const handleClickOutside = (event: MouseEvent) => {
    // 判断点击事件是否在弹出框以外的区域
    if (popContent && !popContent.contains(event.target as Node) && !boxElement.contains(event.target as Node)) {
      hidePopView()
      document.removeEventListener("click", handleClickOutside)
    }
  }
  document.addEventListener("click", handleClickOutside)

  function hidePopView() {
    // 开启淡出动画
    popContent?.style.setProperty("opacity", "0")

    // 在过渡结束后，删除浮动框
    setTimeout(() => {
      // 如果浮动框没有被移除，则进行移除操作
      if (popContent && popContent.parentNode === document.body) {
        document.body.removeChild(popContent)
      }
    }, 300) // 等待 300ms，即过渡时间，然后再删除浮动框
  }
}
