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

import DependencyItem from "~/src/models/DependencyItem"

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

  public load() {
    const allImports = <DependencyItem[]>[]

    const pluginSystemImports = this.loadPluginSystem()
    const widgetsImports = this.loadWidgets()
    const vendorImports = this.loadVendors()

    this._dynamicImports = allImports.concat(pluginSystemImports).concat(widgetsImports).concat(vendorImports)
  }

  /**
   * SiYuanPluginSystem
   *
   * @private
   */
  private loadPluginSystem(): DependencyItem[] {
    return []
  }

  /**
   * 加载挂件
   *
   * @private
   */
  private loadWidgets(): DependencyItem[] {
    return []
  }

  /**
   * 加载第三方库
   *
   * @private
   */
  private loadVendors(): DependencyItem[] {
    return []
  }
}

export default Lifecycle
