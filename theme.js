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
const getCjsZhiDir = () => {
    return `${window.siyuan.config.system.confDir}/appearance/themes/zhi/dist-cjs`
  }

;(async () => {
  const zhi = window.require(`${getCjsZhiDir()}/zhi-theme.js`)
  // 主流程加载
  await zhi.main([], async function(dynamicImports) {
    for (const item of dynamicImports) {
      console.log("开始加载=>", item)
      await import(item)
    }
  })
})()
