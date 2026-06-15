/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2026 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

type LinkHoverPreviewConfig = {
  enabled: boolean
  stickyDefault: boolean
  closeShortcut: string
  hoverDelay: number
  width: number
  height: number
  maxWidth: number
  maxHeightRatio: number
  sameOriginOnly: boolean
  timeoutMs: number
  showTitle: boolean
}

const DEFAULT_CONFIG: LinkHoverPreviewConfig = {
  enabled: true,
  stickyDefault: false,
  closeShortcut: "Escape",
  hoverDelay: 150,
  width: 460,
  height: 360,
  maxWidth: 560,
  maxHeightRatio: 0.7,
  sameOriginOnly: true,
  timeoutMs: 8000,
  showTitle: true,
}

const PREVIEW_CONTAINER_ID = "share-link-hover-preview"
const PREVIEW_QUERY = "preview"
const PREVIEW_FROM_QUERY = "from"
const PREVIEW_FROM_VALUE = "hoverPreview"
const INTERNAL_DOC_PATHS = new Set(["s", "x", "p", "post", "article", "doc", "d", "a", "static", "link"])

const mergeConfig = (raw: any): LinkHoverPreviewConfig => ({
  ...DEFAULT_CONFIG,
  ...(raw ?? {}),
  enabled: raw?.enabled !== false,
  stickyDefault: raw?.stickyDefault ?? DEFAULT_CONFIG.stickyDefault,
  showTitle: raw?.showTitle !== false,
})

const getStoredConfig = (): LinkHoverPreviewConfig => {
  try {
    const settingText = window.localStorage.getItem("static.app.config.json")
    const setting = settingText ? JSON.parse(settingText) : {}
    return mergeConfig(setting?.linkHoverPreview)
  } catch {
    return DEFAULT_CONFIG
  }
}

const getDocPath = (): string => {
  try {
    const settingText = window.localStorage.getItem("static.app.config.json")
    const setting = settingText ? JSON.parse(settingText) : {}
    return setting?.docPath || "s"
  } catch {
    return "s"
  }
}

const isEditableTarget = (target: EventTarget | null) => {
  const el = target instanceof HTMLElement ? target : null
  if (!el) {
    return false
  }
  return Boolean(el.closest("input, textarea, select, [contenteditable='true']"))
}

const isTouchLikeDevice = () => {
  return navigator.maxTouchPoints > 0 ||
    window.matchMedia?.("(hover: none)")?.matches === true ||
    window.matchMedia?.("(pointer: coarse)")?.matches === true
}

const isPreviewContext = () => {
  const params = new URLSearchParams(window.location.search)
  return params.get(PREVIEW_QUERY) === "1" || params.get(PREVIEW_FROM_QUERY) === PREVIEW_FROM_VALUE || window.self !== window.top
}

const isInternalDocUrl = (url: URL, anchor: HTMLAnchorElement) => {
  const config = getStoredConfig()
  if (config.sameOriginOnly && url.origin !== window.location.origin) {
    return false
  }

  if (anchor.dataset.shareDocLink === "true") {
    return true
  }

  const docPath = getDocPath()
  const segments = url.pathname.split("/").filter(Boolean)
  if (segments.length < 2) {
    return false
  }

  return segments[0] === docPath || INTERNAL_DOC_PATHS.has(segments[0])
}

const getPreviewUrl = (targetUrl: URL) => {
  const previewUrl = new URL(targetUrl.toString())
  previewUrl.searchParams.set(PREVIEW_QUERY, "1")
  previewUrl.searchParams.set(PREVIEW_FROM_QUERY, PREVIEW_FROM_VALUE)
  return previewUrl
}

