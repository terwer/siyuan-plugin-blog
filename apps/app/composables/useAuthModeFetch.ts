/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import {JsonUtil, StrUtil} from "zhi-common"
import {buildUrl} from "~/server/utils/urlUtils"
import {useSiyuanSPA} from "~/composables/useSiyuanSPA"
import {useRoute} from "#vue-router";

export const useAuthModeFetch = () => {
  const logger = createAppLogger("use-config-fetch")
  const { docId } = useDocId()
  // noinspection JSDeprecatedSymbols
  const isSSR = process.server
  const { isSiyuanSPA } = useSiyuanSPA()
  const env = useRuntimeConfig()

  /**
   * 获取文本
   *
   * @param filename - 获取相对于 public/siyuan-blog 目录的文本
   */
  const fetchPublicText = async (filename: string): Promise<string> => {
    const fetchFileUrl = `/public/siyuan-blog/${filename}`
    logger.info("getPublicFile in auth mode", fetchFileUrl)
    try {
      if (isSiyuanSPA) {
        const origin = window.location.origin
        logger.info("fetchPublicText via siyuan spa, origin=>", origin)
        const apiUrl = buildUrl(origin, fetchFileUrl)
        const res = (
          await $fetch(apiUrl)
        ) as any
        return JSON.stringify(res)
      } else {
        logger.info("fetchPublicText via endpoint")
        const res = (
          await $fetch("/api/endpoint", {
            method: "POST",
            body: JSON.stringify({
              url: fetchFileUrl
            })
          })
        ) as any
        return JSON.stringify(res)
      }
    } catch (e) {
      logger.error("fetchPublicText via endpoint error", e)
      throw e
    }
  }

  const fetchProviderConfigByResource = async (filename: string): Promise<string> => {
    const apiBase = env.public.providerUrl
    const url = "/api/settings/byResource"
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
    logger.info("fetch resource in provider mode finish=>", { resText })
    if (!res.ok) {
      throw new Error("fetch resource error")
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

  const fetchProviderConfigByAuthorForCurrentUser = async (author: string, filename: string): Promise<string> => {
    const apiBase = env.public.providerUrl
    const url = "/api/settings/byAuthor"
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
        author,
        key: filename,
      }),
    })
    resText = await res.text()
    logger.info("fetch config text in provider mode finish=>", { resText })
    if (!res.ok) {
      throw new Error("fetch provider config error")
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
    const url = "/api/settings/share"
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
        docId,
        key: filename,
      }),
    })
    resText = await res.text()
    logger.info("fetch config text in provider mode finish=>", { resText })
    if (!res.ok) {
      throw new Error("fetch provider config error")
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
   * 获取配置信息
   */
  const fetchConfig = async (filename: string, providerMode: boolean): Promise<string> => {
    let resText: string = ""
    if (providerMode) {
      logger.info(`fetch config text ${filename} in provider mode`)
      try {
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
    logger.info("finally resText by fetchConfig=>", { resText })
    // 存一份到客户端使用
    if (!isSSR) {
      window.localStorage.setItem(filename, resText)
    }
    return resText
  }

  // ===================================================================================================================

  /**
   * 远程获取文档元数据文本
   *
   * @param id - 文档 ID
   */
  const fetchProviderPostMeta = async (id: string): Promise<string> => {
    const apiBase = env.public.providerUrl
    const url = "/api/share/getDoc"
    const reqUrl = `${apiBase}${url}`
    const { query } = useRoute()
    const params: any = {
      fdId: id
    }
    if(query.key){
        params.fdKey = query.key
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
        // const dataJson = JSON.parse(resJson.data)
        // resText = JSON.stringify(dataJson.post)
        resText = resJson.data
      } else {
        logger.error("doc fetch error=>" + resJson.msg)
        throw new Error("doc fetch error=>" + resJson.msg)
      }
    } catch (e) {
      logger.error(`fetch provider config ${reqUrl}`, e)
      throw e
    }
    return resText
  }

  const validatePassword = async (id: string, password: string, encryptPassword: string): Promise<{
      flag: boolean,
      msg: string,
      data:string
  }> => {
      const apiBase = env.public.providerUrl
      const url = "/api/share/validatePassword"
      const reqUrl = `${apiBase}${url}`
      const params = {
          docId: id,
          password,
          encryptPassword
      }
      let resJson = {
          flag: false,
          msg: "password not valid",
          data: ""
      }
      try {
          const res = await fetch(reqUrl, {
              headers: {
                  "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify(params),
          })
          const valiJson = await res.json()
          if (valiJson.code === 0) {
              resJson.flag = true
              resJson.data = valiJson.data
          } else {
              logger.error("password validate error=>" + resJson.msg)
              throw new Error("password validate error=>" + resJson.msg)
          }
      }catch (e) {
          logger.error("password validate failed", e)
      }
      return resJson
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

  return {
    fetchConfig,
    fetchPostMeta,
    validatePassword
  }
}
