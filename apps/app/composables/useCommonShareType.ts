/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2023-2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import { ShareTypeEnum } from "~/enums/ShareTypeEnum"

export const useCommonShareType = () => {
  // const logger = createAppLogger("use-common-share-type")
  // const { providerMode } = useProviderMode()
  // const { fetchConfig } = useAuthModeFetch()
  // const shareTypeJsonFile = "share-type.json"

  /**
   * 获取分享类型
   */
  // eslint-disable-next-line require-await
  const getShareType = async () => {
    // 6.1.0+ 之后不支持公共分享，只有静态分享类型
    return ShareTypeEnum.ShareType_Static
    // if (providerMode) {
    //   logger.info("providerMode is true, use static shareType")
    //   return ShareTypeEnum.ShareType_Static
    // }
    //
    // let resText = "{}"
    // try {
    //   resText = await fetchConfig(shareTypeJsonFile, providerMode)
    // } catch (e) {
    //   logger.error(`could not fetch share type from ${shareTypeJsonFile}`, e)
    // }
    //
    // const shareType = JsonUtil.safeParse(resText, {} as any)
    // logger.info("get shareType from store", shareType)
    //
    // if (ObjectUtil.isEmptyObject(shareType)) {
    //   return ShareTypeEnum.ShareType_Static
    // }
    //
    // return shareType.shareType
  }

  const isPrivateShare = async () => {
    const shareType = await getShareType()
    return shareType === ShareTypeEnum.ShareType_Static
  }

  return { isPrivateShare }
}
