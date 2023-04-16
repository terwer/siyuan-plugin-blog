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

import DependencyItem from "../models/DependencyItem"
import { SiyuanDevice } from "zhi-device-detection"
import ZhiUtil from "./util/ZhiUtil"

/**
 * zhi主题统一生命周期管理
 *
 * @author terwer
 * @version 0.1.0
 * @since 0.1.0
 */
class Lifecycle {
  private readonly logger
  private ZHI_JSON_SCHEMA = "zhi-schema.json"
  private ZHI_JSON = "zhi.json"

  constructor() {
    this.logger = ZhiUtil.zhiLog("lifecycle")
  }

  /**
   * 加载依赖，核心加载顺序按照下面描述的顺序加载，内部的加载顺序由 order 字段决定，
   * 所有依赖定义在主题根目录的 `zhi.json`
   *
   * ```
   * 加载顺序如下：
   * 1 核心模块-require-hacker、infra、browser-window
   * 2 插件系统
   * 3 后端模块
   * 4 前端模块
   * 5 插件-由插件系统负责
   * ```
   */
  public async load() {
    const allImports = <DependencyItem[]>[]

    // json-schema 校验

    // json读取
    // const { default: data } = await import("/appearance/themes/zhi/zhi-schema.json", { assert: { type: "json" } });data
    // const { default: data } = await import("/appearance/themes/zhi/zhi.json", { assert: { type: "json" } });data
    const zhiSchema = await SiyuanDevice.importZhiThemeJson(this.ZHI_JSON_SCHEMA)
    const zhiJson = await SiyuanDevice.importZhiThemeJson(this.ZHI_JSON)
    this.logger.debug("zhiSchema=>", zhiSchema)
    this.logger.debug("zhiJson=>", zhiJson)

    // 解析json

    return allImports
  }

  /**
   * 加载核心模块
   *
   * @private
   */
  private async loadCoreModules(): Promise<DependencyItem[]> {
    const coreModulesImports = <DependencyItem[]>[]
    return coreModulesImports
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
    const vendorImports = <DependencyItem[]>[]

    // 字体图标
    // const fontAwesomeImports = fontAwesome.initFontAwesome()
    // vendorImports = vendorImports.concat(fontAwesomeImports)
    return vendorImports
  }
}

export default Lifecycle
