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

import ZhiUtil from "./ZhiUtil"
import fixPath from "fix-path"

/**
 * 基础设施
 */
class ZhiInfra {
    private readonly logger
    private readonly common

    constructor() {
        this.logger = ZhiUtil.zhiLog("zhi-infra")
        this.common = ZhiUtil.zhiCommon()
    }

    /**
     * 修复 Mac 和 Linux 下面的 PATH 环境变量问题
     */
    public fixPathEnv() {
        // 修复 Mac 和 Linux 下面的 PATH 环境变量问题
        this.logger.debug("process.env.PATH before => ", this.common.siyuanUtil.siyuanWindow().process.env.PATH)
        fixPath()
        console.log("process.env.PATH after fix => ", this.common.siyuanUtil.siyuanWindow().process.env.PATH)
        this.logger.info("Fixed $PATH in Electron apps as GUI apps on macOS and Linux")
    }
}

export default ZhiInfra
