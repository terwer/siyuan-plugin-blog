const fontMode = "data-viewer-font-mode"
const stylesheetId = "viewer-enhanced-fonts"

export default defineNuxtPlugin((nuxtApp) => {
  const { appBase } = useAppBase()
  const enabled = String(useRuntimeConfig().public.viewerFontsEnabled).trim().toLowerCase() === "true"
  const disableEnhancedFonts = () => {
    document.documentElement.removeAttribute(fontMode)
    document.getElementById(stylesheetId)?.remove()
  }

  nuxtApp.hook("app:mounted", () => {
    if (!enabled) {
      disableEnhancedFonts()
      return
    }

    // Start after hydration. Slow images or iframes must not delay this until window.load.
    const loadStylesheet = () => {
      if (document.getElementById(stylesheetId)) return
      const link = document.createElement("link")
      link.id = stylesheetId
      link.rel = "stylesheet"
      link.href = appBase + "libs/fonts/lxgw_font.css"
      link.addEventListener("load", () => document.documentElement.setAttribute(fontMode, "enhanced"), { once: true })
      link.addEventListener("error", () => {
        link.remove()
        console.error("[viewer-font-mode] failed to load", link.href)
      }, { once: true })
      document.head.appendChild(link)
    }
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(loadStylesheet, { timeout: 2000 })
    } else {
      window.setTimeout(loadStylesheet, 0)
    }
  })
})
