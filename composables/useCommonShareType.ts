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

import { JsonUtil, ObjectUtil, StrUtil } from "zhi-common"
import { ShareType } from "~/models/ShareType"
import { ShareTypeEnum } from "~/enums/ShareTypeEnum"
import { createAppLogger } from "~/common/appLogger"
import { useSiyuanApi } from "~/composables/api/useSiyuanApi"

export const useCommonShareType = () => {
  const logger = createAppLogger("use-common-share-type")
  const { kernelApi } = useSiyuanApi()
  const route = useRoute()

  const fetchText = async (fileUrl: string) => {
    const res = await fetch(fileUrl)
    return await res.text()
  }

  /**
   * 获取分享类型
   */
  const getShareType = async () => {
    const shareTypeFetchFile = `/public/siyuan-blog/share-type.json`
    const resText = await fetchText(shareTypeFetchFile)
    logger.info("get shareType text from store", resText)
    const shareType = JsonUtil.safeParse(resText, {} as any)
    logger.info("get shareType from store", shareType)

    if (ObjectUtil.isEmptyObject(shareType)) {
      // 这时候需要再兼容历史数据
      const id = (route.params.id ?? "") as string
      const resPText = await fetchText(`/public/siyuan-blog/${id}.json`)
      if (StrUtil.isEmptyString(resPText)) {
        return ShareTypeEnum.ShareType_Public
      } else {
        return ShareTypeEnum.ShareType_Private
      }
    }

    if (shareType.shareType === "private") {
      return ShareTypeEnum.ShareType_Private
    }

    return shareType.shareType
  }

  const isPrivateShare = async () => {
    const shareType = await getShareType()
    return shareType === ShareTypeEnum.ShareType_Private
  }

  const updateShareType = async (shareType: ShareTypeEnum) => {
    const shareTypeFile = `/data/public/siyuan-blog/share-type.json`
    const sType = new ShareType()
    sType.shareType = shareType
    const sJson = JSON.stringify(sType) ?? "{}"
    await kernelApi.saveTextData(shareTypeFile, sJson)
    logger.info("inited shareType in public dir", sJson)
  }

  const removeShareType = async () => {
    const shareTypeFile = `/data/public/siyuan-blog/share-type.json`
    await kernelApi.removeFile(shareTypeFile)
  }

  return { getShareType, isPrivateShare, updateShareType, removeShareType }
}
