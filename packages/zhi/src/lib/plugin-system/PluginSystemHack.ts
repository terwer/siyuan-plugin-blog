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
    } catch (e) {
      this.logger.debug("Plugin system Load error", e)
    }

    const sysv = this.getPluginSystemVersion() ?? "unknown"
    this.logger.info(this.common.strUtil.f("Plugin system inited, version => {0}.", sysv))
    return this.getPluginSystem()
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
