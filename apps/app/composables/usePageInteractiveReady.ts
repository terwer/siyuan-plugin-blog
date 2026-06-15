/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2026 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import { readonly } from "vue"

let hooksInstalled = false

export const usePageInteractiveReady = () => {
  const isPageInteractiveReady = useState("page-interactive-ready", () => false)

  if (process.client && !hooksInstalled) {
    hooksInstalled = true
    const nuxtApp = useNuxtApp()

    const markPending = () => {
      isPageInteractiveReady.value = false
    }

    const markReadyAfterPaint = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          isPageInteractiveReady.value = true
        })
      })
    }

    onNuxtReady(markReadyAfterPaint)

    if (document.readyState === "interactive" || document.readyState === "complete") {
      markReadyAfterPaint()
    } else {
      window.addEventListener("DOMContentLoaded", markReadyAfterPaint, { once: true })
      window.addEventListener("load", markReadyAfterPaint, { once: true })
    }

    nuxtApp.hook("page:start", markPending)
    nuxtApp.hook("page:finish", markReadyAfterPaint)
  }

  return {
    isPageInteractiveReady: readonly(isPageInteractiveReady),
  }
}