export default defineNuxtPlugin((nuxtApp) => {
  if (!process.client || isPreviewContext()) {
    return
  }

  let config = getStoredConfig()
  if (!config.enabled) {
    return
  }

  let hoverTimer: number | null = null
  let loadTimer: number | null = null
  let closeTimer: number | null = null
  let currentAnchor: HTMLAnchorElement | null = null
  let originalUrl: URL | null = null
  let currentPreviewUrl: URL | null = null
  let container: HTMLDivElement | null = null
  let iframe: HTMLIFrameElement | null = null
  let statusEl: HTMLDivElement | null = null
  let openBtn: HTMLButtonElement | null = null
  let pinBtn: HTMLButtonElement | null = null
  let previewSticky = config.stickyDefault
  let lastTouchLikePointerAt = 0
  let dragState: {
    active: boolean
    pointerId: number | null
    offsetX: number
    offsetY: number
    handleEl: HTMLDivElement | null
  } = {
    active: false,
    pointerId: null,
    offsetX: 0,
    offsetY: 0,
    handleEl: null,
  }

  const clearHoverTimer = () => {
    if (hoverTimer) {
      window.clearTimeout(hoverTimer)
      hoverTimer = null
    }
  }

  const clearLoadTimer = () => {
    if (loadTimer) {
      window.clearTimeout(loadTimer)
      loadTimer = null
    }
  }

  const clearCloseTimer = () => {
    if (closeTimer) {
      window.clearTimeout(closeTimer)
      closeTimer = null
    }
  }

  const stopDrag = () => {
    const pointerId = dragState.pointerId
    const handleEl = dragState.handleEl
    if (pointerId !== null && handleEl) {
      try {
        handleEl.releasePointerCapture(pointerId)
      } catch {
        // ignore
      }
    }
    removeDragListeners()
    dragState.active = false
    dragState.pointerId = null
    dragState.handleEl = null
    document.body.style.userSelect = ""
    document.body.style.cursor = ""
    container?.classList.remove("share-link-preview--dragging")
  }

  const onDragMove = (event: PointerEvent) => {
    if (!dragState.active || event.pointerId !== dragState.pointerId || !container) {
      return
    }

    const left = event.clientX - dragState.offsetX
    const top = event.clientY - dragState.offsetY
    const margin = 8
    const rect = container.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const maxLeft = Math.max(margin, window.innerWidth - width - margin)
    const maxTop = Math.max(margin, window.innerHeight - height - margin)

    container.style.left = `${Math.min(Math.max(margin, left), maxLeft)}px`
    container.style.top = `${Math.min(Math.max(margin, top), maxTop)}px`
  }

  const onDragEnd = (event: PointerEvent) => {
    if (!dragState.active || event.pointerId !== dragState.pointerId) {
      return
    }

    event.preventDefault()
    stopDrag()
  }

  function removeDragListeners() {
    document.removeEventListener("pointermove", onDragMove, true)
    document.removeEventListener("pointerup", onDragEnd, true)
    document.removeEventListener("pointercancel", onDragEnd, true)
  }

  const setPreviewSticky = (sticky: boolean) => {
    previewSticky = sticky
    if (sticky) {
      clearCloseTimer()
    }
    container?.classList.toggle("share-link-preview--sticky", sticky)
    if (pinBtn) {
      pinBtn.setAttribute("aria-pressed", String(sticky))
      pinBtn.title = sticky ? "取消固定预览" : "固定预览"
      pinBtn.setAttribute("aria-label", sticky ? "取消固定预览" : "固定预览")
    }
  }

  const closePreview = () => {
    clearHoverTimer()
    clearLoadTimer()
    clearCloseTimer()
    stopDrag()
    currentAnchor = null
    originalUrl = null
    currentPreviewUrl = null
    if (container) {
      container.hidden = true
      container.classList.remove("share-link-preview--loading", "share-link-preview--error")
    }
    if (iframe) {
      iframe.removeAttribute("src")
    }
  }

  const scheduleClosePreview = () => {
    if (dragState.active) {
      return
    }
    clearCloseTimer()
    closeTimer = window.setTimeout(() => {
      if (!previewSticky) {
        closePreview()
      }
    }, 180)
  }

  const buildContainer = () => {
    const existing = document.getElementById(PREVIEW_CONTAINER_ID) as HTMLDivElement | null
    if (existing) {
      container = existing
      iframe = existing.querySelector("iframe")
      statusEl = existing.querySelector(".share-link-preview__status") as HTMLDivElement | null
      openBtn = existing.querySelector(".share-link-preview__open") as HTMLButtonElement | null
      pinBtn = existing.querySelector(".share-link-preview__pin") as HTMLButtonElement | null
      return existing
    }

    const root = document.createElement("div")
    root.id = PREVIEW_CONTAINER_ID
    root.className = "share-link-preview share-link-preview--loading"
    root.hidden = true
    root.innerHTML = `
      <div class="share-link-preview__bar">
        <span class="share-link-preview__title">预览</span>
        <div class="share-link-preview__actions">
          <button type="button" class="share-link-preview__open" title="打开全文">打开全文</button>
          <span class="share-link-preview__shortcut" title="按 Esc 键关闭预览" aria-hidden="true">Esc 关闭</span>
          <button type="button" class="share-link-preview__pin" title="固定预览" aria-label="固定预览" aria-pressed="false">📌</button>
          <button type="button" class="share-link-preview__close" title="关闭预览" aria-label="关闭预览，按 Esc 也可关闭">×</button>
        </div>
      </div>
      <div class="share-link-preview__body">
        <div class="share-link-preview__status">加载中...</div>
        <iframe class="share-link-preview__iframe" title="链接预览" loading="eager" referrerpolicy="same-origin"></iframe>
      </div>
    `

    const style = document.createElement("style")
    style.textContent = `
      .share-link-preview {
        position: fixed;
        z-index: 5000;
        width: min(var(--share-link-preview-width, 460px), calc(100vw - 24px));
        height: min(var(--share-link-preview-height, 360px), calc(100vh - 24px));
        max-width: min(var(--share-link-preview-max-width, 560px), calc(100vw - 24px));
        background: var(--b3-theme-background, var(--el-bg-color, #fff));
        color: var(--b3-theme-on-background, var(--el-text-color-primary, #303133));
        border: 1px solid rgba(0, 0, 0, 0.12);
        border-radius: 12px;
        box-shadow: 0 14px 40px rgba(15, 23, 42, 0.2);
        overflow: hidden;
      }
      .share-link-preview--dragging {
        cursor: move;
      }
      .share-link-preview[hidden] { display: none !important; }
      .share-link-preview__bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        height: 36px;
        padding: 0 8px 0 12px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        background: rgba(248, 250, 252, 0.96);
        box-sizing: border-box;
        cursor: move;
        user-select: none;
      }
      .share-link-preview__bar--drag-disabled {
        cursor: default;
      }
      .share-link-preview__title {
        flex: 1 1 auto;
        min-width: 0;
        font-size: 13px;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .share-link-preview__actions {
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .share-link-preview__open,
      .share-link-preview__pin,
      .share-link-preview__shortcut,
      .share-link-preview__close {
        border: 1px solid rgba(0, 0, 0, 0.12);
        background: #fff;
        color: #303133;
        border-radius: 7px;
        cursor: pointer;
        height: 24px;
        line-height: 22px;
        padding: 0 8px;
        font-size: 12px;
      }
      .share-link-preview__open,
      .share-link-preview__shortcut {
        white-space: nowrap;
      }
      .share-link-preview__pin {
        width: 24px;
        padding: 0;
        opacity: 0.56;
        filter: grayscale(1);
        font-size: 13px;
      }
      .share-link-preview--sticky .share-link-preview__pin {
        opacity: 1;
        filter: none;
        border-color: rgba(64, 158, 255, 0.42);
        background: rgba(64, 158, 255, 0.08);
      }
      .share-link-preview__shortcut {
        cursor: default;
        color: #606266;
        user-select: none;
      }
      .share-link-preview__close {
        width: 24px;
        padding: 0;
        font-size: 18px;
      }
      .share-link-preview__body { position: relative; width: 100%; height: calc(100% - 36px); }
      .share-link-preview__iframe { width: 100%; height: 100%; border: 0; display: block; background: #fff; }
      .share-link-preview__status {
        position: absolute;
        inset: 0;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 18px;
        text-align: center;
        font-size: 13px;
        color: #606266;
        background: #fff;
        z-index: 1;
      }
      .share-link-preview--loading .share-link-preview__status,
      .share-link-preview--error .share-link-preview__status { display: flex; }
      .share-link-preview--loading .share-link-preview__iframe,
      .share-link-preview--error .share-link-preview__iframe { opacity: 0; }
      @media (max-width: 520px) {
        .share-link-preview__shortcut { display: none; }
      }
      @media (max-width: 768px) {
        .share-link-preview {
          left: 8px !important;
          right: 8px !important;
          top: 8px !important;
          width: calc(100vw - 16px) !important;
          height: min(70vh, 520px) !important;
        }
        .share-link-preview__shortcut { display: none; }
      }
    `
    document.head.appendChild(style)
    document.body.appendChild(root)

    container = root
    iframe = root.querySelector("iframe")
    statusEl = root.querySelector(".share-link-preview__status") as HTMLDivElement | null
    openBtn = root.querySelector(".share-link-preview__open") as HTMLButtonElement | null
    pinBtn = root.querySelector(".share-link-preview__pin") as HTMLButtonElement | null

    root.querySelector(".share-link-preview__close")?.addEventListener("click", closePreview)
    pinBtn?.addEventListener("click", () => {
      setPreviewSticky(!previewSticky)
    })
    root.addEventListener("pointerenter", clearCloseTimer)
    root.addEventListener("pointerleave", () => {
      if (!previewSticky && !dragState.active) {
        scheduleClosePreview()
      }
    })
    const bar = root.querySelector(".share-link-preview__bar") as HTMLDivElement | null
    bar?.addEventListener("pointerdown", (event: PointerEvent) => {
      if (event.pointerType === "touch" || event.button !== 0 || !container) {
        return
      }

      const target = event.target instanceof Element ? event.target : null
      if (target?.closest(".share-link-preview__actions, button, a, input, textarea, select")) {
        return
      }

      const barRect = bar.getBoundingClientRect()
      clearCloseTimer()
      dragState.active = true
      dragState.pointerId = event.pointerId
      dragState.offsetX = event.clientX - barRect.left
      dragState.offsetY = event.clientY - barRect.top
      dragState.handleEl = bar
      container.classList.add("share-link-preview--dragging")
      document.body.style.userSelect = "none"
      document.body.style.cursor = "move"

      try {
        bar.setPointerCapture(event.pointerId)
      } catch {
        // ignore
      }

      document.addEventListener("pointermove", onDragMove, true)
      document.addEventListener("pointerup", onDragEnd, true)
      document.addEventListener("pointercancel", onDragEnd, true)
      event.preventDefault()
    })
    openBtn?.addEventListener("click", () => {
      let href = originalUrl?.toString() ?? currentPreviewUrl?.toString() ?? ""
      try {
        const iframeHref = iframe?.contentWindow?.location.href
        if (iframeHref) {
          const iframeUrl = new URL(iframeHref)
          iframeUrl.searchParams.delete(PREVIEW_QUERY)
          iframeUrl.searchParams.delete(PREVIEW_FROM_QUERY)
          href = iframeUrl.toString()
        }
      } catch {
        if (originalUrl) {
          href = originalUrl.toString()
        }
      }
      if (href) {
        window.open(href, "_blank", "noopener,noreferrer")
      }
    })

    return root
  }

  const positionPreview = (anchor: HTMLAnchorElement) => {
    if (!container) {
      return
    }
    const rect = anchor.getBoundingClientRect()
    const margin = 12
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const width = Math.min(config.width, config.maxWidth, viewportWidth - margin * 2)
    const height = Math.min(config.height, Math.floor(viewportHeight * config.maxHeightRatio), viewportHeight - margin * 2)

    container.style.setProperty("--share-link-preview-width", `${width}px`)
    container.style.setProperty("--share-link-preview-height", `${height}px`)
    container.style.setProperty("--share-link-preview-max-width", `${config.maxWidth}px`)

    let left = rect.left
    if (left + width + margin > viewportWidth) {
      left = viewportWidth - width - margin
    }
    left = Math.max(margin, left)

    let top = rect.bottom + 8
    if (top + height + margin > viewportHeight) {
      top = rect.top - height - 8
    }
    top = Math.max(margin, top)

    container.style.left = `${left}px`
    container.style.top = `${top}px`
  }

  const setPreviewError = (message: string) => {
    clearLoadTimer()
    if (!container || container.hidden) {
      return
    }
    container.classList.remove("share-link-preview--loading")
    container.classList.add("share-link-preview--error")
    if (statusEl) {
      statusEl.textContent = message
    }
  }

  const showPreview = (anchor: HTMLAnchorElement, url: URL) => {
    config = getStoredConfig()
    if (!config.enabled) {
      return
    }

    const root = buildContainer()
    const wasHidden = root.hidden
    currentAnchor = anchor
    originalUrl = url
    currentPreviewUrl = getPreviewUrl(url)
    setPreviewSticky(wasHidden ? config.stickyDefault : previewSticky)

    const title = anchor.textContent?.trim() || "预览"
    const titleEl = root.querySelector(".share-link-preview__title")
    if (titleEl) {
      titleEl.textContent = title
    }
    const bar = root.querySelector(".share-link-preview__bar")
    if (bar) {
      bar.classList.toggle("share-link-preview__bar--drag-disabled", isTouchLikeDevice())
    }

    root.hidden = false
    root.classList.add("share-link-preview--loading")
    root.classList.remove("share-link-preview--error")
    if (statusEl) {
      statusEl.textContent = "加载中..."
    }
    positionPreview(anchor)

    clearLoadTimer()
    loadTimer = window.setTimeout(() => {
      setPreviewError("预览加载超时或被安全策略阻止，请点击打开全文")
    }, config.timeoutMs)

    if (iframe) {
      iframe.onerror = () => {
        setPreviewError("预览被安全策略阻止，请点击打开全文")
      }
      iframe.onload = () => {
        try {
          const iframeDoc = iframe?.contentDocument || iframe?.contentWindow?.document
          const body = iframeDoc?.body
          if (!body || body.childElementCount === 0 && body.textContent?.trim() === "") {
            setPreviewError("预览内容为空，请点击打开全文")
            return
          }
        } catch {
          // 当前策略只允许同源内部链接；若仍不可读取，按安全策略阻止处理。
          setPreviewError("预览被安全策略阻止，请点击打开全文")
          return
        }
        clearLoadTimer()
        root.classList.remove("share-link-preview--loading", "share-link-preview--error")
      }
      iframe.src = currentPreviewUrl.toString()
    }
  }

  const findPreviewAnchor = (target: EventTarget | null) => {
    const el = target instanceof Element ? target : null
    const anchor = el?.closest?.(".protyle-wysiwyg a[href]") as HTMLAnchorElement | null
    if (!anchor) {
      return null
    }

    let url: URL
    try {
      url = new URL(anchor.href, window.location.href)
    } catch {
      return null
    }

    if (!isInternalDocUrl(url, anchor)) {
      return null
    }

    return { anchor, url }
  }

  const schedulePreview = (anchor: HTMLAnchorElement, url: URL) => {
    clearHoverTimer()
    clearCloseTimer()
    hoverTimer = window.setTimeout(() => showPreview(anchor, url), config.hoverDelay)
  }

  const onPointerOver = (event: PointerEvent) => {
    if (event.pointerType === "touch") {
      return
    }
    const matched = findPreviewAnchor(event.target)
    if (!matched) {
      return
    }
    schedulePreview(matched.anchor, matched.url)
  }

  const onPointerDown = (event: PointerEvent) => {
    if (event.pointerType !== "touch") {
      return
    }
    lastTouchLikePointerAt = Date.now()
    clearHoverTimer()
  }

  const onPointerOut = (event: PointerEvent) => {
    if (!currentAnchor && !hoverTimer) {
      return
    }
    const related = event.relatedTarget instanceof Node ? event.relatedTarget : null
    if (currentAnchor && related && (currentAnchor.contains(related) || container?.contains(related))) {
      return
    }
    clearHoverTimer()
    if (!previewSticky && !dragState.active) {
      scheduleClosePreview()
    }
  }

  const onFocusIn = (event: FocusEvent) => {
    if (isTouchLikeDevice() || Date.now() - lastTouchLikePointerAt < 800) {
      return
    }

    const matched = findPreviewAnchor(event.target)
    if (!matched) {
      return
    }
    schedulePreview(matched.anchor, matched.url)
  }

  const onKeyDown = (event: KeyboardEvent) => {
    if (!container || container.hidden) {
      return
    }

    const shortcut = getStoredConfig().closeShortcut || DEFAULT_CONFIG.closeShortcut
    const isEscape = event.key === "Escape"
    if (!isEscape && isEditableTarget(event.target)) {
      return
    }

    if (isEscape || event.key === shortcut) {
      event.preventDefault()
      closePreview()
    }
  }

  document.addEventListener("pointerover", onPointerOver, true)
  document.addEventListener("pointerdown", onPointerDown, true)
  document.addEventListener("pointerout", onPointerOut, true)
  document.addEventListener("focusin", onFocusIn, true)
  document.addEventListener("keydown", onKeyDown, true)

  nuxtApp.hook("page:start", () => {
    closePreview()
  })
})
