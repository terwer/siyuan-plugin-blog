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

import MarkdownAdaptor from "./MarkdownAdaptor"
import ZhiCommonUtil from "../ZhiCommonUtil"
import { SiyuanDevice } from "zhi-device"

/**
 * Lute 适配器
 *
 * 引用 lute 库的方法
 *
 * 1 dev/prod 环境
 * 在 index.html 直接引用 <script src="/lib/lute/lute.min.js"></script>
 *
 * 2 test 环境
 * 在 setup.ts 引用 require("../public/lib/lute/lute.min.js")
 *
 * 3 es 环境（不推荐）
 *
 *   ```
 *   // https://stackoverflow.com/a/73702082/4037224
 *   const require = createRequire(import.meta.url)
 *   global.require = require //this will make require at the global scobe and treat it like the original require
 *   require("./lute.min.cjs")
 *   ```
 *
 *   更好的方法
 *
 *   ```
 *   import Module from "node:module"
 *
 *   const require = Module.createRequire(import.meta.url)
 *   require("./lute.min.cjs")
 *   ```
 *
 *   2023-04-09 - lute version 2.7.5 - update at April 9, 2023 09:32
 *
 * 4 Nuxt3 环境
 *   参考：https://github.com/88250/lute/issues/191
 *
 * @see {@link https://github.com/88250/lute/tree/master/javascript lute}
 *
 * @author terwer
 * @version 1.0.0
 * @since 1.0.0
 */
class LuteAdaptor implements MarkdownAdaptor {
  private readonly logger

  constructor() {
    this.logger = ZhiCommonUtil.zhiLog("lute-adaptor")

    const syWin = SiyuanDevice.siyuanWindow()
    this.logger.debug("syWin=>", syWin)
    if (syWin.Lute) {
      this.logger.debug("Detected Lute is bundled, will use!")
    } else {
      this.logger.debug("Lute is not available!")
    }
  }

  isAvailable(): boolean {
    const syWin = SiyuanDevice.siyuanWindow()
    return typeof syWin.Lute !== "undefined"
  }

  /**
   * 高亮关键字
   *
   * @param str - 字符串
   * @private
   */
  private highlightWords(str: string) {
    const regex = /(?<=^|[\s\S])==([^\n]+?)==(?=($|[\s\S]))/g
    return str.replace(regex, '<span class="mark">$1</span>')
  }

  /**
   * 渲染Markdown
   *
   * @param md - Markdown
   */
  public async renderMarkdownStr(md: string): Promise<string> {
    if (!this.isAvailable()) {
      this.logger.error("Lute is not available, will return original md")
      return md
    }

    const syWin = SiyuanDevice.siyuanWindow()
    const luteObj = syWin.Lute
    const lute = luteObj.New()

    const renderers = {
      renderText: (node: any, entering: any) => {
        if (entering) {
          // 替换所有符合格式的标记为指定的 HTML 代码
          const renderedText = this.highlightWords(node.Text())
          return [renderedText, luteObj.WalkContinue]
        }
        return ["", luteObj.WalkContinue]
      },
      // renderStrong: (node: any, entering: any) => {
      //     return ["", luteObj.WalkContinue]
      // },
      // renderParagraph: (node: any, entering: any) => {
      //     return ["", luteObj.WalkContinue]
      // }
    }

    lute.SetJSRenderers({
      renderers: {
        Md2HTML: renderers,
      },
    })

    this.logger.info("Lute is rendering md to HTML...")
    return lute.MarkdownStr("", md)
  }
}

export default LuteAdaptor
