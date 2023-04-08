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

import DependencyItem from "../models/DependencyItem"
import PluginSystem from "./plugin-system"
import MiddlewareEntry from "../server-modules/middleware"
import WebBlogEntry from "../web-modules/blog"
import ZhiBrowserWindow from "./browser-windows"
import InfraEntry from "../server-modules/infra"
import Cmd from "./cmd"

/**
 * zhi主题统一生命周期管理
 *
 * @author terwer
 * @since 1.0.0
 */
class Lifecycle {
    private infra
    private pluginSystem
    private browserWindow
    private cmd

    private middlewareEntry
    private webBlogEntry

    private _dynamicImports = <DependencyItem[]>[]

    constructor() {
        this.infra = new InfraEntry()
        this.pluginSystem = new PluginSystem()
        this.browserWindow = new ZhiBrowserWindow()
        this.cmd = new Cmd()

        this.middlewareEntry = new MiddlewareEntry()
        this.webBlogEntry = new WebBlogEntry()
    }

    get dynamicImports(): DependencyItem[] {
        return this._dynamicImports
    }

    public async load() {
        const allImports = <DependencyItem[]>[]

        const coreModuleImports = await this.loadCoreModules()
        const widgetsImports = await this.loadWidgets()
        const vendorImports = await this.loadVendors()

        this._dynamicImports = allImports.concat(coreModuleImports).concat(widgetsImports).concat(vendorImports)
    }

    /**
     * 加载核心模块
     *
     * @private
     */
    private async loadCoreModules(): Promise<DependencyItem[]> {
        let coreModulesImports = <DependencyItem[]>[]

        // infra
        const infraImports = await this.infra.initInfra()
        coreModulesImports = coreModulesImports.concat(infraImports)

        // SiYuanPluginSystem
        const pluginSystemImports = await this.pluginSystem.initPluginSystem()
        coreModulesImports = coreModulesImports.concat(pluginSystemImports)

        // ZhiBrowserWindow
        const browserWindowImports = await this.browserWindow.initBrowserWindow()
        coreModulesImports = coreModulesImports.concat(browserWindowImports)

        // cmd
        const cmdImports = await this.cmd.initCmd()
        coreModulesImports = coreModulesImports.concat(cmdImports)
        return coreModulesImports
    }

    /**
     * 加载挂件
     *
     * @private
     */
    private async loadWidgets(): Promise<DependencyItem[]> {
        return Promise.resolve([])
    }

    /**
     * 加载第三方库
     *
     * @private
     */
    private async loadVendors(): Promise<DependencyItem[]> {
        let vendorImports = <DependencyItem[]>[]

        // 字体图标
        // const fontAwesomeImports = fontAwesome.initFontAwesome()
        // vendorImports = vendorImports.concat(fontAwesomeImports)

        // infra
        // infra 叙事提取加载，移动到核心模块

        // middleware
        const middlewareImports = await this.middlewareEntry.initMiddleware()
        vendorImports = vendorImports.concat(middlewareImports)

        // webBlog
        const webBlogImports = await this.webBlogEntry.initWebBlog()
        vendorImports = vendorImports.concat(webBlogImports)
        return vendorImports
    }
}

export default Lifecycle
