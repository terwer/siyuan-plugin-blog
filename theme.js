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

// 警告1⚠️：此文件由思源笔记自动加载，请勿调用此文件中的任何方法
// 警告2⚠️：请勿在此文件中引用其他任何自定义或者第三方类库

/**
 * 思源笔记启动会自动加载此文件
 *
 * @author terwer
 * @since 1.0.0
 */
;(async () => {
  try {
    const path = window.require("path")
    const SIYUAN_CONF_PATH = window.siyuan.config.system.confDir
    const SIYUAN_APPEARANCE_PATH = path.join(SIYUAN_CONF_PATH, "appearance")
    const SIYUAN_THEME_PATH = path.join(SIYUAN_APPEARANCE_PATH, "themes")
    const ZHI_THEME_PATH = path.join(SIYUAN_THEME_PATH, "zhi")
    const ZHI_CJS_PATH = path.join(ZHI_THEME_PATH, "dist-cjs")

    // 初始化主题核心文件
    const CJS_THEME_NAME = "theme.js"
    const themePath = path.join(ZHI_CJS_PATH, CJS_THEME_NAME)
    console.log("[zhi] Loading theme entry=>", themePath)
    const theme = window.require(themePath)

    // 初始化第三方依赖
    const dynamicImports = await theme.init()
    for (const item of dynamicImports) {
      const importPath = path.join(SIYUAN_CONF_PATH, item)
      console.log("[zhi] Loading dependency=>", importPath)
      const lib = window.require(importPath)
      // 如果有初始化方法，进行初始化
      if (lib && lib.init) {
        await lib.init()
      }
    }

    console.log("[zhi] Theme inited.")
  } catch (e) {
    console.log("[zhi] Theme load error=>", e)
  }
})()
