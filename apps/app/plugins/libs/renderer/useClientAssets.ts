/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import { useBaseUrl } from "~/plugins/libs/renderer/useClientBaseUrl"

/**
 * 处理客户端资源文件地址
 */
export const useClientAssets = () => {
  const logger = createAppLogger("use-client-assets")
  const { getClientBaseUrl } = useBaseUrl()

  const addClientAssetsPrefix = (el: HTMLElement) => {
    const imgs = el.querySelectorAll("img")
    if (imgs && imgs.length > 0) {
      imgs.forEach((img) => {
        const src = img.getAttribute("src") ?? ""
        if (src.includes("assets")) {
          const baseUrl = getClientBaseUrl()
          const imgUrl = [baseUrl, src].join("/")

          img.setAttribute("src", imgUrl)
        }
      })
      logger.info("The local image has been processed and the picture display has been repaired.")
    }
  }

  return { addClientAssetsPrefix }
}
