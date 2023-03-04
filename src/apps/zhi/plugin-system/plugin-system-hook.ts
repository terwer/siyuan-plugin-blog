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

import logFactory from "~/src/utils/logUtil"
import pluginSystemUtil, { HackPluginSystem } from "~/src/utils/otherlib/pluginSystemUtil"
import siyuanUtil from "~/src/utils/otherlib/siyuanUtil"
import strUtil from "~/src/utils/strUtil"

// 警告1⚠️：此文件会在购建时生成js文件，并且由theme.js动态调用
// 警告2⚠️：请勿主动调用此文件中的任何方法

const fs = window.require("fs")
const path = window.require("path")

/**
 * 插件系统入口（由theme.js动态调用，请勿主动调用）
 * vite构建配置：config/vite.cjs.config.plugin.system.hook
 *
 * @author terwer
 * @since 1.0.0
 */
class PluginSystemHook {
  private logger = logFactory.getLogger("plugin-system-hook")

  getOldPluginVersion(p: any, zhiPlugin: any) {
    let oldVersion = pluginSystemUtil.OLD_VERSION_ZERO
    const plugins = p.pslm.storageMangager.thirdPartyPlugins
    for (const item of plugins) {
      this.logger.debug("Plugin=>", item)
      if (zhiPlugin.name !== item.name) {
        continue
      }
      oldVersion = item.version
    }

    return oldVersion
  }

  async syncZhiPlugins(p: any) {
    const hack = new HackPluginSystem()

    this.logger.info("Start syncing zhi plugins ...")

    // 主题插件目录
    const zhiPluginsPath = path.join(
      siyuanUtil.ZHI_CJS_PATH,
      pluginSystemUtil.ZHI_PLUGIN_FOLDER
    )
    this.logger.info("Zhi plugins folder=>", zhiPluginsPath)

    // 插件系统默认目录
    const pluginsPath = path.join(
      siyuanUtil.SIYUAN_DATA_PATH,
      pluginSystemUtil.PLUGIN_FOLDER
    )
    this.logger.info("Plugins folder=>", pluginsPath)

    let zhiPlugins = []
    // 未找到主题差距，不同步
    if (!fs.existsSync(zhiPluginsPath)) {
      this.logger.warn("No zhi plugins found, stop!")
    } else {
      // 扫描插件并同步
      zhiPlugins = await hack.scanPlugins(zhiPluginsPath)
      for (const item of zhiPlugins) {
        const manifest = await hack.getManifest(
          path.join(item, pluginSystemUtil.MANIFEST)
        )
        this.logger.debug("ZhiPlugin=>", manifest)

        const oldVersion = this.getOldPluginVersion(p, manifest)
        this.logger.debug("OldVersion=>", oldVersion)

        // if (oldVersion === OLD_VERSION_ZERO) {
        // }
      }
    }

    this.logger.info(
      strUtil.f(
        "Syncing zhi theme plugins finished.synced {0} plugin(s).",
        zhiPlugins.length
      )
    )
  }

  async init() {
    await pluginSystemUtil.initPluginSystem()
    const sysv = pluginSystemUtil.getPluginSystemVersion()
    this.logger.info("Plugin system initiation finished.", sysv)

    const sys = await pluginSystemUtil.getPluginSystem()
    this.logger.info("Syncing zhi theme plugins...", sys)
    await this.syncZhiPlugins(sys)
  }
}

const pluginSystemHook = new PluginSystemHook()
module.exports = pluginSystemHook
