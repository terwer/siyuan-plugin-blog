/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

/**
 * 处理客户端公式
 */
const useClientFormulate = () => {
  const logger = createAppLogger("use-client-formulate-plugin")
  const win = window as any

  const renderFormulate = (el: HTMLElement) => {
    // 内联公式
    const inlineMathElements = document.querySelectorAll("span[data-type=\"inline-math\"][data-subtype=\"math\"]")
    // console.log(inlineMathElements)
    if (inlineMathElements) {
      inlineMathElements.forEach((inlineMathElement) => {
        const inlineContentValue = inlineMathElement.getAttribute("data-content")
        win.katex.render(inlineContentValue, inlineMathElement, {
          throwOnError: false,
        })
      })
    }
    // 替换
    // 替换成 $inlineContentValue$

    // 多行公式
    const mathBlockElements = document.querySelectorAll("div[data-type=\"NodeMathBlock\"]")
    mathBlockElements.forEach((mathBlockElement) => {
      const blockContentValue = mathBlockElement.getAttribute("data-content")
      // mathBlockElement.innerHTML = `$$${blockContentValue}$$`
      // win.renderMathInElement(mathBlockElement)
      win.katex.render(blockContentValue, mathBlockElement, {
        throwOnError: false,
      })
    })
  }

  return { renderFormulate }
}

export { useClientFormulate }
