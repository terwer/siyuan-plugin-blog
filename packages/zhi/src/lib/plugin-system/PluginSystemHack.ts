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

import ZhiUtil from "../../ZhiUtil"

/**
 * hack插件系统的某些功能
 *
 * @author terwer
 * @since 1.0.0
 */
class PluginSystemHack {
  private readonly logger
  private readonly common

  constructor() {
    this.logger = ZhiUtil.zhiLog("plugin-system-hack")
    this.common = ZhiUtil.zhiCommon()
  }

  public async initPluginSystem() {
    // 情形一：初始化过了，直接返回，防止插件系统重复加载
    const pluginSystem = await this.getPluginSystem()
    if (pluginSystem) {
      this.logger.info("Plugin system already loaded by others, most likely snapshots, ignore initiation.")
      this.logger.debug(pluginSystem)
      this.logger.info("Loaded plugin system version is ", this.getPluginSystemVersion())
      return Promise.resolve(pluginSystem)
    }

    // 情形二：未初始化，重新初始化插件系统
    try {
      this.logger.info("Undetected plugin system，initiating plugin system...")

      this.common.siyuanUtil.siyuanWindow().pluginSystemSource = "bazzar"

      let js
      const firstRes = await this.fetchPluginFromWidget()
      if (firstRes.code == 200) {
        js = firstRes.text
        this.logger.info("Success loaded plugin js during first try=>", firstRes.code)
      } else {
        // 下载挂件
        // TODO

        const secondRes = await this.fetchPluginFromWidget()
        js = secondRes.text

        this.logger.info("Try download plugin js during second try=>", secondRes.code)
      }
      // this.logger.debug("plugin js code=>", js)

      eval(js)
    } catch (e) {
      this.logger.error("Plugin system Load error", e)
      throw e
    }

    const sysv = this.getPluginSystemVersion() ?? "unknown"
    this.logger.info(this.common.strUtil.f("Plugin system inited, version => {0}.", sysv))
    return this.getPluginSystem()
  }

  /**
   * 从挂件系统读取文件
   *
   * @private
   */
  private async fetchPluginFromWidget() {
    const response = await fetch("/api/file/getFile", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      // 主题集成插件系统，暂时不能用
      // body: JSON.stringify({ path: "/appearance/themes/zhi/plugin.js" }),
      // 挂件版插件文件，不一定存在
      body: JSON.stringify({ path: "/data/widgets/插件系统/plugin.js" }),
    })

    let responseText = ""
    if (response.status == 200) {
      responseText = await response.text()
    }

    return {
      code: response.status,
      text: responseText,
    }
  }

  /**
   * 获取插件系统对象
   */
  private getPluginSystem = async () => {
    const result = this.common.siyuanUtil.siyuanWindow().pluginSystem
    if (typeof result === "object" && typeof result.then === "function") {
      return result
    } else {
      return Promise.resolve(result)
    }
  }

  /**
   * 获取插件系统版本
   */
  private getPluginSystemVersion = () => {
    return this.common.siyuanUtil.siyuanWindow().pluginSystemVersion
  }
}

export default PluginSystemHack
