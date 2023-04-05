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

import BrowserUtil from "./browserUtil"

/**
 *
 * 思源笔记工具类
 *
 * @public
 * @author terwer
 * @since 1.0.0
 */
class SiyuanUtil {
    /**
     * 思源笔记Iframe挂件环境
     */
    public isInSiyuanWidget = () => {
        if (typeof window === "undefined") {
            return false
        }
        return (
            window.frameElement != null &&
            window.frameElement.parentElement != null &&
            window.frameElement.parentElement.parentElement != null &&
            window.frameElement.parentElement.parentElement.getAttribute("data-node-id") !== ""
        )
    }

    /**
     * 思源笔记新窗口
     */
    public isInSiyuanNewWin = () => {
        if (!BrowserUtil.isInBrowser) {
            return false
        }
        if (!BrowserUtil.isElectron()) {
            return false
        }
        return typeof (window as any).terwer !== "undefined"
    }

    /**
     * 思源笔记 window 对象
     */
    public siyuanWindow() {
        let win
        if (this.isInSiyuanWidget()) {
            win = parent.window
        } else {
            if (this.isInSiyuanNewWin()) {
                win = window
            } else if (typeof window !== "undefined") {
                win = window
            } else {
                win = undefined
            }
        }
        return win as any
    }

    /**
     * 思源笔记或者思源笔记新窗口，等价于Electron环境
     */
    public isInSiyuanOrSiyuanNewWin = () => {
        return BrowserUtil.isElectron() && BrowserUtil.isInBrowser && (window as any).terwer !== "undefined"
    }

    /**
     * 引入依赖
     *
     * @param libpath - 依赖全路径
     */
    public requireLib = (libpath: string) => {
        const syWin = this.siyuanWindow()
        if (!syWin) {
            return require(libpath)
        }
        if (typeof syWin.require !== "undefined") {
            return syWin.require(libpath)
        }

        return undefined
    }

    /**
     * 路径拼接
     *
     * @param paths - 路径数组
     */
    public joinPath(...paths: string[]): string {
        const path = this.requireLib("path")
        if (path) {
            return path.join(...paths)
        }
        return paths.join("/")
    }

    /**
     * 思源笔记 conf 目录
     */
    public siyuanConfPath() {
        const syWin = this.siyuanWindow()
        if (!syWin) {
            throw new Error("Not in siyuan env")
        }
        return syWin?.siyuan.config.system.confDir
    }

    /**
     * 思源笔记 data 目录
     */
    public siyuanDataPath() {
        const syWin = this.siyuanWindow()
        if (!syWin) {
            throw new Error("Not in siyuan env")
        }
        return syWin.siyuan.config.system.dataDir
    }

    /**
     * 思源笔记 appearance 目录
     */
    public siyuanAppearancePath() {
        const path = this.requireLib("path")
        return path.join(this.siyuanConfPath(), "appearance")
    }

    /**
     * 思源笔记 themes 目录
     */
    public siyuanThemePath() {
        const path = this.requireLib("path")
        return path.join(this.siyuanAppearancePath(), "themes")
    }

    /**
     * zhi 主题目录
     */
    public zhiThemePath() {
        const path = this.requireLib("path")
        return path.join(this.siyuanThemePath(), "zhi")
    }
}

export default SiyuanUtil
