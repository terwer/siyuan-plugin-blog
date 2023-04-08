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

import ZhiUtil from "./core/util/ZhiUtil"
import { DeviceType } from "zhi-common"
import DependencyItem from "./models/DependencyItem"
import { version } from "../../package.json"
import Bootstrap from "./core/Bootstrap"

/**
 * 主题通用类（由theme.js动态调用，除了单元测试之外请勿主动调用）
 *
 * @public
 * @author terwer
 * @since 1.0.0
 */
class Zhi {
    private readonly logger
    private readonly common
    private readonly kernelApi
    private readonly runAs

    /**
     * 主题样式最低支持版本
     * @private
     */
    private readonly SUPPORTED_THEME_VERSION = "2.7.6"

    /**
     * 内核最低支持版本
     * @private
     */
    private readonly SUPPORTED_KERNEL_VERSION = "2.8.1"

    /**
     * 主题初始化
     *
     * @param runAs - 运行模式
     */
    constructor(runAs: DeviceType) {
        this.logger = ZhiUtil.zhiLog("zhi")
        this.common = ZhiUtil.zhiCommon()
        this.kernelApi = ZhiUtil.siyuanKernelApi()

        this.runAs = runAs ?? DeviceType.DeviceType_Node
    }

    private async main(args: string[]): Promise<DependencyItem[]> {
        this.logger.debug(this.common.strUtil.f("Parsing args <{0}> ...", args))
        this.hello(this.runAs)
        return await Bootstrap.start()
    }

    private hello(from: string): void {
        this.logger.info(this.common.strUtil.f("Hello, {0} {1} v{2}! You are from {3}", "zhi", "theme", version, from))
    }

    /**
     * 主流程加载
     */
    public async init(): Promise<void> {
        try {
            this.logger.info(this.common.strUtil.f("Theme runAs {0}", this.runAs))

            // 检测内核版本
            const kernelVersion = this.common.siyuanUtil.siyuanWindow().siyuan.config.system.kernelVersion
            if (this.common.versionUtil.lesser(kernelVersion, this.SUPPORTED_THEME_VERSION)) {
                const errMsg = this.common.strUtil.f(
                    "Your siyuan-note kernel version {0} is not supported by zhi theme, style will look weird, you must install siyuan-note {1}+ to use zhi-theme",
                    kernelVersion,
                    this.SUPPORTED_THEME_VERSION
                )
                this.logger.error(errMsg)
                this.kernelApi.pushErrMsg({
                    msg: errMsg,
                })
                return
            }

            if (this.common.versionUtil.lesser(kernelVersion, this.SUPPORTED_KERNEL_VERSION)) {
                const warnMsg = this.common.strUtil.f(
                    "Your siyuan-note kernel version {0} is too low, plugin system will not work, you must install siyuan-note {1}+ to use plugin feature",
                    kernelVersion,
                    this.SUPPORTED_KERNEL_VERSION
                )
                this.logger.warn(warnMsg)
                this.kernelApi.pushMsg({
                    msg: warnMsg,
                })
                return
            }

            // 设置依赖路径，hack require保证require能使用自定义路径的node_modules
            if (this.common.browserUtil.isElectron()) {
                const zhiNodeModulesPath = this.common.siyuanUtil.joinPath(
                    this.common.siyuanUtil.zhiThemePath(),
                    "node_modules"
                )
                this.logger.info("Init zhi node_modules from => ", zhiNodeModulesPath)
                this.common.siyuanUtil.siyuanWindow().require.setExternalDeps(zhiNodeModulesPath)
                this.logger.info("Zhi node_modules inited.")
            }

            // 初始化第三方依赖
            const dynamicImports = await this.main([])
            for (const item of dynamicImports) {
                // 类型校验
                if (item.format !== "esm" && item.format !== "cjs" && item.format !== "js") {
                    this.logger.warn("Only esm, cjs supported, skip this lib!", item.libpath)
                    continue
                }

                // 运行环境校验
                if (this.runAs !== item.runAs) {
                    this.logger.debug(
                        this.common.strUtil.f(
                            "I'm sorry because current runtime is {0}, while lib's define runtime is {1}",
                            this.runAs,
                            item.runAs
                        )
                    )
                    this.logger.debug(
                        this.common.strUtil.f(
                            "This lib can only run at {0}, skip!Lib is=>{1}",
                            item.runAs,
                            item.libpath
                        )
                    )
                    continue
                }

                this.logger.info(this.common.strUtil.f("Loading modules form zhi {0}", item.libpath))
                let lib
                if (item.importType == "import") {
                    const importPath = this.common.siyuanUtil.joinPath(
                        this.common.siyuanUtil.zhiThemePath(true),
                        item.libpath
                    )
                    lib = await import(importPath)
                    this.logger.debug(this.common.strUtil.f("Importing lib {0} ...", importPath))
                } else {
                    const importPath = this.common.siyuanUtil.joinPath(
                        this.common.siyuanUtil.zhiThemePath(),
                        item.libpath
                    )
                    lib = this.common.siyuanUtil.requireLib(importPath)
                    this.logger.debug(this.common.strUtil.f("Requiring lib {0} ...", importPath))
                }
                // 如果有初始化方法，进行初始化
                if (lib) {
                    const libObj = lib
                    this.logger.debug(this.common.strUtil.f("Success {0} lib Obj=>", item.importType), libObj)
                    if (libObj.init) {
                        const res = await libObj.init()
                        if (res) {
                            this.logger.info(
                                this.common.strUtil.f(
                                    "Detected output from {0} lib {1}=>",
                                    item.importType,
                                    item.libpath
                                ),
                                res
                            )
                        }
                    } else {
                        this.logger.debug(
                            this.common.strUtil.f("No init method for {0} {1}", item.importType, item.libpath)
                        )
                    }
                } else {
                    this.logger.debug(
                        this.common.strUtil.f("Lib entry is not a function => {0} {1}", item.importType, item.libpath)
                    )
                }
                this.logger.info(this.common.strUtil.f("loaded {0} {1}", item.importType, item.libpath))
            }

            this.logger.info("Theme inited.")
        } catch (e) {
            this.logger.error("Theme load error=>", e)
        }
    }
}

export default Zhi
