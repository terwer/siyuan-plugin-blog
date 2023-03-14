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

import DependencyItem from "~/src/models/DependencyItem"
import pluginSystem from "./plugin-system"

/**
 * zhi主题统一生命周期管理
 *
 * @author terwer
 * @since 1.0.0
 */
class Lifecycle {
  private _dynamicImports = <DependencyItem[]>[]

  get dynamicImports(): DependencyItem[] {
    return this._dynamicImports
  }

  public async load() {
    const allImports = <DependencyItem[]>[]

    const pluginSystemImports = await this.loadPluginSystem()
    const widgetsImports = await this.loadWidgets()
    const vendorImports = await this.loadVendors()

    this._dynamicImports = allImports.concat(pluginSystemImports).concat(widgetsImports).concat(vendorImports)
  }

  /**
   * SiYuanPluginSystem
   *
   * @private
   */
  private async loadPluginSystem(): Promise<DependencyItem[]> {
    return await pluginSystem.initPluginSystem()
  }

  /**
   * 加载挂件
   *
   * @private
   */
  private async loadWidgets(): Promise<DependencyItem[]> {
    return Promise.resolve([])
  }

  /**
   * 加载第三方库
   *
   * @private
   */
  private async loadVendors(): Promise<DependencyItem[]> {
    // const vendorImports = <DependencyItem[]>[]

    // // 字体图标
    // const fontAwesomeImports = fontAwesome.initFontAwesome()
    // return Promise.resolve(vendorImports.concat(fontAwesomeImports))
    return Promise.resolve([])
  }
}

export default Lifecycle
