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

import sysUtil from "../utils/sysUtil"

/**
 * zhi主题统一生命周期管理
 *
 * @author terwer
 * @since 0.0.1
 */
class Lifecycle {
  public async loadPlugins() {
    console.log("plugin is loading...")

    await this.loadPluginSystem()

    console.log("plugin loaded.")
  }

  /**
   * SiYuanPluginSystem
   *
   * @private
   */
  private async loadPluginSystem() {
    const path = window.require("path")
    try {
      const data = window
        .require("fs")
        .readFileSync(
          path.join(
            sysUtil.getCrossPlatformAppDataFolder(),
            ".siyuan",
            "plugin.js"
          )
        )
      const script = data.toString("utf8")
      console.log("local plugin system found, loading...")
      eval(script)
    } catch (e) {
      console.log("local plugin system not found, load online")
      return fetch(
        "https://gitee.com/zuoez02/siyuan-plugin-system/raw/main/main.js",
        { cache: "no-cache" }
      )
        .then((res) => res.text())
        .then((sc) => {
          // @ts-ignore
          window.siyuanPluginScript = sc
          eval(sc)
        })
    }
  }
}

export default Lifecycle
