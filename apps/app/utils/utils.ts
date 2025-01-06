/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2023-2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import { HtmlUtil } from "zhi-common"

export const getSummery = (html: string) => {
  const text = HtmlUtil.removeMdWidgetTag(html)
  return HtmlUtil.parseHtml(text, 250)
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
