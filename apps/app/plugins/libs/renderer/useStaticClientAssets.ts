/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import { useProviderMode } from "~/composables/useProviderMode"
import { useBaseUrl } from "~/plugins/libs/renderer/useClientBaseUrl"

/**
 * 处理客户端资源文件地址
 */
export const useStaticClientAssets = () => {
  const logger = createAppLogger("use-static-client-assets")
  const { getClientBaseUrl } = useBaseUrl()

  const addClientAssetsPrefix = (el: HTMLElement) => {
    const pageId = el.getAttribute("data-page-id") ?? ""
    const { providerMode } = useProviderMode()
    const env = useRuntimeConfig()

    const imgs = el.querySelectorAll("img")
    if (imgs && imgs.length > 0) {
      imgs.forEach((img) => {
        // 异步加载图片
        img.setAttribute("async", "true")
        img.setAttribute("loading", "lazy")
        // 路径处理
        const src = img.getAttribute("src") ?? ""
        if (src.includes("assets")) {
          if (providerMode) {
            // const apiBase = env.public.providerUrl
            // const imgUrl = [apiBase, "api/asset/", src].join("/")
            logger.info("providerMode is not local, skip addClientAssetsPrefix, use api as alternative")
          } else {
            const baseUrl = getClientBaseUrl()
            const pubicAssetsFolder = `public/siyuan-blog/${pageId}`
            const imgUrl = [baseUrl, pubicAssetsFolder, src].join("/")

            img.setAttribute("src", imgUrl)
            img.setAttribute("data-src", imgUrl)
          }
        }
        // 兼容旧图片域名
        if (src.includes("https://api.siyuannote.site")) {
          const imgUrl = src.replace("https://api.siyuannote.site", "https://img1.siyuan.wiki")
          img.setAttribute("src", imgUrl)
          img.setAttribute("data-src", imgUrl)
        }
      })
      logger.info("The local image has been processed and the picture display has been repaired.")
    }
  }

  // =========================================================================
  // const getImageBlob = async (url: string) => {
  //   try {
  //     const response = await fetch(url)
  //     return await response.blob()
  //   } catch (e: any) {
  //     logger.error("image read error", e)
  //     return ""
  //   }
  // }

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

  return { addClientAssetsPrefix }
}
