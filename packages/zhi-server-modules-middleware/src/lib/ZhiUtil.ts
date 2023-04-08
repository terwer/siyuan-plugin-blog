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

import LogFactory from "zhi-log"
import ZhiCommon from "zhi-common"
import Env from "zhi-env"
import { SiyuanKernelApi } from "zhi-siyuan-api"

/**
 * 工具类统一入口，每个应用自己实现
 *
 * @public
 * @author terwer
 * @since 1.0.0
 */
class ZhiUtil {
    /**
     * 按照logger缓存
     * @private
     */
    private static loggerMap: any
    private static common: ZhiCommon
    private static env: Env
    private static kernelApi: SiyuanKernelApi

    /**
     * 获取 zhi-env 实例
     */
    public static zhiEnv() {
        if (!ZhiUtil.env) {
            // https://github.com/vitejs/vite/issues/9539#issuecomment-1206301266
            // 1 add modules:esnext tsconfig.app.json
            // 2 add custom.d.ts
            ZhiUtil.env = new Env(import.meta.env)
        }
        return ZhiUtil.env
    }

    /**
     * 获取 zhi-common 实例
     */
    public static zhiCommon() {
        if (!ZhiUtil.common) {
            ZhiUtil.common = new ZhiCommon()
        }
        return ZhiUtil.common
    }

    /**
     * 获取 zhi-log 实例
     */
    public static zhiLog(loggerName: string) {
        // 先检测日志Map
        if (ZhiUtil.loggerMap) {
            // 日志不存在，生成一个新的缓存到Map
            if (ZhiUtil.loggerMap[loggerName]) {
                ZhiUtil.loggerMap[loggerName].debug("Zhi-log use cache.")
            } else {
                const env = ZhiUtil.zhiEnv()
                ZhiUtil.loggerMap[loggerName] = LogFactory.customSignLogFactory("zhi-blog-middleware", env).getLogger(
                    loggerName
                )
                ZhiUtil.loggerMap[loggerName].debug("Zhi-log add new logger.")
            }
        } else {
            // 生成新的日志器
            const env = ZhiUtil.zhiEnv()
            ZhiUtil.loggerMap = {}
            ZhiUtil.loggerMap[loggerName] = LogFactory.customSignLogFactory("zhi-blog-middleware", env).getLogger(
                loggerName
            )
            ZhiUtil.loggerMap[loggerName].debug("Zhi-log inited.")
        }

        // 从Map缓存获取日志器
        return ZhiUtil.loggerMap[loggerName]
    }

    /**
     * 获取 siyuan-kernel-api 实例
     */
    public static siyuanKernelApi() {
        if (!ZhiUtil.kernelApi) {
            const env = ZhiUtil.zhiEnv()
            ZhiUtil.kernelApi = new SiyuanKernelApi(env)
        }
        return ZhiUtil.kernelApi
    }
}

export default ZhiUtil
