/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import { useBaseUrl } from "~/plugins/libs/renderer/useClientBaseUrl"

const INTERNAL_DOC_PATHS = new Set(["s", "x", "p", "post", "article", "doc", "d", "a", "static", "link"])

const normalizeDocPath = (docPath?: string) => {
  return docPath?.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean).pop() || "s"
}

const normalizeDocId = (id?: string | null) => {
  const normalizedId = id?.trim()
  if (!normalizedId || normalizedId === "#") {
    return null
  }
  return normalizedId.replace(/\.html?$/i, "")
}

const splitPathSegments = (path: string) => {
  return path
    .split("?")[0]
    .split("#")[0]
    .split("/")
    .map(segment => segment.trim())
    .filter(Boolean)
}

const extractDocIdFromSegments = (segments: string[], docPath: string) => {
  const docPaths = new Set([...INTERNAL_DOC_PATHS, normalizeDocPath(docPath)])
  if (!docPaths.has(segments[0]) || segments.length < 2) {
    return null
  }

  try {
    return normalizeDocId(decodeURIComponent(segments[1]))
  } catch {
    return normalizeDocId(segments[1])
  }
}

const extractDocIdFromHref = (href: string, docPath: string) => {
  const rawHref = href.trim()
  if (!rawHref || rawHref === "#") {
    return null
  }

  const hasExplicitProtocol = /^[a-z][a-z\d+.-]*:/i.test(rawHref)
  const isProtocolRelative = rawHref.startsWith("//")

  if (!hasExplicitProtocol && !isProtocolRelative && !rawHref.startsWith("?") && !rawHref.startsWith("#")) {
    const rawPathDocId = extractDocIdFromSegments(splitPathSegments(rawHref), docPath)
    if (rawPathDocId) {
      return rawPathDocId
    }
  }

  try {
    const url = new URL(rawHref, window.location.href)
    if (url.origin !== window.location.origin) {
      return null
    }

    const hashDocId = url.hash
      ? extractDocIdFromSegments(splitPathSegments(url.hash.slice(1)), docPath)
      : null
    if (hashDocId) {
      return hashDocId
    }

    const pathDocId = extractDocIdFromSegments(splitPathSegments(url.pathname), docPath)
    if (pathDocId) {
      return pathDocId
    }
  } catch {
    // 非标准 URL 继续按相对路径兜底处理。
  }

  // hash-only links are usually in-page anchors; only treat hash routes like #/s/:id as internal docs.
  if (rawHref.startsWith("#")) {
    return extractDocIdFromSegments(splitPathSegments(rawHref.slice(1)), docPath)
  }

  // query-only links inherit the current path in URL(), so never infer a doc id from them.
  if (rawHref.startsWith("?")) {
    return null
  }

  // Explicit protocols and protocol-relative URLs must have been handled by URL() above.
  if (hasExplicitProtocol || isProtocolRelative) {
    return null
  }

  return extractDocIdFromSegments(splitPathSegments(rawHref), docPath)
}

/**
 * 处理块链接
 */
export const useStaticBlockRef = () => {
  const logger = createAppLogger("use-block-ref")
  const { getHome } = useBaseUrl()

  // 尝试获取配置
  const getCfg = () => {
    const str = window.localStorage.getItem("static.app.config.json")
    if (str) {
      try {
        return JSON.parse(str)
      } catch (e) {
        return null
      }
    }
    return null
  }

  /**
   * 为思源原生 span 链接附加打开链接所需的元数据和事件。
   * span[data-type~=block-ref] / span[data-type~=a] 是正文样式的载体，
   * 保留其结构和原生属性，交互通过 data-* 与事件完成。
   */
  const makeNativeLinkInteractive = (el: HTMLElement, href: string, docId: string | null) => {
    el.dataset.shareHref = href
    el.dataset.shareDocLink = "true"
    el.setAttribute("role", "link")
    el.setAttribute("tabindex", "0")
    if (docId) {
      el.dataset.docId = docId
    }

    const open = (event: Event) => {
      event.preventDefault()
      window.open(href, "_blank", "noopener,noreferrer")
    }

    el.addEventListener("click", open)
    el.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        open(event)
      }
    })
  }

  // 保留 block-ref 原生 span，只附加点击行为
  const convertBlockRefLinks = (rootElement: any) => {
    const home = getHome()
    const cfg = getCfg()
    const urlPath = cfg?.docPath ?? "s"

    rootElement.querySelectorAll("span[data-type=\"block-ref\"]").forEach((el: HTMLElement) => {
      const id = normalizeDocId(el.getAttribute("data-id"))
      if (!id) {
        return
      }
      makeNativeLinkInteractive(el, `${home}/${urlPath}/${id}`, id)
    })
    logger.info("Attached click handlers to native block-ref spans")
  }

  // 保留 a 类型原生 span，只附加点击行为
  const convertALinks = (rootElement: any) => {
    const cfg = getCfg()
    const docPath = cfg?.docPath ?? "s"

    rootElement.querySelectorAll("span[data-type=\"a\"]").forEach((el: HTMLElement) => {
      const href = el.getAttribute("data-href") ?? "#"
      const docId = normalizeDocId(el.getAttribute("data-id")) ?? extractDocIdFromHref(href, docPath)
      makeNativeLinkInteractive(el, href, docId)
    })
    logger.info("Attached click handlers to native a spans")
  }

  // 组合上述函数，实现对所有类型为 "block-ref" 和 "a" 的 span 元素的转换
  const convertAllLinks = (rootElement: any) => {
    convertBlockRefLinks(rootElement)
    convertALinks(rootElement)
  }

  return { convertAllLinks }
}
