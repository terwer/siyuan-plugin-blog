/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import * as cheerio from "cheerio"
import {createAppLogger} from "../utils/appLogger.ts"
import {useSiyuanApi} from "./useSiyuanApi.ts"

export const useStaticAssets = () => {
  const logger = createAppLogger("use-static-assets")
  const {kernelApi} = useSiyuanApi()
  
  const downloadAssetsToPublic = async (html: string, saveFolder: string) => {
    try {
      const baseUrl = window.location.origin

      // 使用 cheerio 加载 HTML 代码
      const $ = cheerio.load(html)
      const images = $("img")
      for (const image of images) {
        const src = image.attribs["src"]
        const imageUrl = [baseUrl, src].join("/")
        const toFilepath = [saveFolder, src].join("/")
        
        // 验证文件名
        if (!isValidWindowsFilename(src)) {
          logger.warn(`Invalid filename detected: ${src}, skipping...`)
          continue
        }
        
        // 跳过网络图片
        if (src.startsWith("http")) {
          continue
        }
        
        logger.info(`download image ${imageUrl} to ${toFilepath}`)

        // eslint-disable-next-line no-await-in-loop
        const blob = await getImageBlob(imageUrl)
        // eslint-disable-next-line no-await-in-loop
        await kernelApi.putFile(`${toFilepath}`, new Blob([blob]))
      }
    } catch (e) {
      logger.error("download assets to public error, image will not show properly", e)
    }
  }

  // 验证 Windows 文件名是否合法
  const isValidWindowsFilename = (filename: string): boolean => {
    // 检查长度
    if (filename.length > 255) {
      return false
    }

    // 检查非法字符
    const invalidChars = /[:*?"<>|]/
    if (invalidChars.test(filename)) {
      return false
    }

    // 检查是否以点号结尾
    if (filename.endsWith(".")) {
      return false
    }

    // 检查保留的设备名称
    const reservedNames = [
      "CON", "PRN", "AUX", "NUL",
      "COM1", "COM2", "COM3", "COM4",
      "LPT1", "LPT2", "LPT3", "LPT4"
    ]
    const nameWithoutExt = filename.split(".")[0].toUpperCase()
    if (reservedNames.includes(nameWithoutExt)) {
      return false
    }

    return true
  }

  // =========================================================================
  const getImageBlob = async (url: string) => {
    try {
      const response = await fetch(url)
      return await response.blob()
    } catch (e: any) {
      logger.error("image read error", e)
      return ""
    }
  }

  return {downloadAssetsToPublic}
}