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

import strUtil from "~/src/utils/strUtil"
import { version } from "~/package.json"
import { Bootstrap } from "~/src/apps/zhi/bootstrap"

/**
 * 主题入口
 *
 * @author terwer
 * @since 0.0.1
 */
class Zhi {
  public async main(args: string[], callback: Function) {
    this.hello("zhi-theme")
    // const dynamicImports = await Bootstrap.start()
    // callback(dynamicImports)
    callback([])
  }

  public hello(from: string): void {
    console.log(
      strUtil.f(
        "hello, {0} {1} v{2}! You are from {3}",
        "zhi",
        "theme",
        version,
        from
      )
    )
  }
}

const zhi = new Zhi()

// 默认支持esm
export default zhi
// 兼容cjs
if (typeof module !== "undefined") {
  module.exports = zhi
}
