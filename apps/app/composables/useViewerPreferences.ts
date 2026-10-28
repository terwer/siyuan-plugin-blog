/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2026 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import { reactive, readonly } from "vue"

const VIEWER_PREFERENCES_STORAGE_KEY = "siyuan-blog-viewer-preferences"

export interface ViewerPreferences {
  /** 是否允许鼠标悬停在文档链接上时显示内容预览 */
  linkHoverPreview: boolean
  /** 是否显示标题下方的文档信息栏（日期、更新时间、阅读时长） */
  postMeta: boolean
}

const DEFAULT_PREFERENCES: ViewerPreferences = {
  // 悬浮预览与文档信息栏都默认关闭，有需要的用户可以在“阅读偏好”里手动开启
  linkHoverPreview: false,
  postMeta: false,
}

const preferencesState = reactive<ViewerPreferences>({ ...DEFAULT_PREFERENCES })

let initialized = false

const readStoredPreferences = () => {
  if (!process.client) {
    return
  }

  try {
    const raw = window.localStorage.getItem(VIEWER_PREFERENCES_STORAGE_KEY)
    if (!raw) {
      return
    }

    const parsed = JSON.parse(raw)
    applyStoredPreferences(parsed)
  } catch {
    // 本地存储不可用或内容损坏时保持默认值
  }
}

const applyStoredPreferences = (parsed: any) => {
  if (typeof parsed?.linkHoverPreview === "boolean") {
    preferencesState.linkHoverPreview = parsed.linkHoverPreview
  }
  if (typeof parsed?.postMeta === "boolean") {
    preferencesState.postMeta = parsed.postMeta
  }
}

const persistPreferences = () => {
  if (!process.client) {
    return
  }

  try {
    window.localStorage.setItem(
      VIEWER_PREFERENCES_STORAGE_KEY,
      JSON.stringify({
        linkHoverPreview: preferencesState.linkHoverPreview,
        postMeta: preferencesState.postMeta,
      }),
    )
  } catch {
    // 本地存储不可用时仅在当前页面生效
  }
}

const ensureInitialized = () => {
  if (!process.client || initialized) {
    return
  }

  initialized = true
  readStoredPreferences()

  window.addEventListener("storage", (event) => {
    if (event.key !== VIEWER_PREFERENCES_STORAGE_KEY || !event.newValue) {
      return
    }

    try {
      const parsed = JSON.parse(event.newValue)
      applyStoredPreferences(parsed)
    } catch {
      // 忽略其他标签页写入的非法内容
    }
  })
}

/**
 * 查看页的浏览器端偏好设置。
 *
 * 只保存在当前浏览器的 localStorage 中，不写入分享配置，换浏览器会恢复默认值。
 */
export const useViewerPreferences = () => {
  ensureInitialized()

  const setLinkHoverPreview = (enabled: boolean) => {
    preferencesState.linkHoverPreview = enabled
    persistPreferences()
  }

  const setPostMeta = (enabled: boolean) => {
    preferencesState.postMeta = enabled
    persistPreferences()
  }

  return {
    preferences: readonly(preferencesState),
    setLinkHoverPreview,
    setPostMeta,
  }
}
