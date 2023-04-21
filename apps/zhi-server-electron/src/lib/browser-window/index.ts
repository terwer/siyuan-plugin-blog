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

import ZhiServerElectronUtil from "../util/ZhiServerElectronUtil"
import WindowManager from "./WindowManager"
import { SiyuanDevice } from "zhi-device"

/**
 * 这里统一挂载一个方法，可以打开 Electron 的 BrowserWindow
 *
 * @author terwer
 * @version 1.0.0
 * @since 1.0.0
 */
class ZhiBrowserWindow {
  private readonly logger
  private readonly common

  private readonly windowManager

  constructor() {
    this.logger = ZhiServerElectronUtil.zhiLog("zhi-browser-window")
    this.common = ZhiServerElectronUtil.zhiCommon()

    this.windowManager = new WindowManager()
  }

  /**
   * 挂载 BrowserWindow
   *
   * @author terwer
   * @since 1.0.0
   */
  public initBrowserWindow() {
    SiyuanDevice.siyuanWindow().zhiWindow = this.windowManager
    this.logger.info("zhiWindow mounted")
    return "ok"
  }
}

export default ZhiBrowserWindow
