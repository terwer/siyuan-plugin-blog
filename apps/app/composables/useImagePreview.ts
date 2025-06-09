/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import { ref } from "vue"

type ImagePreviewInstance = {
  images: ReturnType<typeof ref<string[]>>
  previewRef: ReturnType<typeof ref>
  initImagePreview: (el: HTMLElement) => void
}

// 创建一个全局单例
let instance: ImagePreviewInstance | null = null

const createImagePreview = (): ImagePreviewInstance => {
  const logger = createAppLogger("use-image-preview")
  const images = ref<string[]>([])
  const previewRef = ref()
  // noinspection JSDeprecatedSymbols
  const isSSR = process.server

  const initImagePreview = (el: HTMLElement) => {
    // 确保在客户端执行
    if (isSSR) {
      return
    }

    const imgs = el.querySelectorAll("img")
    if (imgs && imgs.length > 0) {
      // 收集所有图片URL
      images.value = Array.from(imgs).map(img => img.src)
      logger.info(`Found ${images.value.length} images`)

      // 为每个图片添加点击事件
      imgs.forEach((img, index) => {
        img.style.cursor = "zoom-in"
        img.addEventListener("click", () => {
          logger.info(`Clicking image ${index}, previewRef:`, previewRef.value)
          if (previewRef.value) {
            logger.info("Calling show method")
            previewRef.value.show(index)
          } else {
            logger.error("previewRef is not initialized")
          }
        })
      })
    } else {
      logger.info("No images found in the element")
      images.value = []
    }
  }

  return {
    images,
    previewRef,
    initImagePreview
  }
}

export const useImagePreview = () => {
  if (!instance) {
    instance = createImagePreview()
  }
  return instance
}
