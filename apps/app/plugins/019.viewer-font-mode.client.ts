const VIEWER_FONT_MODE_KEY = "siyuan_blog_viewer_font_mode"
const VIEWER_FONT_READY_KEY = "siyuan_blog_viewer_font_ready"
const VIEWER_FONT_MODE_ATTR = "data-viewer-font-mode"
const VIEWER_FONT_MODE_ENHANCED = "enhanced"
const VIEWER_FONT_STYLESHEET_ID = "viewer-enhanced-fonts"
const VIEWER_FONT_STYLESHEET_PATH = "libs/fonts/lxgw_font.css"

let viewerFontLoadPromise: Promise<void> | null = null

const getAppBase = () => {
  const appBase = process.env.APP_BASE ?? "/"
  return appBase.endsWith("/") ? appBase : `${appBase}/`
}

const getFontStylesheetHref = () => `${getAppBase()}${VIEWER_FONT_STYLESHEET_PATH}`

const markEnhancedFontMode = () => {
  document.documentElement.setAttribute(VIEWER_FONT_MODE_ATTR, VIEWER_FONT_MODE_ENHANCED)
  localStorage.setItem(VIEWER_FONT_MODE_KEY, VIEWER_FONT_MODE_ENHANCED)
}

const markEnhancedFontReady = () => {
  localStorage.setItem(VIEWER_FONT_READY_KEY, "true")
}

const ensureViewerFontStylesheet = () => {
  if (viewerFontLoadPromise) {
    return viewerFontLoadPromise
  }

  viewerFontLoadPromise = new Promise((resolve, reject) => {
    const existingLink = document.getElementById(VIEWER_FONT_STYLESHEET_ID) as HTMLLinkElement | null
    if (existingLink) {
      if (existingLink.sheet) {
        resolve()
        return
      }

      existingLink.addEventListener("load", () => resolve(), { once: true })
      existingLink.addEventListener("error", () => reject(new Error("viewer font stylesheet load failed")), {
        once: true,
      })
      return
    }

    const link = document.createElement("link")
    link.id = VIEWER_FONT_STYLESHEET_ID
    link.rel = "stylesheet"
    link.href = getFontStylesheetHref()
    link.onload = () => resolve()
    link.onerror = () => reject(new Error("viewer font stylesheet load failed"))
    document.head.appendChild(link)
  })

  return viewerFontLoadPromise
}

const waitForViewerFontsReady = async () => {
  if (!("fonts" in document)) {
    return
  }

  // 只等待当前页面实际用到的字体，不再用 512 字样本强行预加载大量子集
  await document.fonts.ready
}

const enableEnhancedFonts = async () => {
  try {
    await ensureViewerFontStylesheet()
    // 先切换字体：页面文字保持可读，字体按需渐进下载
    markEnhancedFontMode()
    await waitForViewerFontsReady()
    markEnhancedFontReady()
  } catch (error) {
    console.error("[viewer-font-mode] failed to enable enhanced fonts", error)
  }
}

/**
 * 字体只在页面完全加载后、浏览器空闲时开始加载。
 *
 * 这样字体请求不会拖住页面的 load 事件，Chrome 标签页的加载转圈会在
 * 页面主体加载完成后停止，字体在后台继续加载。
 */
const scheduleEnhancedFonts = () => {
  const run = () => {
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(
        () => {
          void enableEnhancedFonts()
        },
        { timeout: 2000 },
      )
      return
    }

    window.setTimeout(() => {
      void enableEnhancedFonts()
    }, 300)
  }

  if (document.readyState === "complete") {
    run()
    return
  }

  window.addEventListener("load", run, { once: true })
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:mounted", () => {
    if (!import.meta.client) {
      return
    }

    scheduleEnhancedFonts()
  })
})
