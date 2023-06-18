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
import * as cheerio from "cheerio"
import { DeviceDetection, DeviceTypeEnum } from "zhi-device"
import { createAppLogger } from "~/common/appLogger"

const logger = createAppLogger("app-utils")

export const getSummery = (html: string) => {
  const text = HtmlUtil.removeMdWidgetTag(html)
  return HtmlUtil.parseHtml(text, 250)
}

export const getFirstImageSrc = async (html: string) => {
  // 初始化Cheerio实例
  const $ = cheerio.load(html)
  // 获取第一个<img>元素
  const firstImg = $("img").first()
  if (firstImg.length === 0) {
    // 没有找到<img>元素，返回空字符串
    return ""
  }
  // 返回<img>元素的src属性
  return firstImg.attr("src") || ""
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
  const isUseSiyuanApi = env.public.defaultType === "siyuan"
  logger.debug("defaultType=>", env.public.defaultType)
  logger.debug("isUseSiyuanApi=>", String(isUseSiyuanApi))
  return isUseSiyuanApi
}
