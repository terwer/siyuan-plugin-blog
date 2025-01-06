/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import { StrUtil } from "zhi-common"
import { useAppBase } from "~/composables/useAppBase"

/**
 * 获取基本地址的通用方法
 */
export const useBaseUrl = () => {
  const env = useRuntimeConfig()
  const { appBase } = useAppBase()

  const getHome = () => {
    const ssrHome = `${origin}`
    const siyuanStaticHome = `${origin}${appBase}#`
    return process.env.SSR === "true" ? ssrHome : siyuanStaticHome
  }

  const getOrigin = () => {
    return window.location.origin
  }

  const getClientBaseUrl = () => {
    const urlPrefix = env.public.siyuanApiUrl
    const origin = window.location.origin
    return StrUtil.isEmptyString(urlPrefix) ? origin : urlPrefix
  }

  const getServerBaseUrl = () => {
    return env.public.siyuanApiUrl
  }

  return { getHome, getOrigin, getClientBaseUrl, getServerBaseUrl }
}
