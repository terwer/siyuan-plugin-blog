/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import {SiYuanApiAdaptor, SiyuanConfig, SiyuanKernelApi} from "zhi-siyuan-api"
import {createAppLogger} from "../utils/appLogger.ts"

/**
 * 通用 Siyuan API 封装
 */
export const useSiyuanApi = () => {
  const logger = createAppLogger("use-siyuan-api")

  const siyuanConfig = new SiyuanConfig(window.location.origin, "")
  const blogApi = new SiYuanApiAdaptor(siyuanConfig)
  const kernelApi = new SiyuanKernelApi(siyuanConfig)
  logger.debug("useSiyuanApi inited")

  return {
    blogApi,
    kernelApi
  }
}
