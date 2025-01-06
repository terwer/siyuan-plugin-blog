/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import * as cheerio from "cheerio"
import { useBaseUrl } from "~/plugins/libs/renderer/useClientBaseUrl"

/**
 * DOM 相关操作钩子
 */
export const useServerAssets = () => {
  const logger = createAppLogger("use-server-assets")
  const { getServerBaseUrl } = useBaseUrl()

  /**
   * 获取HTML代码中第一个<img>元素的src属性值
   *
   * @param {string} html - HTML代码
   * @returns {string} 第一个<img>元素的src属性值，如果不存在则返回空字符串
   */
  const getFirstImageSrc = (html: string): string => {
    // 使用 cheerio 加载 HTML 代码
    const $ = cheerio.load(html)

    // 获取第一个<img>元素
    const firstImg = $("img").first()
    if (!firstImg.length) {
      // 没有找到<img>元素，返回空字符串
      return ""
    }

    // 返回<img>元素的src属性
    const src = firstImg.attr("src") || ""
    logger.info(`getFirstImageSrc returns ${src}`) // 记录日志
    return src
  }

  /**
   * 在 HTML 中添加资源路径前缀
   *
   * @param {string} html - HTML 代码
   * @returns {string} 添加前缀后的 HTML 代码
   */
  const addServerAssetsPrefix = (html: string): string => {
    const baseUrl = getServerBaseUrl()
    logger.debug("baseUrl=>", baseUrl)

    // 使用 cheerio 加载 HTML 代码
    const $ = cheerio.load(html)
    const images = $("img")
    for (const image of images) {
      const src = image.attribs.src
      const newImageUrl = [baseUrl, src].join("/")
      logger.debug("image src=>", src)
      logger.debug("newImageUrl=>", newImageUrl)

      image.attribs.src = newImageUrl
    }

    // 将修改后的 DOM 结构重新序列化成字符串并返回
    return $.html()
  }

  return { getFirstImageSrc, addServerAssetsPrefix }
}
