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

import colors from "ansi-colors"
import kleur from "kleur"
import { BrowserUtil } from "zhi-device-detection"

/**
 * 跨平台，同时支持Node和浏览器的颜色解决方案
 *
 * @public
 * @author terwer
 * @version 1.9.2
 * @since 1.9.2
 */
// polyfill due to https://github.com/vitejs/vite/issues/7385
const crossChalk = {
  white: (str: string): string => {
    return BrowserUtil.isElectron() ? colors.whiteBright(str) : kleur.white(str)
  },
  gray: (str: string): string => {
    return BrowserUtil.isElectron() ? colors.gray(str) : kleur.gray(str)
  },
  blue: (str: string): string => {
    return BrowserUtil.isElectron() ? colors.blue(str) : kleur.blue(str)
  },
  green: (str: string): string => {
    return BrowserUtil.isElectron() ? colors.green(str) : kleur.green(str)
  },
  yellow: (str: string): string => {
    return BrowserUtil.isElectron() ? colors.yellow(str) : kleur.yellow(str)
  },
  red: (str: string): string => {
    return BrowserUtil.isElectron() ? colors.red(str) : kleur.red(str)
  },
  bgWhite: (str: string): string => {
    return BrowserUtil.isElectron() ? colors.bgWhiteBright(str) : kleur.bgWhite(str)
  },
  bgGrey: (str: string): string => {
    return BrowserUtil.isElectron() ? colors.bgCyanBright(str) : kleur.bgCyan(str)
  },
  bgBlue: (str: string): string => {
    return BrowserUtil.isElectron() ? colors.bgBlueBright(str) : kleur.bgBlue(str)
  },
  bgGreen: (str: string): string => {
    return BrowserUtil.isElectron() ? colors.bgGreenBright(str) : kleur.bgGreen(str)
  },
  bgYellow: (str: string): string => {
    return BrowserUtil.isElectron() ? colors.bgYellowBright(str) : kleur.bgYellow(str)
  },
  bgRed: (str: string): string => {
    return BrowserUtil.isElectron() ? colors.bgRedBright(str) : kleur.bgRed(str)
  },
}

export default crossChalk
