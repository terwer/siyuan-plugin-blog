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

// 主题样式注入入口
import "./style/common/fonts/webfont.css"
import "./style/index.styl"

/**
 * 主题入口，由思源笔记自动调用
 */
;(async () => {
  // const common = ZhiUtil.zhiCommon()

  const zhi = new Zhi()
  // console.log(import.meta.env)
  console.log("hello, zhi theme", zhi)
  // const zhi = new Zhi(common.deviceUtil.getDevice())
  // await zhi.init()
})()

export default Zhi
