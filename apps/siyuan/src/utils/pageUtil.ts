/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

/**
 * 页面统一入口，根据路由创建不同页面
 */
class PageUtil {
  public static getPageId() {
    const getTitlePageId = (title: Element | null | undefined) => title?.getAttribute("data-node-id") ?? ""

    // 活动窗口的焦点页签才是当前文档；分屏里另一个编辑器即使可见也不能当作当前文档
    const activeTabId = document
      .querySelector(".layout__wnd--active .layout-tab-bar .item--focus[data-id]")
      ?.getAttribute("data-id")
    if (activeTabId) {
      const activeEditor = Array.from(document.querySelectorAll("div.protyle[data-id]")).find(
        (editor) => editor.getAttribute("data-id") === activeTabId
      )
      const activeTitle = activeEditor?.querySelector("div.protyle-title[data-node-id]")
      if (activeTitle) {
        return getTitlePageId(activeTitle)
      }
    }

    // 回退：直接找文档标题节点，跳过隐藏页签里的标题；不依赖 protyle-lite-fragment 类名
    const titles = Array.from(document.querySelectorAll("div.protyle-title[data-node-id]"))
    return getTitlePageId(titles.find((title) => title.closest(".fn__none") === null))
  }
}

export default PageUtil
