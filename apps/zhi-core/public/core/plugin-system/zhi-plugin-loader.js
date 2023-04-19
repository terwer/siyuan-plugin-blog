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
/* eslint-disable */

/**
 *  StorageManager: 'StorageManager',
 *  PluginSystem: 'PluginSystem',
 *  SystemManager: 'PluginSystemLocalManager',
 *  PluginLoader: 'PluginLoader',
 *  PluginFileManager: 'PluginFileManager',
 *  EventBus: 'EventBus',
 *  Shortcut: 'Shortcut',
 *  CommandManager: 'CommandManager',
 *  Store: 'Store',
 *  SettingManager: 'SettingManager',
 */

// const zhiPluginBase = "/appearance/themes/zhi/plugin"
const zhiPluginBase = "/data/storage/zhi/plugin"
const log = window.zhiLog.info

async function getFile(path, type) {
  const response = await fetch("/api/file/getFile", {
    method: "POST",
    headers: {
      Authorization: `Token `,
    },
    body: JSON.stringify({
      path: path,
    }),
  })
  if (response.status === 200) {
    if (type === "text") {
      return await response.text()
    }
    if (type === "json") {
      return (await response.json()).data
    }
  }
  return null
}

async function isExists(p, type) {
  try {
    const res = await getFile(p, type)
    return res !== null
  } catch {
    return false
  }
}

async function readDir(path) {
  const response = await fetch("/api/file/readDir", {
    method: "POST",
    headers: {
      Authorization: `Token `,
    },
    body: JSON.stringify({
      path: path,
    }),
  })
  if (response.status === 200) {
    return (await response.json()).data
  }
  return null
}

async function scanPlugins(pluginFolder) {
  const res = await readDir(pluginFolder)
  // log("readDir res=>", res)
  if (!res) {
    return []
  }
  const files = res
  const result = []
  for (const f of files) {
    if (f.name.startsWith(".")) {
      continue
    }
    if (
      f.isDir &&
      (await isExists(`${zhiPluginBase}/${f.name}/manifest.json`, "json")) &&
      (await isExists(`${zhiPluginBase}/${f.name}/main.js`, "text"))
    ) {
      result.push(`${zhiPluginBase}/${f.name}`)
    }
  }
  return result
}

async function getZhiInternalPlugins() {
  const container = window.pluginSystemIocContainer
  const pluginFileManager = container.get("PluginFileManager")
  // log("pluginFileManager=>", pluginFileManager)

  const plugins = await scanPlugins(zhiPluginBase)
  if (!plugins || !plugins.length) {
    log("No plugin found in " + zhiPluginBase)
    return []
  }
  const req = []
  for (const p of plugins) {
    log("Reading zhi core plugin from filesystem: " + p)
    const key = pluginFileManager.getFolderName(p)
    const f = async () => {
      const [manifest, script] = await Promise.all([
        pluginFileManager.getManifest(`${p}/manifest.json`),
        pluginFileManager.getScript(`${p}/main.js`),
      ])
      return { ...manifest, script, enabled: true, key }
    }
    req.push(f())
  }
  const result = await Promise.all(req)
  return result || []
}

async function init() {
  // TODO
  // 由于目前的 API 仅支持 data 目录，不支持 appearance ，所以先同步一波
  // await syncPlugins()

  const container = window.pluginSystemIocContainer
  // const pluginSystem = container.get("PluginSystem")
  const pluginLoader = container.get("PluginLoader")
  // log("Check plugin system version", container)
  // log("pluginSystem=>", pluginSystem)
  // log("pluginLoader=>", pluginLoader)

  const zhiInternalPlugins = await getZhiInternalPlugins()
  // log("zhiInternalPlugins=>", zhiInternalPlugins)
  await pluginLoader.loadEnabledPlugins(zhiInternalPlugins)
  log(`Loaded zhi theme internal enabled plugins: ${zhiInternalPlugins.map((p) => p.key).join(",")}`)
}

export { init as default, init }
