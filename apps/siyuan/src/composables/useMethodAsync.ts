/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import {showMessage} from "siyuan"
import {createAppLogger} from "../utils/appLogger.ts"

/**
 * 通用的可处理异常的方法-异步
 */
export const useMethodAsync = (pluginInstance: any) => {
  const logger = createAppLogger("use-method")

  const handleMethodAsync = async (methodCall: () => Promise<any>, errorHandler?: any) => {
    if (errorHandler) {
      if (!errorHandler()) {
        return
      }
    }

    try {
      await methodCall()
      showMessage("main.opt.success", 3000, "info")
    } catch (e) {
      logger.error("main.opt.failure", e)
      showMessage(`main.opt.failure${e}`, 7000, "error")
      throw e
    }
  }

  return {handleMethodAsync}
}
