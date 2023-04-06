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

import http from "http"
import xml2js from "xml2js"

const ContentType = {
    JSON: "application/json",
    HTML: "text/html",
    XML: "text/xml",
}

function sendResponse(
    res: http.ServerResponse<http.IncomingMessage>,
    statusCode: number,
    data: object,
    contentType: string
) {
    // 设置状态码和响应头
    res.statusCode = statusCode
    switch (contentType) {
        case ContentType.JSON:
            res.setHeader("Content-Type", ContentType.JSON)
            res.write(JSON.stringify(data))
            break
        case ContentType.HTML:
            res.setHeader("Content-Type", ContentType.HTML)
            res.write(data)
            break
        case ContentType.XML:
            res.setHeader("Content-Type", ContentType.XML)
            xml2js.parseString(data, (err: any, result: any) => {
                if (!err) {
                    res.write(result)
                }
            })
            break
        default:
            break
    }
}

export default sendResponse
export {ContentType}
