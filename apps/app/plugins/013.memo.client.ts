/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2025 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

/**
 * 备注插件
 * https://github.com/nuxt/nuxt/issues/13382
 * client = browser only
 *
 * @author terwer
 * @version  6.1.0
 * @since 6.1.0
 */
/**
 * 备注插件
 * https://github.com/nuxt/nuxt/issues/13382
 * client = browser only
 *
 * @author terwer
 * @version  6.1.0
 * @since 6.1.0
 */
export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.directive("desc", {
    mounted (el: HTMLElement, binding: any) {
      // 获取所有包含 inline-memo 内容的元素
      const inlineMemoElements = document.querySelectorAll("[data-type=\"inline-memo\"]") as NodeListOf<HTMLElement>

      inlineMemoElements.forEach((el) => {
        // 创建 tooltip 元素
        const tooltip = document.createElement("div")
        const tooltipId = `tooltip-${Math.random().toString(36).slice(2, 11)}` // 使用 slice 替代 substr
        tooltip.setAttribute("data-tooltip-id", tooltipId) // 添加唯一的 data 属性
        tooltip.classList.add("s-feat-tooltip") // 使用 s-feat-tooltip 作为类名
        tooltip.style.position = "absolute"
        tooltip.style.pointerEvents = "none"
        tooltip.style.display = "none"
        tooltip.style.maxWidth = "300px" // 最大宽度，避免超出屏幕
        tooltip.style.wordWrap = "break-word" // 自动换行
        document.body.appendChild(tooltip)

        // 监听元素的鼠标进入、移动、离开事件
        el.addEventListener("mouseenter", (event: MouseEvent) => {
          const content = el.getAttribute("data-inline-memo-content")
          tooltip.textContent = content || "" // 如果没有 content 则设置为空字符串
          tooltip.style.display = "block"

          // 获取目标元素的位置
          const rect = el.getBoundingClientRect()

          // 计算 tooltip 距离浏览器右边的剩余空间
          const rightSpace = window.innerWidth - rect.right

          // 如果剩余空间不足，tooltip 将显示在左侧
          if (rightSpace < tooltip.offsetWidth + 20) {
            tooltip.style.left = `${rect.left - tooltip.offsetWidth - 10}px` // 调整到左侧显示
          } else {
            tooltip.style.left = `${rect.right + 10}px` // 右侧显示
          }

          tooltip.style.top = `${rect.top}px` // 保持和目标元素的顶部对齐
        })

        el.addEventListener("mousemove", (event: MouseEvent) => {
          const rect = el.getBoundingClientRect()
          tooltip.style.left = `${rect.right + 10}px` // 保持在右侧
          tooltip.style.top = `${rect.top}px` // 保持和目标元素的顶部对齐
        })

        el.addEventListener("mouseleave", () => {
          tooltip.style.display = "none"
        })
      })
    },
    unmounted () {
      // 清理所有 tooltip 元素
      const inlineMemoElements = document.querySelectorAll("[data-tooltip-id]") as NodeListOf<HTMLElement>
      inlineMemoElements.forEach((tooltip) => {
        tooltip.remove() // 移除特定的 tooltip
      })
    }
  })
})
