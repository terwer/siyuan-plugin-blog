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

/**
 * 浏览器工具类
 *
 * @public
 * @author terwer
 * @since 1.0.2
 */
class BrowserUtil {
  /**
   * 是否在浏览器环境
   */
  public static isNode = typeof process !== "undefined"

  /**
   * 是否在浏览器环境
   */
  public static isInBrowser = typeof window !== "undefined"

  /**
   * 浏览器路径分隔符
   */
  public static BrowserSeperator = "/"

  /**
   * 是否是Electron环境
   */
  public static isElectron = () => {
    if (!BrowserUtil.isInBrowser || !window.navigator || !window.navigator.userAgent) {
      return false
    }

    return /Electron/.test(window.navigator.userAgent)
  }

  /**
   * 是否有Node环境，目前包括 Electron 和 Node
   */
  public static hasNodeEnv = () => {
    return BrowserUtil.isElectron() || BrowserUtil.isNode
  }

  /**
   * 检测是否运行在Chrome插件中
   */
  public static isInChromeExtension() {
    if (!BrowserUtil.isInBrowser) {
      return false
    }
    return window.location.href.indexOf("chrome-extension://") > -1
  }

  /**
   * 获取url参数
   *
   * @param sParam - 参数
   */
  public static getQueryString = (sParam: string): string => {
    if (!BrowserUtil.isInBrowser) {
      return ""
    }
    const sPageURL = window.location.search.substring(1)
    const sURLVariables = sPageURL.split("&")

    for (let i = 0; i < sURLVariables.length; i++) {
      const sParameterName = sURLVariables[i].split("=")
      if (sParameterName[0] === sParam) {
        return sParameterName[1]
      }
    }

    return ""
  }

  /**
   * 替换 URL 的参数
   * 思路：
   * 1. 使用了 URLSearchParams 对象来解析和构建 URL 查询参数。
   *
   * 2. 在处理包含 hash 片段的 URL 时使用了 split 函数将 URL 分成两部分：基本 URL 和 hash 片段。
   *
   * 3. 然后，再次使用 split 函数将基本 URL 分成两部分：路径和查询参数。
   *
   * 4. 将查询参数转换为 URLSearchParams 对象，然后设置指定的参数名和值。
   *
   * 5. 最后，使用 toString 函数将查询参数转换为字符串，并将其与路径组合成新的基本 URL。如果 URL 包含 hash 片段，则将其添加到新的基本 URL 中。
   *
   * @param url - 链接地址
   * @param paramName - 参数名
   * @param paramValue - 参数值
   */
  public static replaceUrlParam = (url: string, paramName: string, paramValue: string): string => {
    if (paramValue == null) {
      paramValue = ""
    }
    const pattern = new RegExp("\\b(" + paramName + "=).*?(&|#|$)")
    if (url.search(pattern) >= 0) {
      return url.replace(pattern, "$1" + paramValue + "$2")
    }
    const [baseUrl, hash] = url.split("#")
    const [path, query] = baseUrl.split("?")
    const params = new URLSearchParams(query)
    params.set(paramName, paramValue)
    const newQuery = params.toString()
    const newBaseUrl = path + (newQuery ? "?" + newQuery : "")
    return hash ? newBaseUrl + "#" + hash : newBaseUrl
  }

  /**
   * 设置url参数
   *
   * @param urlstring - url
   * @param key - key
   * @param value - value
   */
  public static setUrlParameter = (urlstring: string, key: string, value: string): string => {
    // 已经有参数了，不重复添加
    if (urlstring.includes(key)) {
      return BrowserUtil.replaceUrlParam(urlstring, key, value)
    }

    const hasharr = urlstring.split("#") // 将 URL 和 hash 部分分开
    let url = hasharr[0]
    const hash = hasharr[1]

    if (url.includes("?")) {
      url += `&${key}=${value}` // URL 中已经有查询参数
    } else {
      url += `?${key}=${value}` // URL 中没有查询参数
    }

    // 如果有 hash 部分，则需要将其添加回 URL 中
    if (hash) {
      url += "#" + hash
    }

    return url
  }

  /**
   * 重新加载指定tab
   *
   * @param tabname - tabname
   * @param t - 延迟时间
   */
  public static reloadTabPage = (tabname: string, t = 200): void => {
    setTimeout(function () {
      if (BrowserUtil.isInBrowser) {
        const url = window.location.href
        window.location.href = BrowserUtil.setUrlParameter(url, "tab", tabname)
      }
    }, t)
  }

  /**
   * 刷新当前tab页面
   */
  public static reloadPage = (): void => {
    setTimeout(function () {
      if (BrowserUtil.isInBrowser) {
        window.location.reload()
      }
    }, 200)
  }

  /**
   * 刷新当前tab页面
   *
   * @param msg - 消息提示
   * @param cb - 回调
   */
  public static reloadPageWithMessageCallback = (msg: string, cb: any): void => {
    if (cb) {
      cb()
    }

    setTimeout(function () {
      if (BrowserUtil.isInBrowser) {
        window.location.reload()
      }
    }, 200)
  }
}

export default BrowserUtil
