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

import cjsUtil from "~/src/utils/cjsUtil"
import BrowserUtil from "~/src/utils/browserUtil"

const path = cjsUtil.safeRequire("path")

class SiyuanUtil {
  public syWin() {
    return (BrowserUtil.isInBrowser ? window : {}) as any
  }

  public SIYUAN_CONF_PATH() {
    return this.syWin()?.siyuan.config.system.confDir
  }

  public SIYUAN_DATA_PATH() {
    return this.syWin()?.siyuan.config.system.dataDir
  }

  public SIYUAN_APPEARANCE_PATH() {
    return path.join(this.SIYUAN_CONF_PATH(), "appearance")
  }

  public SIYUAN_THEME_PATH() {
    return path.join(this.SIYUAN_APPEARANCE_PATH(), "themes")
  }

  public ZHI_THEME_PATH() {
    return path.join(this.SIYUAN_THEME_PATH(), "zhi")
  }

  public ZHI_CJS_PATH() {
    return path.join(this.ZHI_THEME_PATH(), "dist-cjs")
  }

  getCrossPlatformAppDataFolder = () => {
    let configFilePath
    if (this.syWin()?.process.platform === "darwin") {
      configFilePath = path.join(
        this.syWin()?.process.env.HOME,
        "/Library/Application Support"
      )
    } else if (this.syWin()?.process.platform === "win32") {
      // Roaming包含在APPDATA中了
      configFilePath = this.syWin()?.process.env.APPDATA
    } else if (this.syWin()?.process.platform === "linux") {
      configFilePath = this.syWin()?.process.env.HOME
    }
    return configFilePath
  }
}

const siyuanUtil = new SiyuanUtil()
export default siyuanUtil
