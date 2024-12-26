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

import {type StorageLikeAsync} from "@vueuse/core"
import {StrUtil} from "zhi-common"
import {useSiyuanApi} from "../../composables/useSiyuanApi.ts";
import {createAppLogger} from "../../utils/appLogger.ts";
import {ILogger} from "zhi-lib-base";
import {SiyuanKernelApi} from "zhi-siyuan-api";

/**
 * 通用存储实现，实现了 `StorageLikeAsync` 接口。
 * https://github.com/vueuse/vueuse/blob/main/packages/core/ssr-handlers.ts#L11
 *
 * @author terwer
 * @version 1.0.0
 * @since 1.0.0
 */
class CommonStorage implements StorageLikeAsync {
  private readonly logger: ILogger
  private readonly kernelApi: SiyuanKernelApi
  public readonly key: string

  constructor(storageKey: string) {
    this.logger = createAppLogger("common-storage")
    const {kernelApi} = useSiyuanApi()
    this.kernelApi = kernelApi
    this.key = storageKey
  }

  /**
   * 异步获取与给定键关联的值。
   *
   * @param key - 要获取值的键。
   * @returns 一个 Promise，它解析为与给定键关联的值，如果键不存在则解析为 `null`。
   */
  public async getItem(key: string): Promise<string | null> {
    this.logger.info(`Retrieving value for '${key}' from CommonStorage.`)
    let ret: string | null = null
    // 如果当前运行在思源笔记中，则直接返回 null
    try {
      ret = (await this.kernelApi.getFile(key, "text")) ?? ""
      this.logger.info(`Use SiYuan Api LocalStorageAdaptor to getItem - Retrieving '${key}', Value: ${ret}`)
    } catch (error) {
      this.logger.error(`Failed to get value for key '${key}' from SiYuan Api LocalStorageAdaptor. Error:`, error)
    }


    // 根据 ret 的值返回不同类型的结果
    if (StrUtil.isEmptyString(ret)) {
      ret = "{}"
    }
    this.logger.info(`Final getItem - '${key}', Value: '${ret}'`)
    return ret
  }

  /**
   * 异步删除与给定键关联的值
   *
   * @param key - 要删除值的键
   * @returns 一个 Promise，在删除值后解析
   */
  public async removeItem(key: string): Promise<void> {
    this.logger.info(`Removing value for ${key} from CommonStorage.`)
  }

  /**
   * 异步设置与给定键关联的值
   *
   * @param key - 要设置值的键
   * @param value - 给定键的新值
   * @returns 一个 Promise，在设置值后解析
   */
  public async setItem(key: string, value: string): Promise<void> {
    this.logger.info(`Setting value for '${key}' in CommonStorage to '${value}'.`)
    await this.kernelApi.saveTextData(key, value)
    this.logger.info(`Use SiYuan Api LocalStorageAdaptor to setItem - Key '${key}', Value: '${value}'`)
  }
}

export default CommonStorage
