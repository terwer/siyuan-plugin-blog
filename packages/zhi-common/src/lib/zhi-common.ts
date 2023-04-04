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

import DateUtil from "./dateUtil"
import StrUtil from "./strUtil"
import DeviceUtil from "./deviceUtil"
import SiyuanUtil from "./siyuanUtil"
import VersionUtil from "./versionUtil";

/**
 * 平台无关的通用工具类
 *
 * @author terwer
 * @since 1.3.0
 */
class ZhiCommon {
  public readonly dateUtil
  public readonly strUtil
  public readonly deviceUtil
  public readonly siyuanUtil
  public readonly versionUtil

  constructor() {
    this.dateUtil = new DateUtil()
    this.strUtil = new StrUtil()
    this.deviceUtil = DeviceUtil
    this.siyuanUtil = new SiyuanUtil()
    this.versionUtil = new VersionUtil()
  }
}

export default ZhiCommon
