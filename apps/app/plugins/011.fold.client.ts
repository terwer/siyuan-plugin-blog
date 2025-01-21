/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2025 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import { JsonUtil, StrUtil } from "zhi-common"

const getFoldInner = (foldBlocksDatas: any, foldEl: any) => {
  const foldBlockId = foldEl.getAttribute("data-node-id")

  if (!foldBlockId || !foldBlocksDatas) {
    return null
  }

  const foldBlock = foldBlocksDatas.foldBlockMap[foldBlockId]

  if (!foldBlock) {
    return null
  }

  return foldBlock
}

const addToggleFoldButton = (el: HTMLElement) => {
  // 从data-foldblocks取数据
  const foldBlocksStr = el.getAttribute("data-foldblocks")
  const foldBlocksDatas = JsonUtil.safeParse<any>(foldBlocksStr, {} as any)

  // 获取所有具有 fold="1" 属性的 div 元素
  const foldBlocks = el.querySelectorAll("div[fold='1']")
  // 遍历每个 div 元素，添加按钮并设置事件监听器
  foldBlocks.forEach((foldEl) => {
    const foldBlockId = foldEl.getAttribute("data-node-id")

    // 创建切换按钮
    const toggleButton = document.createElement("div")
    toggleButton.textContent = "+展开" // 默认文本为 +展开
    toggleButton.classList.add("fold-block-toggle-button") // 使用 fold-block- 前缀

    // 获取 div 的父元素
    const parent = foldEl.parentNode
    if (!parent) {
      return
    }

    // 创建一个容器包裹按钮和原始元素，避免破坏 DOM 结构
    const wrapper = document.createElement("div")
    wrapper.classList.add("fold-block-wrapper")
    // 标题不能 flex
    if (foldEl.getAttribute("data-type") === "NodeHeading") {
      wrapper.style.display = "block"
    }

    // 插入按钮和原始元素
    parent.insertBefore(wrapper, foldEl)
    wrapper.appendChild(toggleButton)
    wrapper.appendChild(foldEl)

    // 为按钮添加点击事件
    toggleButton.addEventListener("click", () => {
      const isFolded = foldEl.getAttribute("fold") === "1"

      // 如果当前是折叠状态
      if (isFolded) {
        foldEl.setAttribute("fold", "0")
        toggleButton.textContent = "-收起" // 切换按钮为 -收起

        // 获取需要追加的 HTML 内容，可能为空
        const newContent = getFoldInner(foldBlocksDatas, foldEl)
        // 如果 newContent 有值，动态创建并插入内容
        if (!StrUtil.isEmptyString(newContent)) {
          // 用于存储动态追加的内容
          const foldInner: HTMLElement | null = document.createElement("div")
          foldInner.id = "fold-inner-" + foldBlockId
          foldInner.innerHTML = newContent || "" // 即使是空内容，也插入空元素
          foldInner.classList.add("fold-inner") // 为追加的内容添加特定的类名

          // 获取 foldEl 的父元素
          const parent = foldEl.parentNode
          if (parent) {
            // 将 foldInner 插入到 foldEl 的下一个兄弟元素位置
            parent.insertBefore(foldInner, foldEl.nextSibling)
          }
        }
      } else {
        // 当前是展开状态
        foldEl.setAttribute("fold", "1")
        toggleButton.textContent = "+展开" // 切换按钮为 +展开

        // 展开状态时，删除动态追加的内容
        const foldInner = foldEl.parentNode?.querySelector(`#fold-inner-${foldBlockId}`)
        if (foldInner) {
          foldEl.parentNode?.removeChild(foldInner)
        }
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
    }
  })
})
