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

import { createAppLogger } from "~/common/appLogger"
import { useBaseUrl } from "~/plugins/renderer/useClientBaseUrl"
import * as cheerio from "cheerio"
import { useSiyuanApi } from "~/composables/api/useSiyuanApi"
import { useProviderMode } from "~/composables/useProviderMode"

/**
 * 处理客户端资源文件地址
 */
export const useStaticClientAssets = () => {
  const logger = createAppLogger("use-static-client-assets")
  const { getClientBaseUrl } = useBaseUrl()
  const { kernelApi } = useSiyuanApi()

  const addClientAssetsPrefix = (el: HTMLElement) => {
    const pageId = el.getAttribute("data-page-id") ?? ""
    const { providerMode } = useProviderMode()

    const imgs = el.querySelectorAll("img")
    if (imgs && imgs.length > 0) {
      imgs.forEach((img) => {
        // 异步加载图片
        img.setAttribute("async", "true")
        img.setAttribute("loading", "lazy")
        // 路径处理
        const src = img.getAttribute("src") ?? ""
        if (src.indexOf("assets") > -1) {
          if (providerMode) {
            logger.info("providerMode is not local, skip addClientAssetsPrefix, use api as alternative")
          } else {
            const baseUrl = getClientBaseUrl()
            const pubicAssetsFolder = `public/siyuan-blog/${pageId}`
            const imgUrl = [baseUrl, pubicAssetsFolder, src].join("/")

            img.setAttribute("src", imgUrl)
          }
        }
      })
      logger.info("The local image has been processed and the picture display has been repaired.")
    }
  }

  const downloadAssetsToPublic = async (html: string, saveFolder: string) => {
    try {
      const baseUrl = getClientBaseUrl()

      // 使用 cheerio 加载 HTML 代码
      const $ = cheerio.load(html)
      const images = $("img")
      for (const image of images) {
        const src = image.attribs["src"]
        const imageUrl = [baseUrl, src].join("/")
        const toFilepath = [saveFolder, src].join("/")
        logger.info(`download image ${imageUrl} to ${toFilepath}`)

        const blob = await getImageBlob(imageUrl)
        await kernelApi.putFile(`${toFilepath}`, new Blob([blob]))
      }
    } catch (e) {
      logger.error("download assets to public error, image will not show properly", e)
    }
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

  // const getImageAsBase64 = async (url) => {
  //   try {
  //     const response = await fetch(url)
  //     const blob = await response.blob()
  //     return await convertBlobToBase64(blob)
  //   } catch (error) {
  //     logger.error("image read error", e)
  //     return ""
  //   }
  // }

  // const convertBlobToBase64 = (blob) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader()
  //     reader.onloadend = () => resolve(reader.result)
  //     reader.onerror = reject
  //     reader.readAsDataURL(blob)
  //   })
  // }

  return { addClientAssetsPrefix, downloadAssetsToPublic }
}
