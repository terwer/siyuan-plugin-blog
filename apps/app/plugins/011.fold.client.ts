/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2025 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

const addToggleFoldButton = (el: HTMLElement) => {
  // 获取所有具有 fold="1" 属性的 div 元素
  const divs = el.querySelectorAll("div[fold='1']")

  // 遍历每个 div 元素，添加按钮并设置事件监听器
  divs.forEach((div) => {
    // 创建 div 元素作为按钮
    const toggleButton = document.createElement("div")
    toggleButton.textContent = "+展开" // 默认文本为 +展开
    toggleButton.classList.add("fold-block-toggle-button") // 使用 fold-block- 前缀

    // 获取 div 的父元素
    const parent = div.parentNode
    if (!parent) { return }

    // 创建一个容器包裹按钮和原始元素，避免破坏 DOM 结构
    const wrapper = document.createElement("div")
    wrapper.style.display = "flex" // 横向排列
    wrapper.style.alignItems = "baseline"
    parent.insertBefore(wrapper, div)
    wrapper.appendChild(toggleButton)
    wrapper.appendChild(div)

    // 为按钮添加点击事件
    toggleButton.addEventListener("click", () => {
      // 如果 fold 属性是 "1"，则更改为 "0"
      if (div.getAttribute("fold") === "1") {
        div.setAttribute("fold", "0")
        toggleButton.textContent = "-收起" // 切换按钮为 -收起
      } else {
        div.setAttribute("fold", "1")
        toggleButton.textContent = "+展开" // 切换按钮为 +展开
      }
    })
  })
}

/**
 * 折叠块插件
 * https://github.com/nuxt/nuxt/issues/13382
 * client = browser only
 *
 * @author terwer
 * @version  6.1.0
 * @since 6.1.0
 */
export default defineNuxtPlugin(({ vueApp }) => {
  const logger = createAppLogger("fold-client-plugin")

  vueApp.directive("fold", {
    mounted (el, binding) {
      addToggleFoldButton(el)
      logger.info("fold directive mounted")
    }
  })
})
