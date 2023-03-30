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

import ZhiUtil from "../ZhiUtil"
import { DeviceType } from "zhi-common"
import DependencyItem from "./models/DependencyItem"
import { version } from "../../package.json"
import Bootstrap from "./bootstrap"

/**
 * 主题通用类（由theme.js动态调用，除了单元测试之外请勿主动调用）
 *
 * @public
 * @author terwer
 * @since 1.0.0
 */
class Zhi {
  private readonly logger
  private readonly common
  private readonly runAs

  /**
   * 主题初始化
   *
   * @param runAs - 运行模式
   */
  constructor(runAs: DeviceType) {
    this.logger = ZhiUtil.zhiLog("zhi")
    this.common = ZhiUtil.zhiCommon()

    this.runAs = runAs ?? DeviceType.DeviceType_Node
  }

  private async main(args: string[]): Promise<DependencyItem[]> {
    this.logger.debug(this.common.strUtil.f("Parsing args <{0}> ...", args))
    this.hello(this.runAs)
    return await Bootstrap.start()
  }

  private hello(from: string): void {
    this.logger.info(this.common.strUtil.f("Hello, {0} {1} v{2}! You are from {3}", "zhi", "theme", version, from))
  }

  /**
   * 主流程加载
   */
  public async init(): Promise<void> {
    try {
      this.logger.info(this.common.strUtil.f("Theme runAs {0}", this.runAs))

      // 初始化第三方依赖
      const dynamicImports = await this.main([])
      for (const item of dynamicImports) {
        this.logger.warn(item)
      }

      this.logger.info("Theme inited.")
    } catch (e) {
      this.logger.error("Theme load error=>", e)
    }
  }
}

export default Zhi
