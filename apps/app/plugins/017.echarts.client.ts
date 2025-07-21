/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import { JsonUtil } from "zhi-common"

/**
 * ECharts 渲染插件 - 客户端
 *
 * @author terwer
 * @version 1.0.0
 * @since 0.0.1
 */
export default defineNuxtPlugin(({ vueApp }) => {
  const logger = createAppLogger("echarts-client-plugin")

  // 解析配置内容
  const parseOption = (content: string) => {
    if (!content) {
      return null
    }

    // 清理内容
    const cleanContent = content.trim()
      .replace(/\r\n/g, "\n")
      .replace(/\n\s+/g, "\n")

    try {
      // 尝试作为 JSON 解析
      const jsonOption = JsonUtil.safeParse(cleanContent, null)
      if (jsonOption) {
        return jsonOption
      }

      // 尝试作为 JavaScript 对象解析
      try {
        // 检查是否是立即执行函数
        const isIIFE = /^\s*\(\s*\(\s*\)\s*=>\s*\{/.test(cleanContent)
        if (isIIFE) {
          // eslint-disable-next-line no-new-func
          const fn = new Function(`return ${cleanContent}`)()
          return fn()
        }
        // 如果是普通 JavaScript 对象
        // eslint-disable-next-line no-new-func
        const jsOption = new Function(`return ${cleanContent}`)()
        return jsOption
      } catch (e) {
        logger.error("Failed to parse JavaScript option", e)
        return null
      }
    } catch (e) {
      logger.error("Failed to parse option", e)
      return null
    }
  }

  vueApp.directive("echarts", (el: HTMLElement) => {
    logger.info("Start handling ECharts blocks on client")
    // 查找所有 ECharts 代码块
    const echartsBlocks = el.querySelectorAll("[data-type=\"NodeCodeBlock\"][data-subtype=\"echarts\"]")
    echartsBlocks.forEach((block: any) => {
      const content = block.getAttribute("data-content")
      if (content) {
        try {
          const option = parseOption(content)
          if (!option) {
            logger.error("Failed to parse ECharts option")
            return
          }
          // 创建新的图表容器
          const chartContainer = document.createElement("div")
          chartContainer.style.width = "100%"
          chartContainer.style.height = "400px"
          // 替换原有的代码块
          block.parentNode.replaceChild(chartContainer, block)
          // 初始化图表
          const chart = (window as any).echarts.init(chartContainer)
          chart.setOption(option)
          // 监听窗口大小变化
          window.addEventListener("resize", () => {
            chart.resize()
          })
        } catch (e) {
          logger.error("Failed to render ECharts", e)
        }
      }
    })
  })
})
