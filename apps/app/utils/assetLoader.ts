/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2026 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

const scriptLoadPromises = new Map<string, Promise<void>>()
const styleLoadPromises = new Map<string, Promise<void>>()

const resolveAssetUrl = (path: string) => {
  const appBase = process.env.APP_BASE ?? "/"
  const base = appBase.endsWith("/") ? appBase : `${appBase}/`
  return `${base}${path.replace(/^\/+/, "")}`
}

/**
 * 按需加载脚本，同一路径只加载一次。
 *
 * 用于把 Lute、ECharts、KaTeX 这类体积较大的库从首屏移出，
 * 只在页面真正需要时下载。
 */
export const loadScriptOnce = (path: string): Promise<void> => {
  if (!process.client) {
    return Promise.resolve()
  }

  const cached = scriptLoadPromises.get(path)
  if (cached) {
    return cached
  }

  const src = resolveAssetUrl(path)
  const absoluteSrc = new URL(src, window.location.href).href
  const promise = new Promise<void>((resolve, reject) => {
    const existing = Array.from(document.scripts).find((script) => script.src === absoluteSrc)
    if (existing) {
      resolve()
      return
    }

    const script = document.createElement("script")
    script.src = src
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
    document.head.appendChild(script)
  })

  scriptLoadPromises.set(path, promise)
  return promise
}

/**
 * 按需加载样式，同一路径只加载一次。
 */
export const loadStylesheetOnce = (path: string): Promise<void> => {
  if (!process.client) {
    return Promise.resolve()
  }

  const cached = styleLoadPromises.get(path)
  if (cached) {
    return cached
  }

  const href = resolveAssetUrl(path)
  const absoluteHref = new URL(href, window.location.href).href
  const promise = new Promise<void>((resolve, reject) => {
    const existing = Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')).find(
      (link) => link.href === absoluteHref,
    )
    if (existing) {
      resolve()
      return
    }

    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = href
    link.onload = () => resolve()
    link.onerror = () => reject(new Error(`Failed to load stylesheet: ${href}`))
    document.head.appendChild(link)
  })

  styleLoadPromises.set(path, promise)
  return promise
}
