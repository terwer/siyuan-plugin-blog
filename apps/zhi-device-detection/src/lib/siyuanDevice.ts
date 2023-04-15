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

import BrowserUtil from "./browserUtil"

/**
 * 思源笔记设备
 */
class SiyuanDevice {
  /**
   * 思源笔记iframe挂件环境
   */
  public static isInSiyuanWidget = () => {
    if (!BrowserUtil.isInBrowser) {
      return false
    }
    return (
      window.frameElement != null &&
      window.frameElement.parentElement != null &&
      window.frameElement.parentElement.parentElement != null &&
      window.frameElement.parentElement.parentElement.getAttribute("data-node-id") !== ""
    )
  }

  /**
   * 思源笔记新窗口
   *
   * @deprecated window.terwer 判断方式已废弃，建议以后打开新窗口注入 window.siyuanNewWin ，这样语义会更容易理解
   * @author terwer
   * @version 0.1.0
   * @since 0.0.1
   */
  public static isInSiyuanNewWin = () => {
    if (!BrowserUtil.isInBrowser) {
      return false
    }
    if (!BrowserUtil.isElectron()) {
      return false
    }

    /**
     * @deprecated 已废弃，建议以后使用 window.siyuanNewWin 来判断，会更有意义
     */
    return typeof (window as any).terwer !== "undefined" || typeof (window as any).siyuanNewWin !== "undefined"
  }
}

export default SiyuanDevice
