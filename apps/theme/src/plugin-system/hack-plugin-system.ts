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
 * hack插件系统的某些功能
 *
 * @author terwer
 * @since 1.0.0
 */
class HackPluginSystem {
  private readonly logger
  private readonly common
  private readonly siyuanApi

  public readonly ZHI_PLUGIN_FOLDER = "zhi-plugins"
  public readonly PLUGIN_FOLDER = "plugins"
  public readonly MANIFEST = "manifest.json"
  public OLD_VERSION_ZERO = "0.0.0"
  private readonly SCRIPT = "main.js"

  constructor() {
    const env = new Env(import.meta.env)
    const zhiSdk = ZhiUtil.zhiSdk(env)

    this.logger = zhiSdk.getLogger()
    this.common = zhiSdk.common
    this.siyuanApi = zhiSdk.siyuanApi
  }

  isDir(p: any) {
    const fs = this.common.electronUtil.requireLib("fs")

    return fs.statSync(p).isDirectory()
  }

  isExists(p: any) {
    try {
      const fs = this.common.electronUtil.requireLib("fs")

      fs.statSync(p)
      return true
    } catch (e) {
      return false
    }
  }

  getFileContent = async (f: any) => {
    const fs = this.common.electronUtil.requireLib("fs")

    return new Promise((resolve, reject) => {
      fs.readFile(f, (err: any, data: any) => {
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
    const fs = this.common.electronUtil.requireLib("fs")
    const path = this.common.electronUtil.requireLib("path")

    return new Promise((resolve, reject) => {
      fs.readdir(pluginFolder, (err: any, files: any) => {
        if (err) {
          that.logger.error(err)
          resolve([])
          return
        }
        resolve(
          files
            .filter((f: any) => {
              return (
                this.isDir(path.join(pluginFolder, f)) &&
                this.isExists(path.join(pluginFolder, f, that.MANIFEST)) &&
                this.isExists(path.join(pluginFolder, f, that.SCRIPT))
              )
            })
            ?.map((g: any) => path.resolve(pluginFolder, g)) || []
        )
      })
    })
  }

  /**
   * 获取插件系统对象
   */
  public getPluginSystem = () => {
    return this.siyuanApi.siyuanUtil.siyuanWindow().pluginSystem
  }

  /**
   * 获取插件系统版本
   */
  public getPluginSystemVersion = () => {
    return this.siyuanApi.siyuanUtil.siyuanWindow().pluginSystemVersion
  }

  public async initPluginSystem() {
    // 初始化过了，直接返回，防止插件系统重复加载
    const pluginSystem = this.getPluginSystem()
    if (pluginSystem) {
      this.logger.warn("Plugin system already loaded by snapshots, ignore initiation.")
      this.logger.warn("Loaded plugin system version is ", this.getPluginSystemVersion())
      return
    }

    try {
      this.logger.info("Undetected plugin system，initiating plugin system...")

      const fs = this.common.electronUtil.requireLib("fs")
      const path = this.common.electronUtil.requireLib("path")
      const data = fs.readFileSync(
        path.join(this.common.electronUtil.getCrossPlatformAppDataFolder(), ".siyuan", "plugin.js")
      )
      const script = data.toString("utf8")
      this.logger.info("Local plugin system found, loading...")
      eval(script)
    } catch (e) {
      this.logger.info("Local plugin system not found, load online")
      this.logger.debug("Plugin system Load error", e)

      const res = await fetch("https://gitee.com/zuoez02/siyuan-plugin-system/raw/main/main.js", { cache: "no-cache" })
      const sc = await res.text()
      this.siyuanApi.siyuanUtil.siyuanWindow().siyuanPluginScript = sc
      eval(sc)
    }

    const sys = this.getPluginSystem()
    const sysv = this.getPluginSystemVersion() ?? "unknown"
    this.logger.info(this.common.strUtil.f("Plugin system inited, version => {0}.", sysv))
    return Promise.resolve(sys)
  }
}

export default HackPluginSystem
