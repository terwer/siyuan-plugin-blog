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
import BasePathTypeEnum from "./basePathTypeEnum"

/**
 * 思源笔记设备相关
 *
 * @public
 * @author terwer
 * @version 0.1.0
 * @since 0.1.0
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

  /**
   * 检测是否运行在思源打开的浏览器中
   */
  public static isInSiyuanBrowser() {
    if (!BrowserUtil.isInBrowser) {
      return false
    }
    return typeof (window as any).siyuan !== "undefined" && typeof (window as any).Lute !== "undefined"
  }

  /**
   * 思源笔记 window 对象
   */
  public static siyuanWindow() {
    let win
    if (this.isInSiyuanWidget()) {
      win = parent.window
    } else {
      if (this.isInSiyuanNewWin()) {
        win = window
      } else if (this.isInSiyuanBrowser()) {
        win = window
      } else if (typeof window !== "undefined") {
        win = window
      } else {
        win = undefined
      }
    }
    return win as any
  }

  // =========================
  // require start
  // =========================

  /**
   * 引入依赖
   *
   * @param libpath - 依赖全路径
   * @param abs - 可选，是否使用觉得路径，默认是 true ， 启用之后 type参数无效
   * @param type - 可选，以谁的基本路径为准
   */
  public static requireLib = (libpath: string, abs = true, type = BasePathTypeEnum.BasePathType_None) => {
    if (!BrowserUtil.hasNodeEnv()) {
      throw new Error("require ony works on node env")
    }

    let absLibpath = libpath
    if (!abs) {
      switch (type) {
        case BasePathTypeEnum.BasePathType_Appearance:
          absLibpath = this.joinPath(this.siyuanAppearancePath(), libpath)
          break
        case BasePathTypeEnum.BasePathType_Data:
          absLibpath = this.joinPath(this.siyuanDataPath(), libpath)
          break
        case BasePathTypeEnum.BasePathType_Themes:
          absLibpath = this.joinPath(this.siyuanAppearancePath(), "themes", libpath)
          break
        case BasePathTypeEnum.BasePathType_ZhiTheme:
          absLibpath = this.joinPath(this.siyuanAppearancePath(), "themes", "zhi", libpath)
          break
        default:
          throw new Error("type must be provided when not use absolute path")
      }
    }

    const syWin = this.siyuanWindow()
    if (!syWin) {
      return require(absLibpath)
    }
    if (typeof syWin.require !== "undefined") {
      return syWin.require(absLibpath)
    }

    return undefined
  }

  /**
   * 引入依赖，以 data 的基本路径为准
   *
   * @param libpath - 相对于 appearance 的相对路径
   */
  public static requireAppearanceLib = (libpath: string) => {
    return this.requireLib(libpath, false, BasePathTypeEnum.BasePathType_Appearance)
  }

  /**
   * 引入依赖，以 data 的基本路径为准
   *
   * @param libpath - 相对于 data 的相对路径
   */
  public static requireDataLib = (libpath: string) => {
    return this.requireLib(libpath, false, BasePathTypeEnum.BasePathType_Data)
  }

  /**
   * 引入依赖，以 theme 的基本路径为准
   *
   * @param libpath - 相对于 theme 的相对路径
   */
  public static requireThemesLib = (libpath: string) => {
    return this.requireLib(libpath, false, BasePathTypeEnum.BasePathType_Themes)
  }

  /**
   * 引入依赖，以 ZhiTheme 的基本路径为准
   *
   * @param libpath - 相对于 ZhiTheme 的相对路径
   */
  public static requireZhiThemeLib = (libpath: string) => {
    return this.requireLib(libpath, false, BasePathTypeEnum.BasePathType_ZhiTheme)
  }

  // =========================
  // require end
  // =========================

  // =========================
  // import start
  // =========================
  /**
   * 引入json
   *
   * @param jsPath - js相对路径全路径
   * @param type - 类型
   */
  public static async importJs(jsPath: string, type: BasePathTypeEnum) {
    let fullJsonPath = jsPath
    switch (type) {
      case BasePathTypeEnum.BasePathType_Appearance:
        fullJsonPath = this.browserJoinPath(this.siyuanAppearanceRelativePath(), jsPath)
        break
      case BasePathTypeEnum.BasePathType_Data:
        fullJsonPath = this.browserJoinPath(this.siyuanDataRelativePath(), jsPath)
        break
      case BasePathTypeEnum.BasePathType_Themes:
        fullJsonPath = this.browserJoinPath(this.siyuanThemeRelativePath(), jsPath)
        break
      case BasePathTypeEnum.BasePathType_ZhiTheme:
        fullJsonPath = this.browserJoinPath(this.zhiThemeRelativePath(), jsPath)
        break
      default:
        throw new Error("type must be provided")
    }

    const { default: data } = await import(/* @vite-ignore */ fullJsonPath)
    return data
  }

  /**
   * 引入json
   *
   * @param jsonPath - json相对路径全路径
   * @param type - 类型
   */
  public static async importJson(jsonPath: string, type: BasePathTypeEnum) {
    let fullJsonPath = jsonPath
    switch (type) {
      case BasePathTypeEnum.BasePathType_Appearance:
        fullJsonPath = this.browserJoinPath(this.siyuanAppearanceRelativePath(), jsonPath)
        break
      case BasePathTypeEnum.BasePathType_Data:
        fullJsonPath = this.browserJoinPath(this.siyuanDataRelativePath(), jsonPath)
        break
      case BasePathTypeEnum.BasePathType_Themes:
        fullJsonPath = this.browserJoinPath(this.siyuanThemeRelativePath(), jsonPath)
        break
      case BasePathTypeEnum.BasePathType_ZhiTheme:
        fullJsonPath = this.browserJoinPath(this.zhiThemeRelativePath(), jsonPath)
        break
      default:
        throw new Error("type must be provided")
    }

    const { default: data } = await import(/* @vite-ignore */ fullJsonPath, { assert: { type: "json" } })
    return data
  }

  /**
   * 引入 json - 以 data 为基本路径
   *
   * @param jsonPath - 相对于 data 的相对路径
   */
  public static async importDataJson(jsonPath: string) {
    return await this.importJson(jsonPath, BasePathTypeEnum.BasePathType_Data)
  }

  /**
   * 引入 json - 以 appearance 为基本路径
   *
   * @param jsonPath - 相对于 appearance 的相对路径
   */
  public static async importAppearanceJson(jsonPath: string) {
    return await this.importJson(jsonPath, BasePathTypeEnum.BasePathType_Appearance)
  }

  /**
   * 引入 json - 以 themes 为基本路径
   *
   * @param jsonPath - 相对于 themes 的相对路径
   */
  public static async importThemesJson(jsonPath: string) {
    return await this.importJson(jsonPath, BasePathTypeEnum.BasePathType_Themes)
  }

  /**
   * 引入 zhi 主题的 json - 以 zhi 主题 的根路径为基本路径
   *
   * @param jsonPath - 相对于 zhi 主题根路径的相对路径
   */
  public static async importZhiThemeJson(jsonPath: string) {
    return await this.importJson(jsonPath, BasePathTypeEnum.BasePathType_ZhiTheme)
  }

  /**
   * 引入 zhi 主题的 js - 以 zhi 主题 的根路径为基本路径
   *
   * @param jsPath - 相对于 zhi 主题根路径的相对路径
   */
  public static async importZhiThemeJs(jsPath: string) {
    return await this.importJs(jsPath, BasePathTypeEnum.BasePathType_ZhiTheme)
  }

  // =========================
  // import start
  // =========================

  /**
   * 路径拼接
   *
   * @param paths - 路径数组
   */
  public static joinPath(...paths: string[]): string {
    if (BrowserUtil.hasNodeEnv()) {
      const path = this.requireLib("path")
      if (path) {
        return path.join(...paths)
      }
    }

    return this.browserJoinPath(...paths)
  }

  public static browserJoinPath(...paths: string[]): string {
    return paths.join(BrowserUtil.BrowserSeperator)
  }

  /**
   * 思源笔记 conf 目录
   */
  public static siyuanConfPath() {
    const syWin = this.siyuanWindow()
    if (!syWin) {
      throw new Error("Not in siyuan env")
    }
    return syWin.siyuan.config.system.confDir
  }

  /**
   * 思源笔记 data 目录
   */
  public static siyuanDataPath() {
    const syWin = this.siyuanWindow()
    if (!syWin) {
      throw new Error("Not in siyuan env")
    }
    return syWin.siyuan.config.system.dataDir
  }

  /**
   * 思源笔记 data 目录-相对路径
   */
  public static siyuanDataRelativePath() {
    const syWin = this.siyuanWindow()
    if (!syWin) {
      throw new Error("Not in siyuan env")
    }
    return ""
  }

  /**
   * 思源笔记 appearance 目录
   */
  public static siyuanAppearancePath() {
    return this.joinPath(this.siyuanConfPath(), "appearance")
  }

  /**
   * 思源笔记 appearance 目录-相对路径
   */
  public static siyuanAppearanceRelativePath() {
    const syWin = this.siyuanWindow()
    if (!syWin) {
      throw new Error("Not in siyuan env")
    }
    return this.browserJoinPath("", "appearance")
  }

  /**
   * 思源笔记 themes 目录-绝对路径
   *
   * 注意: 如果是非 electron 和 Node 环境，这里返回的是浏览器的路径，不是物理路径
   * 如果使用物理路径，请调用 siyuanAppearancePath 或者 siyuanDataPath
   *
   * @author terwer
   * @since 0.1.0
   */
  public static siyuanThemePath() {
    if (BrowserUtil.hasNodeEnv()) {
      return this.joinPath(this.siyuanAppearancePath(), "themes")
    } else {
      const syWin = this.siyuanWindow()
      if (!syWin) {
        throw new Error("Not in siyuan env")
      }
      return this.joinPath(syWin.location.origin, "appearance", "themes")
    }
  }

  /**
   * 思源笔记 themes 目录-相对路径
   */
  public static siyuanThemeRelativePath() {
    const syWin = this.siyuanWindow()
    if (!syWin) {
      throw new Error("Not in siyuan env")
    }
    return this.browserJoinPath("", "appearance", "themes")
  }

  /**
   * zhi 主题目录 - 绝对路径
   */
  public static zhiThemePath() {
    return this.joinPath(this.siyuanThemePath(), "zhi")
  }

  /**
   * zhi 主题目录 - 相对路径
   */
  public static zhiThemeRelativePath() {
    return this.browserJoinPath(this.siyuanThemeRelativePath(), "zhi")
  }
}

export default SiyuanDevice
