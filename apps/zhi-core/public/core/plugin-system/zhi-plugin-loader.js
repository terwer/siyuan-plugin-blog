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

const zhiPluginBase = "/appearance/themes/zhi/plugin"
const log = window.zhiLog.info

async function init() {
  const container = window.pluginSystemIocContainer
  const pluginSystem = container.get("PluginSystem")
  log("Check plugin system version", container)
  log("pluginSystem=>", pluginSystem)

  const zhiInternalPlugins = await getZhiInternalPlugins()
  log("zhiInternalPlugins=>", zhiInternalPlugins)
}

async function getZhiInternalPlugins() {
  const container = window.pluginSystemIocContainer
  const pluginFileManager = container.get("PluginFileManager")
  log("pluginFileManager=>", pluginFileManager)

  const plugins = await pluginFileManager.scanPlugins(zhiPluginBase)
  if (!plugins || !plugins.length) {
    log("No plugin found in " + zhiPluginBase)
    return []
  }
  const req = []
  for (const p of plugins) {
    log("Reading plugin from filesystem: " + p)
    const key = this.getFolderName(p)
    const f = async () => {
      const [manifest, script] = await Promise.all([
        pluginFileManager.getManifest(`${p}/manifest.json`),
        this.getScript(`${p}/main.js`),
      ])
      return { ...manifest, script, enabled: false, key }
    }
    req.push(f())
  }
  const result = await Promise.all(req)
  return result || []
}

export { init as default, init }
