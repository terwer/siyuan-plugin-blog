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
 * zhi-core 主题核心模块
 */

import Zhi from "./theme/zhi"
import DeviceDetection from "zhi-device-detection"

// 主题样式注入入口
import "./style/common/fonts/webfont.css"
import "./style/index.styl"

const loadTheme = async (): Promise<void> => {
  const zhi = new Zhi(DeviceDetection.getDevice())
  await zhi.init()
}

/**
 * 主题入口，由思源笔记自动触发，请勿主动调用
 */
;(async () => {
  await loadTheme()
})()

export default loadTheme
export { Zhi }
