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

import logFactory from "~/src/utils/logUtil"
import siyuanUtil from "~/src/utils/otherlib/siyuanUtil"

const fs = window.require("fs")
const path = window.require("path")

const logger = logFactory.getLogger("pluginSystemUtil")

const ZHI_PLUGIN_FOLDER = "zhi-plugins"
const PLUGIN_FOLDER = "plugins"
const MANIFEST = "manifest.json"
const SCRIPT = "main.js"

const SIYUAN_ZHI_THEME_PLUGIN_PATH = path.join(
  path.join(siyuanUtil.SIYUAN_DATA_PATH, "dist-cjs")
)

const OLD_VERSION_ZERO = "0.0.0"

const getPluginSystem = () => {
  return window.pluginSystem
}
const getPluginSystemVersion = () => {
  return window.pluginSystemVersion
}

/**
 * hack插件系统的某些功能
 *
 * @author terwer
 * @since 1.0.0
 */
export class HackPluginSystem {
  logger = logFactory.getLogger("HackPluginSystem")

  isDir(p) {
    return fs.statSync(p).isDirectory()
  }

  isExists(p) {
    try {
      fs.statSync(p)
      return true
    } catch (e) {
      return false
    }
  }

  getFileContent = async (f) => {
    return new Promise((resolve, reject) => {
      fs.readFile(f, (err, data) => {
        if (err) {
          reject(err)
          return
        }
        return resolve(data.toString("utf8"))
      })
    })
  }

  getManifest = async (manifest) => {
    const content = await this.getFileContent(manifest)
    try {
      return JSON.parse(content)
    } catch (e) {
      this.logger.error("loading manifest: " + manifest, e)
      return null
    }
  }

  async scanPlugins(pluginFolder) {
    return new Promise((resolve, reject) => {
      fs.readdir(pluginFolder, (err, files) => {
        if (err) {
          logger.error(err)
          resolve([])
          return
        }
        resolve(
          files
            .filter((f) => {
              return (
                this.isDir(path.join(pluginFolder, f)) &&
                this.isExists(path.join(pluginFolder, f, MANIFEST)) &&
                this.isExists(path.join(pluginFolder, f, SCRIPT))
              )
            })
            ?.map((g) => path.resolve(pluginFolder, g)) || []
        )
      })
    })
  }
}

const initPluginSystem = async () => {
  const pluginSystem = await getPluginSystem()
  if (pluginSystem) {
    logger.warn("Plugin system already loaded by snapshots, ignore initiation.")
    logger.warn("Loaded plugin system version is ", getPluginSystemVersion())
    return
  }

  try {
    logger.info("Undetected plugin system，initiating plugin system...")

    const data = fs.readFileSync(
      path.join(
        siyuanUtil.getCrossPlatformAppDataFolder(),
        ".siyuan",
        "plugin.js"
      )
    )
    const script = data.toString("utf8")
    logger.info("local plugin system found, loading...")
    eval(script)
  } catch (e) {
    logger.info("local plugin system not found, load online", e)
    return fetch(
      "https://gitee.com/zuoez02/siyuan-plugin-system/raw/main/main.js",
      { cache: "no-cache" }
    )
      .then((res) => res.text())
      .then((sc) => {
        window.siyuanPluginScript = sc
        eval(sc)
      })
  }
}

const pluginSystemUtil = {
  SIYUAN_ZHI_THEME_PLUGIN_PATH,

  ZHI_PLUGIN_FOLDER,
  PLUGIN_FOLDER,
  OLD_VERSION_ZERO,

  MANIFEST,
  SCRIPT,

  getPluginSystem,
  getPluginSystemVersion,
  initPluginSystem
}
export default pluginSystemUtil
