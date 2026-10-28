/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import { loadScriptOnce, loadStylesheetOnce } from "~/utils/assetLoader"

const KATEX_SCRIPT_PATH = "libs/katex/0.16.10/katex.min.js"
const KATEX_STYLESHEET_PATH = "libs/katex/0.16.10/katex.min.css"

/**
 * 处理客户端公式
 */
const useClientFormulate = () => {
  const logger = createAppLogger("use-client-formulate-plugin")
  const win = window as any

  const renderFormulate = async (el: HTMLElement) => {
    // 没有公式时完全不加载 KaTeX
    const inlineMathElements = el.querySelectorAll("span[data-type=\"inline-math\"][data-subtype=\"math\"]")
    const mathBlockElements = el.querySelectorAll("div[data-type=\"NodeMathBlock\"]")

    if (inlineMathElements.length === 0 && mathBlockElements.length === 0) {
      return
    }

    try {
      await Promise.all([
        loadStylesheetOnce(KATEX_STYLESHEET_PATH),
        loadScriptOnce(KATEX_SCRIPT_PATH),
      ])
    } catch (e) {
      logger.error("Failed to load KaTeX", e)
      return
    }

    if (!win.katex) {
      logger.error("KaTeX is not available")
      return
    }

    // 内联公式
    inlineMathElements.forEach((inlineMathElement) => {
      const inlineContentValue = inlineMathElement.getAttribute("data-content")
      win.katex.render(inlineContentValue, inlineMathElement, {
        throwOnError: false,
      })
    })

    // 多行公式
    mathBlockElements.forEach((mathBlockElement) => {
      const blockContentValue = mathBlockElement.getAttribute("data-content")
      win.katex.render(blockContentValue, mathBlockElement, {
        throwOnError: false,
      })
    })
  }

  return { renderFormulate }
}

export { useClientFormulate }
