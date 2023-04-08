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

/**
 * lib入口，如果是 zhi 模块，此方法必须是 init
 *
 * @param port - 端口
 * @author terwer
 * @version 1.0.0
 * @since 1.0.0
 */
export async function init(port?: number): Promise<string> {
    const logger = ZhiUtil.zhiLog("init-blog-middleware")
    const common = ZhiUtil.zhiCommon()
    const p = port ?? 3000
    try {
        logger.warn("HTTP server is disabled")
        // const zhiBlogMiddleware = new ZhiBlogMiddleware()
        // await zhiBlogMiddleware.startServer(p, [markdownMiddleware])
    } catch (e) {
        logger.error(common.strUtil.f("HTTP server init failed at {0}!Some function may not work", p), e)
    }

    return "HTTP server started"
}
