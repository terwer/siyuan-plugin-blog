/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import { StrUtil } from "zhi-common"
import { Base64 } from "js-base64"
import { useProviderMode } from "~/composables/useProviderMode"
import { useBaseUrl } from "~/plugins/libs/renderer/useClientBaseUrl"
import { useImagePreview } from "~/composables/useImagePreview"

/**
 * 处理客户端资源文件地址
 */
export const useStaticClientAssets = () => {
  const logger = createAppLogger("use-static-client-assets")
  const { getClientBaseUrl } = useBaseUrl()
  const { initImagePreview } = useImagePreview()

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
            const apiBase = env.public.providerUrl
            // src base64加密
            const base64Url = Base64.encodeURI(src)
            const imgUrl = StrUtil.pathJoin(StrUtil.pathJoin(apiBase, "/api/asset/origin/base64/"), base64Url)
            img.setAttribute("src", imgUrl)
            img.setAttribute("data-src", imgUrl)
            logger.info("providerMode is not local, skip addClientAssetsPrefix, use api as alternative", imgUrl)
          } else {
            const baseUrl = getClientBaseUrl()
            const pubicAssetsFolder = `public/siyuan-blog/${pageId}`
            const imgUrl = StrUtil.pathJoin(StrUtil.pathJoin(baseUrl, pubicAssetsFolder), src)
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

    // 初始化图片预览
    initImagePreview(el)
  }

  return { addClientAssetsPrefix }
}
