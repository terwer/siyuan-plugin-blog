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

// 警告⚠️：请勿在非Node环境调用此文件中的任何方法

import logFactory from "~/src/utils/logUtil"

/**
 * 安全的require
 * 注意：使用vite打包，require和window.require行为不一样，为了兼容性，强烈建议使用cjsUtil.safeRequire
 *
 * @param moduleName 模块名
 * @author terwer
 * @since 1.0.0
 */
const safeRequire = (moduleName: string): any => {
  if (require === window.require) {
    return require(moduleName)
  }

  return window.require(moduleName)
}

/**
 * Node的require
 *
 * @param moduleName
 * @author terwer
 * @since 1.0.0
 */
const nodeRequire = (moduleName: string): any => {
  return require(moduleName)
}

const cjsUtil = {
  safeRequire,
  nodeRequire,
}

export default cjsUtil
