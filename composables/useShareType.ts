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

import { ShareTypeEnum } from "~/enums/ShareTypeEnum"
import { createAppLogger } from "~/common/appLogger"

/**
 * 自定义hook，用于获取分享类型
 */
export const useShareType = () => {
  const logger = createAppLogger("use-share-type")

  /**
   * 获取分享类型
   */
  const getShareType = () => {
    // const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    // logger.info(`check isLocalhost => ${isLocalhost}, window.location.hostname = `, window.location.hostname)
    // // 为安全起见，非 127.0.0.1 分享全部采用静态
    // // 因为 https://github.com/siyuan-note/siyuan/pull/9634 导致公共分享不可用了
    // if (!isLocalhost) {
    //   logger.warn(
    //     "当前不是本地环境，无法实现公共分享，将使用静态，详情请参考：https://github.com/siyuan-note/siyuan/pull/9634"
    //   )
    // }

    // 为安全起见，全部采用静态分享
    const win = window.parent as any
    const accessAuthCodeEnabled = win?.siyuan?.config?.accessAuthCode !== ""
    logger.info(`accessAuthCodeEnabled => ${accessAuthCodeEnabled}`)
    return ShareTypeEnum.ShareType_Static
  }

  /**
   * 判断是否为私有分享
   *
   * @returns {boolean} 是否为私有分享
   */
  const isPrivateShare = (): boolean => {
    return getShareType() === ShareTypeEnum.ShareType_Static
  }

  return { getShareType, isPrivateShare }
}
