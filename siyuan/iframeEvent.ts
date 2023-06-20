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

import { popContentIframeId } from "~/siyuan/siyuanConstants"
import { createAppLogger } from "~/common/appLogger"

const logger = createAppLogger("iframe-events")
let added = false
const adjustIframeHeight = (iframeId: string, customHeight?: number) => {
  const iframe = document.getElementById(iframeId) as HTMLIFrameElement
  let counter = 0
  let lastHeight = "0px" // 将初始高度设为 "0px"
  const defaultHeight = 350

  // 注册定时器
  const interval = setInterval(() => {
    // 获取id为__nuxt的元素高度
    const iframeBody = iframe?.contentWindow?.document.getElementById("__nuxt") as HTMLElement
    let height = `${customHeight ?? iframeBody?.scrollHeight ?? defaultHeight}px`
    if (height === lastHeight) {
      if (!added) {
        height = height + 10
        added = true
        logger.info(`Added 10px height for ${iframeId}`)
      }
      counter++
      if (counter >= 5) {
        clearInterval(interval)
        logger.info(`Stopped adjusting iframe height for ${iframeId}`)
        return
      }
    } else {
      counter = 0
    }
    lastHeight = height
    logger.info(`Calculated iframe height: ${height}`)
    iframe.height = height
  }, 200)

  // 触发第一次load事件
  if (iframe?.contentWindow?.document.readyState === "complete") {
    logger.info(`Dispatched load event for ${iframeId}.`)
    iframe.dispatchEvent(new Event("load"))
  }
}

/**
 * 注册 iframe 事件
 */
export const registerIframeEvent = () => {
  // 监听 message 事件
  window.addEventListener("message", (event) => {
    const iframe = document.getElementById(popContentIframeId) as HTMLIFrameElement

    // 判断是否是来自指定 iframe 的消息
    if (event.source === iframe.contentWindow) {
      const data = event.data
      // 判断消息类型
      if (data.type === "updateHeight") {
        logger.info(`Received update height message from iframe`)
        const height = data.height
        // 更新 iframe 高度
        if (height) {
          iframe.height = `${height}px`
          logger.info(`Updated iframe height to ${height}px`)
        } else {
          adjustIframeHeight(popContentIframeId)
          logger.info(`Auto adjust iframe height to ${height}px`)
        }
      } else {
        logger.warn(`Unknown message type, ignore`)
      }
    } else {
      logger.warn(`message is not from contentWindow, ignore`)
    }
  })
  logger.info("iframe event registered in plugin main")
}
