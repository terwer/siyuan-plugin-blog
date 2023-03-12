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

import ZhiUtil from "~/src/utils/ZhiUtil"
import HackPluginSystem from "~/src/plugin-system/pluginSystemUtil"

/**
 * 插件系统入口（由theme.js动态调用，请勿主动调用）
 * vite构建配置：config/vite.cjs.config.plugin.system.hook
 *
 * @author terwer
 * @since 1.0.0
 */
class PluginSystemHook {
  private readonly logger
  private readonly common
  private readonly siyuanApi

  private readonly fs
  private readonly path

  private readonly hack

  constructor() {
    const zhiSdk = ZhiUtil.zhiSdk()

    this.logger = zhiSdk.getLogger()
    this.common = zhiSdk.common
    this.siyuanApi = zhiSdk.siyuanApi

    this.fs = this.common.cjsUtil.safeRequire("fs")
    this.path = this.common.cjsUtil.safeRequire("path")

    this.hack = new HackPluginSystem()
  }

  /**
   * 获取插件同步信息
   *
   * @param p 插件系统对象
   * @param zhiPlugin 插件对象
   */
  getOldPluginInfo(p: any, zhiPlugin: any) {
    let isSynced = false
    let isUpdate = false
    let oldVersion = this.hack.OLD_VERSION_ZERO

    const plugins = p.pslm.storageMangager.thirdPartyPlugins
    for (const item of plugins) {
      // this.logger.debug("Plugin=>", item)
      // 不是当前插件跳过
      if (zhiPlugin.name !== item.name) {
        continue
      }

      // 当前插件有新版本
      if (this.common.versionUtil.greater(zhiPlugin.version, item.version)) {
        isUpdate = true
      }

      oldVersion = item.version
      isSynced = true
    }

    return { isSynced, oldVersion, isUpdate }
  }

  async syncZhiPlugins(p: any) {
    this.logger.info("Start syncing zhi plugins ...")

    // 主题插件目录
    const zhiPluginsPath = this.path.join(this.siyuanApi.siyuanUtil.ZHI_THEME_PATH(), this.hack.ZHI_PLUGIN_FOLDER)
    this.logger.debug("Zhi plugins folder=>", zhiPluginsPath)

    // 插件系统默认目录
    const pluginsPath = this.path.join(this.siyuanApi.siyuanUtil.SIYUAN_DATA_PATH(), this.hack.PLUGIN_FOLDER)
    this.logger.debug("Plugins folder=>", pluginsPath)

    let syncedCount = 0
    let zhiPlugins: any = []
    // 未找到主题差距，不同步
    if (!this.fs.existsSync(zhiPluginsPath)) {
      this.logger.warn("No zhi plugins found, stop!")
    } else {
      // 扫描插件并同步
      zhiPlugins = await this.hack.scanPlugins(zhiPluginsPath)
      // this.logger.debug("zhiPlugins=>", zhiPlugins)
      for (const item of zhiPlugins) {
        const pluginBasename = this.path.basename(item)
        const from = item
        const to = this.path.join(pluginsPath, pluginBasename)
        this.logger.debug(this.common.strUtil.f("Try syncing zhi plugin {0}", pluginBasename))

        const manifest = await this.hack.getManifest(this.path.join(item, this.hack.MANIFEST))
        // this.logger.debug("ZhiPlugin=>", manifest)

        const oldPluginInfo = this.getOldPluginInfo(p, manifest)
        const oldVersion = oldPluginInfo.oldVersion
        this.logger.info(
          this.common.strUtil.f(
            "Plugin status : [{0}] isSynced=>{1}, isUpdate=>{2}, forceUpdate=>{3}, version Info: {4} -> {5}",
            pluginBasename,
            oldPluginInfo.isSynced,
            oldPluginInfo.isUpdate,
            manifest.forceUpdate,
            oldVersion,
            manifest.version
          )
        )

        // 同步需满足下面条件
        // 1. 未同步过或者有新版本
        // 2. 新旧插件注册信息目录均保持一致
        if (!oldPluginInfo.isSynced) {
          // 未同步过，但是目标目录已存在
          if (this.fs.existsSync(to)) {
            throw new Error(this.common.strUtil.f("Expected forder already exists=>{0}", to))
          }

          this.common.strUtil.f("Do syncing, please wait...")
          this.common.nodeUtil.copyFolderSync(from, to)
          syncedCount++
        } else if (oldPluginInfo.isSynced && oldPluginInfo.isUpdate) {
          // 新插件目录不一致，但是有版本号
          if (!this.fs.existsSync(to)) {
            throw new Error(
              this.common.strUtil.f(
                "Conflict plugin exists, manifest exists but dest folder is not correct with original, please fix plugin folder name.Expected forder is=>{0}",
                to
              )
            )
          }

          this.common.strUtil.f("Do syncing, please wait...")
          this.common.nodeUtil.copyFolderSync(from, to)
          syncedCount++
        } else if (manifest.forceUpdate) {
          this.logger.warn(
            this.common.strUtil.f(
              "Find forceUpdate flag in manifest.json, try forcing update plugin, [{0}] {1}.This flag is development only, before publish plugin, you should remove this flag from manifest.json!",
              pluginBasename,
              manifest.version
            )
          )

          this.common.nodeUtil.rmFolder(to)
          this.common.nodeUtil.copyFolderSync(from, to)
          syncedCount++
        } else {
          this.logger.debug(
            this.common.strUtil.f("Already synced and the latest version [{0}] {1}", pluginBasename, manifest.version)
          )
        }
      }
    }

    this.logger.info(
      this.common.strUtil.f(
        "Zhi theme plugins Synced.Scaned {0}, synced {1} plugin(s).",
        zhiPlugins.length,
        syncedCount
      )
    )

    if (syncedCount > 0) {
      this.logger.warn(
        this.common.strUtil.f("Synced {0} zhi plugins, you need to reload siyuan to take effect.", syncedCount)
      )
    }
  }

  async init() {
    await this.hack.initPluginSystem()

    const sys = await this.hack.getPluginSystem()
    await this.syncZhiPlugins(sys)

    this.logger.info("PluginSystemHook inited.")
  }
}

const pluginSystemHook = new PluginSystemHook()
export default pluginSystemHook
