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

import { normalize } from "pathe"

export const hashRE = /#.*$/
export const extRE = /\.(md|html)$/
export const endingSlashRE = /\/$/
export const outboundRE = /^[a-z]+:/i

/**
 * Vdoing 主题工具类
 */
class VdoingUtil {
  public static resolveNavLinkItem(linkItem: any) {
    return Object.assign(linkItem, {
      type: linkItem.items && linkItem.items.length ? "links" : "link",
    })
  }

  public static isExternal(path: string) {
    return outboundRE.test(path)
  }

  public static isMailto(path: string) {
    return /^mailto:/.test(path)
  }

  public static isTel(path: string) {
    return /^tel:/.test(path)
  }

  public static ensureExt(path: string) {
    if (VdoingUtil.isExternal(path)) {
      return path
    }
    if (!path) return "404"
    const hashMatch = path.match(hashRE)
    const hash = hashMatch ? hashMatch[0] : ""
    const normalized = normalize(path)

    if (endingSlashRE.test(normalized)) {
      return path
    }
    return normalized + ".html" + hash
  }

  /**
   * 类型判断
   * @param o - 参数
   */
  public static type(o: any) {
    const s = Object.prototype.toString.call(o)
    const m = s.match(/\[object (.*?)\]/) ?? []
    return m[1].toLowerCase()
  }
}

export default VdoingUtil
