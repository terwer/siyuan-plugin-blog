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

import Env, { EnvConstants } from "zhi-env"
import SiyuanConfig from "./SiyuanConfig"
import LogFactory, { DefaultLogger, EnvHelper, LogConstants, LogLevelEnum } from "zhi-log"
import { name, version } from "../../package.json"
import ZhiCommon from "zhi-common"
import SiyuanConstants from "./SiyuanConstants"

/**
 * 思源笔记服务端API v2.0.27
 * https://github.com/siyuan-note/siyuan/blob/master/API_zh_CN.md#%E9%89%B4%E6%9D%83
 * https://github.com/leolee9086/noob-core/blob/master/frontEnd/noobApi/util/kernelApi.js
 *
 * @public
 * @author terwer
 * @since 1.0.0
 */
class SiyuanKernelApi {
  /**
   * 思源笔记服务端API版本号
   */
  public readonly VERSION

  private readonly logger: DefaultLogger
  private readonly common: ZhiCommon
  private readonly siyuanConfig

  /**
   * 初始化思源服务端 API
   *
   * @param cfg - 环境变量 或者 配置项
   */
  constructor(cfg: Env | SiyuanConfig) {
    this.VERSION = version
    this.common = new ZhiCommon()

    if (cfg instanceof SiyuanConfig) {
      this.siyuanConfig = cfg

      this.logger = LogFactory.customLogFactory(LogLevelEnum.LOG_LEVEL_DEBUG, name).getLogger(SiyuanKernelApi.name)
    } else {
      const env = cfg
      const logLevel = EnvHelper.getEnvLevel(env)
      const siyuanApiUrl = env.getStringEnv(SiyuanConstants.VITE_SIYUAN_API_URL_KEY)
      const siyuanApiToken = env.getStringEnv(SiyuanConstants.VITE_SIYUAN_AUTH_TOKEN_KEY)
      this.siyuanConfig = new SiyuanConfig(siyuanApiUrl, siyuanApiToken)

      this.logger = LogFactory.customLogFactory(logLevel, name, env).getLogger(SiyuanKernelApi.name)
    }
  }

  /**
   * 分页获取根文档
   * @param keyword 关键字
   */
  public async getRootBlocksCount(keyword: string): Promise<number> {
    const stmt = `SELECT COUNT(DISTINCT b1.root_id) as count
        FROM blocks b1
        WHERE 1 = 1
        AND (b1.root_id ='${keyword}' OR (b1.content LIKE '%${keyword}%') OR (b1.tag LIKE '%${keyword}%')
    )`
    const data = await this.sql(stmt)
    this.logger.debug("getRootBlocksCount data=>", data[0].count)
    return data[0].count
  }

  /**
   * 以sql发送请求
   * @param sql sql
   */
  public async sql(sql: string): Promise<any> {
    const sqldata = {
      stmt: sql,
    }
    const url = "/api/query/sql"
    this.logger.debug("sql=>", sql)
    return await this.siyuanRequest(url, sqldata)
  }

  /**
   * 向思源请求数据
   *
   * @param url - url
   * @param data - 数据
   */
  public async siyuanRequest(url: string, data: any): Promise<any> {
    const reqUrl = `${this.siyuanConfig.apiUrl}${url}`

    const fetchOps = {
      body: JSON.stringify(data),
      method: "POST",
    }
    if (!this.common.strUtil.isEmptyString(this.siyuanConfig.password)) {
      Object.assign(fetchOps, {
        headers: {
          Authorization: `Token ${this.siyuanConfig.password}`,
        },
      })
    }

    this.logger.debug("开始向思源请求数据，reqUrl=>", reqUrl)
    this.logger.debug("开始向思源请求数据，fetchOps=>", fetchOps)
    const response = await fetch(reqUrl, fetchOps)
    const resJson = await response.json()
    this.logger.debug("思源请求数据返回，resJson=>", resJson)

    if (resJson.code === -1) {
      throw new Error(resJson.msg)
    }
    return resJson.code === 0 ? resJson.data : null
  }
}

export default SiyuanKernelApi
