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

import Zhi from "./lib/zhi"
import ZhiUtil from "./ZhiUtil"
import "./lib/util/requireHacker.js"

/**
 * 主题唯一入口，由思源笔记自动调用
 */
;(async () => {
    const logger = ZhiUtil.zhiLog("zhi")
    const common = ZhiUtil.zhiCommon()

    // hack require保证require能使用自定义路径的node_modules
    const zhiNodeModulesPath = common.siyuanUtil.joinPath(common.siyuanUtil.zhiThemePath(), "node_modules")
    logger.info("Init zhi node_modules from => ", zhiNodeModulesPath)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    require.setExternalDeps(zhiNodeModulesPath)
    logger.info("Zhi node_modules inited.")

    const zhi = new Zhi(common.deviceUtil.getDevice())
    await zhi.init()
})()
