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

import { createAppLogger } from "~/common/appLogger"

const logger = createAppLogger("use-share-option")

export const useShareOptionToggle = (initialValue: boolean) => {
  const optionState = ref(initialValue)

  const optionToggle = () => {
    optionState.value = !optionState.value
    sendMessageToParent("updateHeight")
  }

  return {
    optionState,
    optionToggle,
  }
}

const sendMessageToParent = (type: string) => {
  const win = window.self as any
  if (!win.parent.siyuan) {
    logger.info(`Not in siyuan-note plugin iframe environment, ignore message sending`)
    return
  }

  // 获取当前窗口对象
  const iframeWindow = window.self

  // 向父窗口发送消息
  iframeWindow.parent.postMessage({ type: type }, "*")
  logger.info(`Sends a message to the parent window, type => ${type}`)
}
