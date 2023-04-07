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

import DependencyItem from "./models/DependencyItem"
import PluginSystem from "./plugin-system"
import HttpService from "./modules/http-service"
import BlogEntry from "./modules/blog"

/**
 * zhi主题统一生命周期管理
 *
 * @author terwer
 * @since 1.0.0
 */
class Lifecycle {
    private pluginSystem
    private httpService
    private blogEntry

    private _dynamicImports = <DependencyItem[]>[]

    constructor() {
        this.pluginSystem = new PluginSystem()
        this.httpService = new HttpService()
        this.blogEntry = new BlogEntry()
    }

    get dynamicImports(): DependencyItem[] {
        return this._dynamicImports
    }

    public async load() {
        const allImports = <DependencyItem[]>[]

        const pluginSystemImports = await this.loadPluginSystem()
        const widgetsImports = await this.loadWidgets()
        const vendorImports = await this.loadVendors()

        this._dynamicImports = allImports.concat(pluginSystemImports).concat(widgetsImports).concat(vendorImports)
    }

    /**
     * SiYuanPluginSystem
     *
     * @private
     */
    private async loadPluginSystem(): Promise<DependencyItem[]> {
        return await this.pluginSystem.initPluginSystem()
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

        // express 服务
        const httpServiceImports = await this.httpService.initHttpService()
        vendorImports = vendorImports.concat(httpServiceImports)

        // blog
        const blogImports = await this.blogEntry.initBlog()
        vendorImports = vendorImports.concat(blogImports)
        return vendorImports
    }
}

export default Lifecycle
