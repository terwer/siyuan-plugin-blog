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

import LuteAdaptor from "./md-adaptor/LuteAdaptor"
import ShowdownAdaptor from "./md-adaptor/ShowdownAdaptor"

/**
 * Markdown 处理工具类
 *
 * @author terwer
 * @version 1.0.0
 * @since 1.0.0
 */
class MarkdownUtil {
    public mdAdaptor

    constructor() {
        const lute = new LuteAdaptor()
        if (lute.isAvailable()) {
            this.mdAdaptor = lute
        } else {
            this.mdAdaptor = new ShowdownAdaptor()
        }
    }

    /**
     * 获取当前 MD 解析器名称
     */
    public getCurrentAdaptorName() {
        if (this.mdAdaptor instanceof LuteAdaptor) {
            return "Lute"
        } else if (this.mdAdaptor instanceof ShowdownAdaptor) {
            return "Showdown"
        }
        return "None"
    }

    /**
     * 渲染Markdown
     *
     * @param md - Markdown文本
     */
    public async renderHTML(md: string): Promise<string> {
        return await this.mdAdaptor.renderMarkdownStr(md)
    }
}

export default MarkdownUtil
