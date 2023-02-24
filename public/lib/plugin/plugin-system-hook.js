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

// 警告1⚠️：请勿在非思源笔记Electron环境调用此文件中的任何方法
// 警告2⚠️：此文件请勿引用其他任何需要编译的类库

const getCrossPlatformAppDataFolder = () => {
  const path = window.require("path")

  let configFilePath
  if (window.process.platform === "darwin") {
    configFilePath = path.join(
      window.process.env.HOME,
      "/Library/Application Support"
    )
  } else if (window.process.platform === "win32") {
    // Roaming包含在APPDATA中了
    configFilePath = window.process.env.APPDATA
  } else if (window.process.platform === "linux") {
    configFilePath = window.process.env.HOME
  }
  return configFilePath
}

const initPluginSystem = async () => {
    const path = window.require("path")
    try {
      const data = window
        .require("fs")
        .readFileSync(
          path.join(getCrossPlatformAppDataFolder(), ".siyuan", "plugin.js")
        )
      const script = data.toString("utf8")
      console.log("local plugin system found, loading...")
      eval(script)
    } catch (e) {
      console.log("local plugin system not found, load online")
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

;(async () => {
  await initPluginSystem()
})()
