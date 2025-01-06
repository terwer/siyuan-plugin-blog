/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import { useBaseUrl } from "~/plugins/libs/renderer/useClientBaseUrl"

/**
 * 处理块链接
 */
export const useStaticBlockRef = () => {
  const logger = createAppLogger("use-block-ref")
  const { getHome } = useBaseUrl()

  // 尝试获取配置
  const getCfg = () => {
    const str = window.localStorage.getItem("static.app.config.json")
    if (str) {
      try {
        return JSON.parse(str)
      } catch (e) {
        return null
      }
    }
    return null
  }

  // 将所有类型为 "block-ref" 的 span 元素转换成 a 元素
  const convertBlockRefLinks = (rootElement: any) => {
    const home = getHome()

    rootElement.querySelectorAll("span[data-type=\"block-ref\"]").forEach((el: HTMLElement) => {
      const id = el.getAttribute("data-id")
      const cfg = getCfg()
      let urlPath = "s"
      if (cfg) {
        urlPath = cfg?.docPath ?? urlPath
      }
      const href = `${home}/${urlPath}/${id}`

      // 创建一个新的 a 元素
      const newEl = document.createElement("a")
      newEl.href = href
      newEl.target = "_blank"
      newEl.textContent = el.textContent

      // 将原来的元素替换为新创建的 a 元素
      el.replaceWith(newEl)
    })
    logger.info("Converted all span elements of type block-ref to a elements")
  }

  // 将所有类型为 "a" 的 span 元素转化成 a 元素
  const convertALinks = (rootElement: any) => {
    rootElement.querySelectorAll("span[data-type=\"a\"]").forEach((el: HTMLElement) => {
      const href = el.getAttribute("data-href") ?? "#"

      // 创建一个新的 a 元素
      const newEl = document.createElement("a")
      newEl.href = href
      newEl.target = "_blank"
      newEl.textContent = el.textContent

      // 将原来的元素替换为新创建的 a 元素
      el.replaceWith(newEl)
    })
    logger.info("Convert all span elements of type a to a element")
  }

  // 组合上述函数，实现对所有类型为 "block-ref" 和 "a" 的 span 元素的转换
  const convertAllLinks = (rootElement: any) => {
    convertBlockRefLinks(rootElement)
    convertALinks(rootElement)
  }

  return { convertAllLinks }
}
