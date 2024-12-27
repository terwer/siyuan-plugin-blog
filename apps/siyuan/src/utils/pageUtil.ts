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
    // 查找包含 protyle 类但不包含 fn__none 的 div 元素
    const protyleElement = document.querySelector("div.protyle:not(.fn__none)")
    // 在该 div 元素下查找包含 protyle-title 类的 div 元素，并查找 data-node-id 属性
    const protyleTitleElement = protyleElement?.querySelector("div.protyle-title")
    // 如果该元素存在 data-node-id 属性，则获取其值并返回，否则返回空字符串
    return protyleTitleElement?.hasAttribute("data-node-id") ? protyleTitleElement.getAttribute("data-node-id") : ""
  }
}

export default PageUtil
