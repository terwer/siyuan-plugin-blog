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

// 警告⚠️：请勿在非思源笔记Electron环境调用此文件中的任何方法

import ZhiUtil from "~/src/utils/ZhiUtil"

/**
 * hack插件系统的某些功能
 *
 * @author terwer
 * @since 1.0.0
 */
class HackPluginSystem {
  private readonly logger
  private readonly common
  private readonly siyuanApi

  private readonly fs
  private readonly path

  public readonly ZHI_PLUGIN_FOLDER = "zhi-plugins"
  public readonly PLUGIN_FOLDER = "plugins"
  public readonly MANIFEST = "manifest.json"
  private readonly SCRIPT = "main.js"

  public SIYUAN_ZHI_THEME_PLUGIN_PATH

  public OLD_VERSION_ZERO = "0.0.0"

  constructor() {
    const zhiSdk = ZhiUtil.zhiSdk()

    this.logger = zhiSdk.getLogger()
    this.common = zhiSdk.common
    this.siyuanApi = zhiSdk.siyuanApi

    this.fs = this.common.cjsUtil.safeRequire("fs")
    this.path = this.common.cjsUtil.safeRequire("path")

    this.SIYUAN_ZHI_THEME_PLUGIN_PATH = this.path.join(
      this.path.join(this.siyuanApi.siyuanUtil.SIYUAN_DATA_PATH(), "dist-cjs")
    )
  }
  public getPluginSystem = () => {
    return this.siyuanApi.siyuanUtil.syWin().pluginSystem
  }
  public getPluginSystemVersion = () => {
    return this.siyuanApi.siyuanUtil.syWin().pluginSystemVersion
  }

  isDir(p: any) {
    return this.fs.statSync(p).isDirectory()
  }

  isExists(p: any) {
    try {
      this.fs.statSync(p)
      return true
    } catch (e) {
      return false
    }
  }

  getFileContent = async (f: any) => {
    const that = this
    return new Promise((resolve, reject) => {
      that.fs.readFile(f, (err: any, data: any) => {
        if (err) {
          reject(err)
          return
        }
        return resolve(data.toString("utf8"))
      })
    })
  }

  getManifest = async (manifest: any) => {
    const content: any = await this.getFileContent(manifest)
    try {
      return JSON.parse(content)
    } catch (e) {
      this.logger.error("Lading manifest: " + manifest, e)
      return null
    }
  }

  async scanPlugins(pluginFolder: string) {
    const that = this

    return new Promise((resolve, reject) => {
      that.fs.readdir(pluginFolder, (err: any, files: any) => {
        if (err) {
          that.logger.error(err)
          resolve([])
          return
        }
        resolve(
          files
            .filter((f: any) => {
              return (
                this.isDir(that.path.join(pluginFolder, f)) &&
                this.isExists(that.path.join(pluginFolder, f, that.MANIFEST)) &&
                this.isExists(that.path.join(pluginFolder, f, that.SCRIPT))
              )
            })
            ?.map((g: any) => that.path.resolve(pluginFolder, g)) || []
        )
      })
    })
  }

  public async initPluginSystem() {
    const pluginSystem = await this.getPluginSystem()
    if (pluginSystem) {
      this.logger.warn("Plugin system already loaded by snapshots, ignore initiation.")
      this.logger.warn("Loaded plugin system version is ", this.getPluginSystemVersion())
      return
    }

    try {
      this.logger.info("Undetected plugin system，initiating plugin system...")

      const data = this.fs.readFileSync(
        this.path.join(this.siyuanApi.siyuanUtil.getCrossPlatformAppDataFolder(), ".siyuan", "plugin.js")
      )
      const script = data.toString("utf8")
      this.logger.info("Local plugin system found, loading...")
      eval(script)
    } catch (e) {
      this.logger.info("Local plugin system not found, load online", e)
      return fetch("https://gitee.com/zuoez02/siyuan-plugin-system/raw/main/main.js", { cache: "no-cache" })
        .then((res) => res.text())
        .then((sc) => {
          this.siyuanApi.siyuanUtil.syWin().siyuanPluginScript = sc
          eval(sc)
        })
    }

    const sysv = this.getPluginSystemVersion()
    this.logger.info(this.common.strUtil.f("Plugin system initiation finished=>{0}.", sysv))
  }
}

export default HackPluginSystem
