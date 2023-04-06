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

import ZhiUtil from "../ZhiUtil"
import http from "http"

/**
 * HTTP 服务
 */
class ZhiBlogMiddleware {
    private readonly logger

    constructor() {
        this.logger = ZhiUtil.zhiLog("zhi-blog-middleware")
    }

    async startServer(
        middlewares: ((
            req: http.IncomingMessage,
            res: http.ServerResponse<http.IncomingMessage>,
            next: () => void
        ) => void)[]
    ) {
        this.logger.info("Http server is staring...")
        const server = http.createServer(
            (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => {
                // 定义 middleware 处理函数
                const allMiddlewares = [
                    ...middlewares,
                    (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>, next: () => void) => {
                        this.logger.debug("Default Middleware 1")
                        next()
                    },
                    (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>, next: () => void) => {
                        this.logger.debug("DefaultMiddleware 2")
                        next()
                    },
                ]

                // 定义处理请求的终端函数
                const finalHandler = (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => {
                    this.logger.debug("Final Handler")
                    res.end("Hello World")
                }

                // 遍历调用 middleware 处理函数
                const dispatch = (i: number) => {
                    if (i < allMiddlewares.length) {
                        allMiddlewares[i](req, res, () => dispatch(i + 1))
                    } else {
                        finalHandler(req, res)
                    }
                }
                dispatch(0)
            }
        )
        // 监听 3000 端口
        server.listen(3000, () => {
            this.logger.info("Http Server started on port.")
        })
    }
}

export default ZhiBlogMiddleware
