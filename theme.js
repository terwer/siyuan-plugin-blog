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
 * 思源笔记启动会自动加载此文件
 */
// await import("/appearance/themes/zhi/dist/zhi-theme.js")

// 警告1⚠️：思源笔记启动会自动加载此文件，请勿调用此文件中的任何方法
// 警告2⚠️：此文件请勿引用其他任何需要编译的类库

/**
 * 获取zhi主题构建路径目录
 *
 * @author terwer
 * @since 0.0.1
 */
const getRealPath = (libpath) => {
  let ret
  const path = window.require("path")
  if (libpath.toString().includes("themes")) {
    ret = path.join(`${window.siyuan.config.system.confDir}`, libpath)
  } else if (libpath.toString().includes("widgets")) {
    ret = path.join(`${window.siyuan.config.system.dataDir}`, libpath)
  } else {
    ret = path.join(`${window.siyuan.config.system.dataDir}`, libpath)
  }
  return ret
}

/**
 * 安全的import，路径不存在或者加载出错
 *
 * @author terwer
 * @since 0.0.1
 */
const safeImport = async (libpath) => {
  const fs = window.require("fs")
  const realpath = getRealPath(libpath)

  try {
    if (!fs.existsSync(realpath)) {
      console.warn("依赖库不存在，请排查。依赖库路径=>", realpath)
      return
    }
    console.log("将要从以下位置引入依赖=>", libpath)
    await import(libpath)
  } catch (e) {
    console.error("依赖库加载失败，请排查。依赖库路径=>", realpath)
    console.error(e)
  }
}

;(async () => {
  const zhiLibpath = getRealPath("/appearance/themes/zhi/dist-cjs/zhi.js")
  const zhi = window.require(zhiLibpath)
  // 主流程加载
  await zhi.main([], async function (dynamicImports) {
    for (const item of dynamicImports) {
      await safeImport(item)
    }
  })
})()
