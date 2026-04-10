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

const normalizeViewerFontSample = (text: string) => text.replace(/\s+/g, " ").trim()

const getViewerFontSampleText = () => {
  const title = normalizeViewerFontSample(document.title ?? "")
  const bodyText = normalizeViewerFontSample(document.body?.innerText ?? "")
  const sampleText = `${title} ${bodyText}`.trim()

  if (!sampleText) {
    return "在线分享字体体验 Open Sans LXGW WenKai 1234567890"
  }

  return sampleText.slice(0, 512)
}

const markEnhancedFontMode = () => {
  document.documentElement.setAttribute(VIEWER_FONT_MODE_ATTR, VIEWER_FONT_MODE_ENHANCED)
  localStorage.setItem(VIEWER_FONT_MODE_KEY, VIEWER_FONT_MODE_ENHANCED)
}

const markEnhancedFontReady = () => {
  localStorage.setItem(VIEWER_FONT_READY_KEY, "true")
}

const hasEnhancedFontMode = () =>
  localStorage.getItem(VIEWER_FONT_MODE_KEY) === VIEWER_FONT_MODE_ENHANCED

const hasEnhancedFontReady = () => localStorage.getItem(VIEWER_FONT_READY_KEY) === "true"

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

const waitForViewerFontsReady = async (sampleText: string) => {
  if (!("fonts" in document)) {
    return
  }

  await Promise.all([
    document.fonts.load('400 1em "Open Sans"', sampleText),
    document.fonts.load('400 1em "LXGW WenKai"', sampleText),
  ])
}

const enableEnhancedFonts = async () => {
  try {
    await ensureViewerFontStylesheet()
    await waitForViewerFontsReady(getViewerFontSampleText())
    markEnhancedFontMode()
    markEnhancedFontReady()
  } catch (error) {
    console.error("[viewer-font-mode] failed to enable enhanced fonts", error)
  }
}

const scheduleEnhancedFonts = () => {
  if (typeof window.requestAnimationFrame === "function") {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        void enableEnhancedFonts()
      })
    })
    return
  }

  window.setTimeout(() => {
    void enableEnhancedFonts()
  }, 0)
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:mounted", () => {
    if (!import.meta.client) {
      return
    }

    if (hasEnhancedFontMode() && hasEnhancedFontReady()) {
      if (document.documentElement.getAttribute(VIEWER_FONT_MODE_ATTR) !== VIEWER_FONT_MODE_ENHANCED) {
        markEnhancedFontMode()
      }
      void ensureViewerFontStylesheet()
      return
    }

    scheduleEnhancedFonts()
  })
})
