/*
 * Copyright (c) 2023, Terwer . All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Terwer designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Terwer in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Terwer, Shenzhen, Guangdong, China, youweics@163.com
 * or visit www.terwer.space if you need additional information or have any
 * questions.
 */

import { createAppLogger } from "~/common/appLogger"
import { useSiyuanApi } from "~/composables/api/useSiyuanApi"
import { JsonUtil, StrUtil } from "zhi-common"
import { isDev } from "~/common/Constants"

export const useAuthModeFetch = () => {
  const logger = createAppLogger("use-auth-mode-fetch")
  const { kernelApi } = useSiyuanApi()
  const env = useRuntimeConfig()
  const route = useRoute()
  const isSSR = process.server
  /**
   * 获取文本
   *
   * @param filename - 获取相对于 public/siyuan-blog 目录的文本
   */
  const fetchPublicText = async (filename: string) => {
    const shareTypeFetchFile = `/public/siyuan-blog/${filename}`
    logger.info("getPublicFile in auth mode", shareTypeFetchFile)
    return await kernelApi.getPublicFile(shareTypeFetchFile)
  }

  /**
   * 远程获取文档元数据文本
   *
   * @param id - 文档 ID
   */
  const fetchProviderPostMeta = async (id: string): Promise<string> => {
    const apiBase = env.public.providerUrl
    const url = "/api/share/getDoc"
    const reqUrl = `${apiBase}${url}`
    const params = {
      fdId: id,
    }
    let resText = "{}"
    try {
      const res = await fetch(reqUrl, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(params),
      })
      const resJson = await res.json()
      if (resJson.code === 0) {
        const dataJson = JSON.parse(resJson.data)
        resText = JSON.stringify(dataJson.post)
      } else {
        ElMessage.error("文档获取失败，错误信息如下=>" + resJson.msg)
      }
    } catch (e) {
      logger.error(`fetch provider config ${reqUrl}`, e)
    }
    return resText
  }

  /**
   * 远程获取配置文本
   *
   * @param filename - 文件名
   */
  const fetchProviderConfig = async (filename: string): Promise<string> => {
    const apiBase = env.public.providerUrl
    const url = `/settings/share/${filename}`
    const reqUrl = `${apiBase}${url}`
    let resText = ""
    try {
      const res = await fetch(reqUrl)
      resText = await res.text()
    } catch (e) {
      logger.error(`fetch provider config ${reqUrl}`, e)
    }
    return resText
  }

  /**
   * 远程获取配置文本
   *
   * @param docId - 文档ID
   * @param filename - 文件名
   */
  const fetchProviderConfigForCurrentUser = async (docId: string, filename: string): Promise<string> => {
    const apiBase = env.public.providerUrl
    const url = `/api/settings/share`
    const reqUrl = `${apiBase}${url}`
    let resText = ""
    logger.info(`fetch config text ${filename} in provider mode, reqUrl=>${reqUrl}`)
    const res = await fetch(reqUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        group: "GENERAL",
        docId: docId,
        key: filename,
      }),
    })
    resText = await res.text()
    logger.info("fetch config text in provider mode finish=>", { resText: resText })
    if (!res.ok) {
      throw new Error("fetch provider config error")
    }
    return resText
  }

  const fetchProviderConfigByAuthorForCurrentUser = async (author: string, filename: string): Promise<string> => {
    const apiBase = env.public.providerUrl
    const url = `/api/settings/byAuthor`
    const reqUrl = `${apiBase}${url}`
    let resText = ""
    logger.info(`fetch config text ${filename} in provider mode, reqUrl=>${reqUrl}`)
    const res = await fetch(reqUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        group: "GENERAL",
        author: author,
        key: filename,
      }),
    })
    resText = await res.text()
    logger.info("fetch config text in provider mode finish=>", { resText: resText })
    if (!res.ok) {
      throw new Error("fetch provider config error")
    }
    return resText
  }

  const fetchProviderConfigByResource = async (filename: string): Promise<string> => {
    const apiBase = env.public.providerUrl
    const url = `/api/settings/byResource`
    const reqUrl = `${apiBase}${url}`
    let resText = ""
    logger.info(`fetch resource ${filename} in provider mode, reqUrl=>${reqUrl}`)
    const res = await fetch(reqUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: filename,
      }),
    })
    resText = await res.text()
    logger.info("fetch resource in provider mode finish=>", { resText: resText })
    if (!res.ok) {
      throw new Error("fetch resource error")
    }
    return resText
  }

  const fetchPostMeta = async (id: string, providerMode: boolean): Promise<string> => {
    let resText: string
    if (providerMode) {
      logger.info("fetch text in provider mode")
      resText = await fetchProviderPostMeta(id)
    } else {
      logger.info("fetch text in normal mode")
      const filename = `${id}.json`
      resText = await fetchPublicText(filename)
    }
    return resText
  }

  const getAuthorByDomainWhiteList = async (): Promise<string> => {
    // 先查找 domain 白名单
    const domainsFile = isDev ? "domains.local.json" : "domains.json"
    const domainsText = await fetchProviderConfigByResource(domainsFile)
    const domainsJson = JsonUtil.safeParse<any>(domainsText, {})
    const domains = domainsJson.domains ?? []
    // 获取当前页面的 origin
    // https://stackoverflow.com/a/77175631/4037224
    const requestURL = useRequestURL()
    const currentOrigin = StrUtil.isEmptyString(requestURL.origin) ? window.location.origin : requestURL.origin
    logger.info("current origin=>", currentOrigin)
    // 查找匹配的 domain 并获取 author
    const matchedDomain = domains.find((domain: any) => domain.domain === currentOrigin)
    return matchedDomain ? matchedDomain.author : null
  }

  const fetchConfig = async (filename: string, providerMode: boolean): Promise<string> => {
    console.log("providerMode=>", providerMode)
    let resText: string
    if (providerMode) {
      logger.info(`fetch config text ${filename} in provider mode`)
      try {
        const docId = (route.params.id ?? "") as string
        if (docId == "") {
          // 首页
          const whiteListAuthor = await getAuthorByDomainWhiteList()
          if (whiteListAuthor) {
            logger.info("use author from domain white list for home page")
            resText = await fetchProviderConfigByAuthorForCurrentUser(whiteListAuthor, filename)
          } else {
            logger.info("use default author for home page")
            resText = await fetchProviderConfigForCurrentUser(docId, filename)
          }
        } else {
          resText = await fetchProviderConfigForCurrentUser(docId, filename)
        }

        logger.info("success fetch config in  provider mode")
      } catch (e) {
        logger.warn("cannot find setting for current user, use default")
        resText = await fetchProviderConfig(filename)
      }
    } else {
      logger.info(`fetch config text ${filename} in normal mode`)
      resText = await fetchPublicText(filename)
    }
    logger.info("finally resText by fetchConfig=>", { resText: resText })
    // 存一份到客户端使用
    if (!isSSR) {
      window.localStorage.setItem(filename, resText)
    }
    return resText
  }

  return { fetchPostMeta, fetchConfig }
}
