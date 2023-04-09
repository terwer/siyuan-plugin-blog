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

import Env from "zhi-env"
import DefaultLogger from "./defaultLogger"
import LogLevelEnum from "./logConstants"
import CustomLogFactory from "./factory/customLogFactory"

/**
 * 日志工具类
 *
 * @public
 * @author terwer
 * @since 1.0.7
 */
class LogFactory {
    /**
     * 默认日志记录器
     *
     * @param stackSize - 栈的深度
     * @param env - 环境变量实例
     */
    public static defaultLogger(env?: Env, stackSize?: number): DefaultLogger {
        return LogFactory.customLogFactory(undefined, undefined, env).getLogger(undefined, stackSize)
    }

    /**
     * 自定义日志工厂
     */
    public static customLogFactory(level?: LogLevelEnum, sign?: string, env?: Env) {
        return new CustomLogFactory(level, sign, env)
    }

    /**
     * 自定义日志工厂，自定义前缀
     */
    public static customSignLogFactory(sign?: string, env?: Env) {
        return new CustomLogFactory(undefined, sign, env)
    }
}

export default LogFactory
