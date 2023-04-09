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

import LogFactory, { LogConstants, LogLevelEnum } from "zhi-log"
import Env, { EnvConstants } from "zhi-env"

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
    private static env: Env

    /**
     * 获取 zhi-env 实例
     */
    public static zhiEnv() {
        if (!ZhiUtil.env) {
            // https://github.com/vitejs/vite/issues/9539#issuecomment-1206301266
            // 1 add modules:esnext tsconfig.app.json
            // 2 add custom.d.ts
            const envMeta = import.meta.env

            const customEnv = {
                [EnvConstants.NODE_ENV_KEY]: EnvConstants.NODE_ENV_DEVELOPMENT,
                [EnvConstants.VITE_DEBUG_MODE_KEY]: false,
                [LogConstants.LOG_LEVEL_KEY]: LogLevelEnum.LOG_LEVEL_DEBUG,
                [LogConstants.LOG_PREFIX_KEY]: "zhi-blog-api",
                ...envMeta,
            }

            ZhiUtil.env = new Env(customEnv)
        }
        return ZhiUtil.env
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
                ZhiUtil.loggerMap[loggerName] = LogFactory.customSignLogFactory("zhi-blog-api", env).getLogger(
                    loggerName
                )
                ZhiUtil.loggerMap[loggerName].debug("Zhi-log add new logger.")
            }
        } else {
            // 生成新的日志器
            const env = ZhiUtil.zhiEnv()
            ZhiUtil.loggerMap = {}
            ZhiUtil.loggerMap[loggerName] = LogFactory.customSignLogFactory("zhi-blog-api", env).getLogger(loggerName)
            ZhiUtil.loggerMap[loggerName].debug("Zhi-log inited.")
        }

        // 从Map缓存获取日志器
        return ZhiUtil.loggerMap[loggerName]
    }
}

export default ZhiUtil
