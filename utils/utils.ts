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

import { HtmlUtil } from "zhi-common"
import { DeviceDetection, DeviceTypeEnum } from "zhi-device"
import { createAppLogger } from "~/common/appLogger"

const logger = createAppLogger("app-utils")

export const getSummery = (html: string) => {
  const text = HtmlUtil.removeMdWidgetTag(html)
  return HtmlUtil.parseHtml(text, 250)
}

export const isInSiyuanOrSiyuanNewWin = () => {
  const deviceType = DeviceDetection.getDevice()
  // 三种情况，主窗口、挂件、新窗口
  const isSiyuanOrSiyuanNewWin =
    deviceType === DeviceTypeEnum.DeviceType_Siyuan_MainWin ||
    deviceType === DeviceTypeEnum.DeviceType_Siyuan_NewWin ||
    deviceType === DeviceTypeEnum.DeviceType_Siyuan_Widget
  logger.debug("deviceType=>", deviceType)
  logger.debug("isSiyuanOrSiyuanNewWin=>", String(isSiyuanOrSiyuanNewWin))
  return isSiyuanOrSiyuanNewWin
}

export const isUseSiyuanApi = () => {
  const env = useRuntimeConfig()
  // docker - 在 .env.docker 配置 NUXT_PUBLIC_DEFAULT_TYPE=siyuan
  // vercel - 在环境变量配置 NUXT_PUBLIC_DEFAULT_TYPE=siyuan
  // node - 启动参数加 NUXT_PUBLIC_DEFAULT_TYPE=siyuan node NUXT_PUBLIC_SIYUAN_API_URL=http://127.0.0.1:6806
  // 插件SPA(PC客户端) - nuxt.siyuan.config.ts 写死 NUXT_PUBLIC_DEFAULT_TYPE: siyuan
  // 插件SPA(Docker浏览器客户端)- nuxt.siyuan.config.ts 写死 NUXT_PUBLIC_DEFAULT_TYPE: siyuan
  // 插件SPA(本地客户端浏览器)- nuxt.siyuan.config.ts 写死 NUXT_PUBLIC_DEFAULT_TYPE: siyuan
  const isUseSiyuanApi = env.public.defaultType === "siyuan"
  logger.info("defaultType=>", env.public.defaultType)
  logger.info("isUseSiyuanApi=>", String(isUseSiyuanApi))
  return isUseSiyuanApi
}

export const checkExpires = (attrs: any) => {
  const expiredTime = Number(attrs["custom-expires"])
  const publishTime = Number(attrs["custom-publish-time"])
  const now = new Date().getTime()
  // logger.info("expiredTime=>", expiredTime)
  // logger.info("publishTime=>", publishTime)
  // logger.info("now=>", now)
  if (!isNaN(expiredTime) && !isNaN(publishTime) && expiredTime > 0 && publishTime > 0) {
    // 计算过期时间的时间戳
    const expires = publishTime + Number(expiredTime) * 1000
    // 是否过期
    if (expires < now) {
      return true
    }
  }

  return false
}
