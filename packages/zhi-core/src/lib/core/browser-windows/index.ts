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

import DependencyItem from "../../models/DependencyItem"
import ZhiUtil from "../util/ZhiUtil"
import WindowManager from "./WindowManager"

/**
 * 这里统一挂载一个方法，可以打开 Electron 的 BrowserWindow
 */
class ZhiBrowserWindow {
    private readonly logger
    private readonly common

    private windowManager

    constructor() {
        this.logger = ZhiUtil.zhiLog("zhi-browser-window")
        this.common = ZhiUtil.zhiCommon()

        this.windowManager = new WindowManager()
    }

    /**
     * 挂载 BrowserWindow
     *
     * @author terwer
     * @since 1.0.0
     */
    public async initBrowserWindow(): Promise<DependencyItem[]> {
        this.common.siyuanUtil.siyuanWindow().windowManager = this.windowManager
        this.logger.info("WindowManager mounted", this.common.siyuanUtil.siyuanWindow().windowManager)
        return Promise.resolve([])
    }
}

export default ZhiBrowserWindow
