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

import { DeviceTypeEnum, SiyuanDevice } from "zhi-device-detection"
import ZhiCoreUtil from "./core/util/ZhiCoreUtil"
import DependencyItem from "./models/DependencyItem"
import Bootstrap from "./core/Bootstrap"
import { crossChalk } from "zhi-log"

/**
 * 主题通用类（由theme.js动态调用，除了单元测试之外请勿主动调用）
 *
 * @public
 * @author terwer
 * @since 0.1.0
 */
class Zhi {
  private readonly logger
  private readonly runAs
  private pkgJson = {} as any
  private ZHI_PACKAGE_JSON = "package.json"

  /**
   * 主题初始化
   *
   * @param runAs - 运行模式
   */
  constructor(runAs: DeviceTypeEnum) {
    this.logger = ZhiCoreUtil.zhiLog("zhi-core")

    this.runAs = runAs ?? DeviceTypeEnum.DeviceType_Node
  }

  private async main(args: string[]): Promise<DependencyItem[]> {
    this.logger.debug("Parsing args...", args)
    // 读取package.json
    this.pkgJson = await SiyuanDevice.importZhiThemeJson(this.ZHI_PACKAGE_JSON)
    this.hello(this.runAs)
    return await Bootstrap.start()
  }

  private hello(from: string): void {
    this.logger.info(
      `Hello, this is zhi theme v${this.pkgJson.version}, ${this.pkgJson.description} by ${crossChalk.green(
        this.pkgJson.author
      )}! You are from ${from}`
    )
  }

  /**
   * 主流程加载
   */
  public async init(): Promise<void> {
    try {
      this.logger.info(`Zhi Theme runAs ${this.runAs}`)

      // 平台检测
      if (
        this.runAs !== DeviceTypeEnum.DeviceType_Siyuan_MainWin &&
        this.runAs !== DeviceTypeEnum.DeviceType_Siyuan_Browser
      ) {
        this.logger.warn(
          `Zhi Theme can only run as ${DeviceTypeEnum.DeviceType_Siyuan_MainWin} or ${DeviceTypeEnum.DeviceType_Siyuan_Browser}`
        )
        return
      }

      // 初始化第三方依赖
      // import
      //   browser     esm path: "/[libpath]"
      //   electron    esm path: "/[libpath]"
      //   custom-path X
      //
      // require
      //   browser     X
      //   electron    cjs path: "[abspath][libpath]"
      //   custom-path require-hacker
      const dynamicImports = await this.main([])
      for (const item of dynamicImports) {
        this.logger.info("dependencyItem=>", item)
      }
      this.logger.info("Zhi Theme inited.")
    } catch (e) {
      this.logger.error("Zhi Theme load error=>", e)
    }
  }
}

export default Zhi
