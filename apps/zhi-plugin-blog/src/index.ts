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

import siyuan from "siyuan"
import { IPluginCommand } from "siyuan/types"

const Plugin = siyuan.Plugin

/**
 * 博客入口
 *
 * http://127.0.0.1:6806/appearance/themes/zhi/web/blog/
 */
class ZhiBlog extends Plugin {
  private logger
  private readonly clientApi = siyuan.clientApi
  private el!: HTMLElement

  constructor() {
    super()
    this.logger = this.clientApi.createLogger("zhi-blog")
  }

  onload() {
    this.el = document.createElement("button")
    this.el.innerText = "ZhiBlog"
    siyuan.clientApi.addToolbarRight(this.el)
    this.logger.info("ZhiBlog load")
  }

  onunload() {
    this.logger.info("ZhiBlog unload")
  }

  registerCommand(command: IPluginCommand) {
    this.logger.info("ZhiBlog registerCommand", command)
  }
}

export default ZhiBlog
