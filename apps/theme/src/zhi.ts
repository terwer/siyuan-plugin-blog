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

import { version } from "~/package.json"
import { ThemeFromEnum } from "zhi-common"
import ZhiUtil from "zhi-common"
import DependencyItem from "~/src/models/DependencyItem"
import Bootstrap from "~/src/bootstrap"
import Env from "zhi-env"

/**
 * 主题入口
 *
 * @author terwer
 * @since 1.0.0
 */
class Zhi {
  private readonly logger
  private readonly common

  constructor() {
    const env = new Env(import.meta.env)
    const zhiSdk = ZhiUtil.zhiSdk(env)

    this.logger = zhiSdk.getLogger()
    this.common = zhiSdk.common
  }

  public async main(args: string[]): Promise<DependencyItem[]> {
    this.logger.debug(this.common.strUtil.f("Parsing args <{0}>", args))
    this.hello(ThemeFromEnum.ThemeFrom_Siyuan)
    return await Bootstrap.start()
  }

  public hello(from: string): void {
    this.logger.info(this.common.strUtil.f("Hello, {0} {1} v{2}! You are from {3}", "zhi", "theme", version, from))
  }
}

export default Zhi
