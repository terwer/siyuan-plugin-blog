/*
 Copyright (c) 2023 Terwer. All rights reserved.

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

import ZhiUtil from "zhi-common"
import Env from "zhi-env"

/**
 * 发布工具hook
 */
class PublisherHook {
  private readonly logger
  private common
  private siyuanUtil

  constructor() {
    const env = new Env(import.meta.env)
    const zhiSdk = ZhiUtil.zhiSdk(env)
    this.logger = zhiSdk.getLogger()
    this.common = zhiSdk.common
    this.siyuanUtil = zhiSdk.siyuanApi.siyuanUtil
  }

  // 初始化方法统一定义
  initMethods = {
    /**
     * 初始化 sy-post-publisher 配置文件存储，适用于【iframe挂件模式】、【新窗口模式】以及【js片段模式】
     */
    initLocalStorageMethod: (entryName: string) => {
      const syWin = this.siyuanUtil.siyuanWindow()
      const dataDir = this.common.electronUtil.siyuanDataPath()

      // 防止重复挂载
      if (syWin.JsonLocalStorage) {
        this.logger.warn("JsonLocalStorage loaded, ignore.", entryName)
        return
      }

      // 挂载JsonLocalStorage到window
      const LocalStorage = this.common.electronUtil.requireLib(
        `${dataDir}/widgets/sy-post-publisher/lib/json-localstorage/json-localstorage.js`
      )
      // 注意，这里是相对于 json-localstorage.js 所在的位置开始计算路径
      LocalStorage.init("../../../../storage/syp/")
    },

    /**
     * 初始化插槽，仅【iframe挂件模式】、【自定义js片段模式】可用
     */
    initSlotMethod: () => {
      const dataDir = this.common.electronUtil.siyuanDataPath()
      // 初始化插槽
      const initSlot = this.common.electronUtil.requireLib(`${dataDir}/widgets/sy-post-publisher/lib/siyuan/silot.js`)
      initSlot()
    },

    /**
     * 初始化主题适配
     * @param entryName 入口名称
     */
    initThemeAdaptor: (entryName: string) => {
      const syWin = this.siyuanUtil.siyuanWindow()
      const dataDir = this.common.electronUtil.siyuanDataPath()

      // 防止重复挂载
      if (syWin.customstyle) {
        this.logger.warn("customstyle loaded, ignore.", entryName)
        return
      }

      // 初始化主题适配
      const initTheme = this.common.electronUtil.requireLib(`${dataDir}/widgets/sy-post-publisher/lib/siyuan/theme.js`)
      setTimeout(initTheme, 3000)
    },

    /**
     * 初始化初始化发布辅助功能
     * @param entryName 入口名称
     */
    initPublishHelper: (entryName: string) => {
      const syWin = this.siyuanUtil.siyuanWindow()
      const dataDir = this.common.electronUtil.siyuanDataPath()

      // 防止重复挂载
      if (syWin.syp) {
        console.warn("syp已挂载，忽略", entryName)
        return
      }

      // 初始化发布辅助功能
      const initPublishHelper = this.common.electronUtil.requireLib(
        `${dataDir}/widgets/sy-post-publisher/lib/siyuan/publish-helper.js`
      )
      initPublishHelper()
    },

    /**
     * 初始化 PicGO 配置
     * @param entryName 入口名称
     */
    initPicgoExtension: (entryName: string) => {
      const syWin = this.siyuanUtil.siyuanWindow()
      const dataDir = this.common.electronUtil.siyuanDataPath()
      // console.log("initPicgoExtension=>", dataDir)
      // console.log("syWin=>", syWin)

      // 防止重复挂载
      if (syWin.SyPicgo) {
        console.warn("SyPicgo loaded, ignore.", entryName)
        return
      }

      // 挂载PicGO到window
      const picgoExtension = this.common.electronUtil.requireLib(
        `${dataDir}/widgets/sy-post-publisher/lib/picgo/syPicgo.js`
      ).default

      // PicGO存储到配置目录，便于后面插件
      const appDataFolder = this.common.electronUtil.getCrossPlatformAppDataFolder()
      // this.logger.debug("appDataFolder=>", appDataFolder)

      const picgo_cfg_067 = `${dataDir}/widgets/sy-post-publisher/lib/picgo/picgo.cfg.json`
      const picgo_cfg_folder_070 = picgoExtension.joinPath(appDataFolder, "sy-picgo")
      const picgo_cfg_070_file = "picgo.cfg.json"
      const picgo_cfg_070 = picgoExtension.joinPath(picgo_cfg_folder_070, picgo_cfg_070_file)

      picgoExtension.upgradeCfg(picgo_cfg_067, picgo_cfg_folder_070, picgo_cfg_070_file)
      this.logger.warn("PicGO配置文件初始化为=>", picgo_cfg_070)

      // 初始化
      const syPicgo = picgoExtension.initPicgo(picgo_cfg_070)
      syWin.SyPicgo = syPicgo
      this.logger.debug("syPicgo=>", syPicgo)
    },

    /**
     * 初始化 SyCmd 配置，适用于【iframe挂件模式】、【新窗口模式】以及【js片段模式】
     * @param entryName 入口名称
     */
    initCmder: (entryName: string) => {
      const syWin = this.siyuanUtil.siyuanWindow()
      const dataDir = this.common.electronUtil.siyuanDataPath()

      // 防止重复挂载
      if (syWin.SyCmd) {
        this.logger.warn("SyCmd已挂载，忽略", entryName)
        return
      }

      // 挂载SyCmd到window
      const syCmd = this.common.electronUtil.requireLib(`${dataDir}/widgets/sy-post-publisher/lib/cmd/syCmd.js`)
      syWin.SyCmd = syCmd
      this.logger.debug("syCmd=>", syCmd)
    },
  }

  doInit = () => {
    // 挂载JsonLocalStorage到window
    this.initMethods.initLocalStorageMethod("PublisherHook")

    // 初始化插槽
    this.initMethods.initSlotMethod()

    // 初始化主题适配
    this.initMethods.initThemeAdaptor("PublisherHook")

    // 初始化发布辅助功能
    this.initMethods.initPublishHelper("PublisherHook")

    // 初始化PicGO配置
    this.initMethods.initPicgoExtension("PublisherHook")

    // 初始化SyCmd配置
    this.initMethods.initCmder("PublisherHook")
  }

  init() {
    this.logger.info("Initiating sy-post-publisher ...")
    // 统一的初始化入口
    try {
      this.doInit()
    } catch (e) {
      this.logger.warn("Failed to init sy-post-publisher，it may not work in some case.Error=>", e)
    }
  }
}

export default PublisherHook
