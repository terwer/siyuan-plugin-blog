/*
 * Copyright (c) 2023, Terwer . All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Terwer designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Terwer in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Terwer, Shenzhen, Guangdong, China, youweics@163.com
 * or visit www.terwer.space if you need additional information or have any
 * questions.
 */

import { useBaseUrl } from "~/plugins/renderer/useClientBaseUrl"
import { createAppLogger } from "~/common/appLogger"

/**
 * 处理块链接
 */
export const useBlockRef = () => {
  const logger = createAppLogger("use-block-ref")
  const { getHome } = useBaseUrl()

  // 将所有类型为 "block-ref" 的 span 元素转换成 a 元素
  const convertBlockRefLinks = (rootElement: any) => {
    const home = getHome()

    rootElement.querySelectorAll('span[data-type="block-ref"]').forEach((el: HTMLElement) => {
      const id = el.getAttribute("data-id")
      const href = `${home}/s/${id}`

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
    rootElement.querySelectorAll('span[data-type="a"]').forEach((el: HTMLElement) => {
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
