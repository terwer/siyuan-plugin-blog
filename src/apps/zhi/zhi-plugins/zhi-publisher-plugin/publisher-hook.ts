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
import siyuanUtil from "~/src/utils/otherlib/siyuanUtil"

class PublisherHook {
  private logger = logFactory.getLogger("PublisherHook")

  /**
   * 引入依赖
   *
   * @param entryName 运行模式名称
   * @param libpath 依赖全路径
   * @param alias 依赖别名
   * @author terwer
   * @since 0.7.0
   */
  requireLib = (entryName: string, libpath: string, alias: string) => {
    const syWin = window
    this.logger.info(entryName + " will import lib from " + alias, libpath)
    return syWin.require(libpath)
  }

  // 初始化方法统一定义
  initMethods = {
    /**
     * 初始化 sy-post-publisher 配置文件存储，适用于【iframe挂件模式】、【新窗口模式】以及【js片段模式】
     */
    initLocalStorageMethod: (entryName: string) => {
      const syWin: any = window
      const dataDir = siyuanUtil.SIYUAN_DATA_PATH

      // 防止重复挂载
      if (syWin.JsonLocalStorage) {
        this.logger.warn("JsonLocalStorage loaded, ignore.", entryName)
        return
      }

      // 挂载JsonLocalStorage到window
      const LocalStorage = this.requireLib(
        entryName,
        `${dataDir}/widgets/sy-post-publisher/lib/json-localstorage/json-localstorage.js`,
        "json-localstorage"
      )
      // 注意，这里是相对于 json-localstorage.js 所在的位置开始计算路径
      LocalStorage.init("../../../../storage/syp/")
    },

    /**
     * 初始化插槽，仅【iframe挂件模式】、【自定义js片段模式】可用
     * @param entryName 入口名称
     */
    initSlotMethod: (entryName: string) => {
      // 初始化插槽
      const initSlot = this.requireLib(
        entryName,
        `${siyuanUtil.SIYUAN_DATA_PATH}/widgets/sy-post-publisher/lib/siyuan/silot.js`,
        "插槽"
      )
      initSlot()
    },

    /**
     * 初始化主题适配
     * @param entryName 入口名称
     */
    initThemeAdaptor: (entryName: string) => {
      const syWin: any = window
      const dataDir = siyuanUtil.SIYUAN_DATA_PATH

      // 防止重复挂载
      if (syWin.customstyle) {
        this.logger.warn("customstyle loaded, ignore.", entryName)
        return
      }

      // 初始化主题适配
      const initTheme = this.requireLib(
        entryName,
        `${dataDir}/widgets/sy-post-publisher/lib/siyuan/theme.js`,
        "Custom theme"
      )
      setTimeout(initTheme, 3000)
    },

    /**
     * 初始化初始化发布辅助功能
     * @param entryName 入口名称
     */
    initPublishHelper: (entryName: string) => {
      const syWin: any = window
      const dataDir = siyuanUtil.SIYUAN_DATA_PATH

      // 防止重复挂载
      if (syWin.syp) {
        console.warn("syp已挂载，忽略", entryName)
        return
      }

      // 初始化发布辅助功能
      const initPublishHelper = this.requireLib(
        entryName,
        `${dataDir}/widgets/sy-post-publisher/lib/siyuan/publish-helper.js`,
        "Publisher"
      )
      initPublishHelper()
    },

    /**
     * 初始化 PicGO 配置
     * @param entryName 入口名称
     */
    initPicgoExtension: (entryName: string) => {
      const syWin: any = window
      const dataDir = siyuanUtil.SIYUAN_DATA_PATH
      // console.log("initPicgoExtension=>", dataDir)
      // console.log("syWin=>", syWin)

      // 防止重复挂载
      if (syWin.SyPicgo) {
        console.warn("SyPicgo loaded, ignore.", entryName)
        return
      }

      // 挂载PicGO到window
      const picgoExtension = this.requireLib(
        entryName,
        `${dataDir}/widgets/sy-post-publisher/lib/picgo/syPicgo.js`,
        "sy-picgo"
      ).default

      // PicGO存储到配置目录，便于后面插件
      const appDataFolder = picgoExtension.getCrossPlatformAppDataFolder()
      // this.logger.debug("appDataFolder=>", appDataFolder)

      const picgo_cfg_067 = `${dataDir}/widgets/sy-post-publisher/lib/picgo/picgo.cfg.json`
      const picgo_cfg_folder_070 = picgoExtension.joinPath(
        appDataFolder,
        "sy-picgo"
      )
      const picgo_cfg_070_file = "picgo.cfg.json"
      const picgo_cfg_070 = picgoExtension.joinPath(
        picgo_cfg_folder_070,
        picgo_cfg_070_file
      )

      picgoExtension.upgradeCfg(
        picgo_cfg_067,
        picgo_cfg_folder_070,
        picgo_cfg_070_file
      )
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
      const syWin: any = window
      const dataDir = siyuanUtil.SIYUAN_DATA_PATH

      // 防止重复挂载
      if (syWin.SyCmd) {
        this.logger.warn("SyCmd已挂载，忽略", entryName)
        return
      }

      // 挂载SyCmd到window
      const syCmd = this.requireLib(
        entryName,
        `${dataDir}/widgets/sy-post-publisher/lib/cmd/syCmd.js`,
        "sy-cmd"
      )
      syWin.SyCmd = syCmd
      this.logger.debug("syCmd=>", syCmd)
    },
  }

  doInit = () => {
    // 挂载JsonLocalStorage到window
    this.initMethods.initLocalStorageMethod("PublisherHook")

    // 初始化插槽
    this.initMethods.initSlotMethod("PublisherHook")

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
      this.logger.warn(
        "Failed to init sy-post-publisher，it may not work in some case.Error=>",
        e
      )
    }
  }
}

const publisherHook = new PublisherHook()
export default publisherHook
