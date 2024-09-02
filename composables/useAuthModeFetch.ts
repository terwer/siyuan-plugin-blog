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

export const useAuthModeFetch = () => {
  const logger = createAppLogger("use-auth-mode-fetch")
  const { kernelApi } = useSiyuanApi()

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
    return "{}"
  }

  /**
   * 远程获取配置文本
   *
   * @param id - 文档 ID
   */
  const fetchProviderConfig = async (id: string): Promise<string> => {
    return "{}"
  }

  const fetchPostMeta = async (id: string, providerMode: boolean): Promise<string> => {
    let resText = "{}"
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

  const fetchConfig = async (filename: string, providerMode: boolean): Promise<string> => {
    let resText = "{}"
    if (providerMode) {
      logger.info("fetch config text in provider mode")
      resText = await fetchProviderConfig(filename)
    } else {
      logger.info("fetch config text in normal mode")
      resText = await fetchPublicText(filename)
    }
    return resText
  }

  return { fetchPostMeta, fetchConfig }
}
