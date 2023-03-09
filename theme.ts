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

/**
 * @packageDocumentation
 * 🛍️ 一款自带插件和博客的思源笔记主题
 */

import Zhi from "~/src/apps/zhi/zhi"
import ZhiUtil from "~/src/utils/ZhiUtil"
import path from "path"
import siyuanUtil from "~/src/utils/siyuanUtil"

// 特别提醒1⚠️：此文件是主题的唯一入口，会在构建时自动生成js文件
// 特别提醒2⚠️：该文件由思源笔记自动加载，请勿主动调用此文件中的任何方法

/**
 * 主题通用入口（由theme.js动态调用，请勿主动调用）
 * vite构建配置：vite.config.ts
 *
 * @public
 * @author terwer
 * @since 1.0.0
 */
class Theme {
  private readonly logger
  private readonly zhiTheme

  constructor() {
    this.logger = ZhiUtil.zhiSdk().getLogger()
    this.zhiTheme = new Zhi()
  }

  /**
   * 主流程加载
   */
  public async init(): Promise<void> {
    try {
      // 初始化第三方依赖
      const dynamicImports = await this.zhiTheme.main([])
      for (const item of dynamicImports) {
        const libpath = item.libpath
        const importPath = path.join(siyuanUtil.SIYUAN_CONF_PATH, libpath)
        this.logger.info("Loading dependency=>", libpath)
        const lib = siyuanUtil.syWin.require(importPath)
        // 如果有初始化方法，进行初始化
        if (lib && lib.init) {
          await lib.init()
        }
      }
      this.logger.info("Theme inited.")
    } catch (e) {
      this.logger.error("Theme load error=>", e)
    }
  }
}

;(async () => {
  const theme = new Theme()
  await theme.init()
})()

export default Theme
