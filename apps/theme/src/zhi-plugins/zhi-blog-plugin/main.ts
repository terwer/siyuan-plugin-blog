/*
 Copyright (c) 2023 Terwer. All rights reserved.

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

import siyuan from "siyuan"
import { IPluginCommand } from "siyuan/types"
import ZhiUtil from "zhi-common"
import Env from "zhi-env"

const Plugin = siyuan.Plugin

class ZhiBlogBlogPlugin extends Plugin {
  private logger
  private el!: HTMLElement

  constructor() {
    super()
    const env = new Env(import.meta.env)
    const zhiSdk = ZhiUtil.zhiSdk(env)
    this.logger = zhiSdk.getLogger()
  }

  onload() {
    this.el = document.createElement("button")
    this.el.innerText = "ZhiBlog"
    siyuan.clientApi.addToolbarRight(this.el)
    this.logger.info("ZhiBlogPlugin load")
  }

  onunload() {
    this.logger.info("ZhiBlogPlugin unload")
  }

  registerCommand(command: IPluginCommand) {
    this.logger.info("ZhiBlogPlugin registerCommand", command)
  }
}

export default ZhiBlogBlogPlugin
