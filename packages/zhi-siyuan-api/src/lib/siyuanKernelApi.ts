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

import Env from "zhi-env"
import SiyuanConfig from "./siyuanConfig"
import LogFactory, { DefaultLogger, EnvHelper, LogLevelEnum } from "zhi-log"
import { name, version } from "../../package.json"
import ZhiCommon from "zhi-common"
import SiyuanConstants from "./siyuanConstants"
import ISiyuanKernelApi, { type SiyuanData } from "./ISiyuanKernelApi"

/**
 * 思源笔记服务端API v2.8.2
 *
 * 1. 均是 POST 方法
 *
 * 2. 需要带参的接口，参数为 JSON 字符串，放置到 body 里，标头 Content-Type 为 application/json
 *
 * 3. 鉴权：在 `设置` - `关于` 里查看 API token，请求标头：Authorization: Token xxx
 *
 * @public
 * @author terwer
 * @since 1.0.0
 * @see {@link https://github.com/siyuan-note/siyuan/blob/master/API_zh_CN.md#%E9%89%B4%E6%9D%83 siyuan-api}
 * @see {@link https://github.com/leolee9086/noob-core/blob/master/frontEnd/noobApi/util/kernelApi.js kernelApi}
 */
class SiyuanKernelApi implements ISiyuanKernelApi {
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
   * 列出笔记本
   */
  public async lsNotebooks(): Promise<SiyuanData> {
    return await this.siyuanRequest("/api/notebook/lsNotebooks", {})
  }

  /**
   * 打开笔记本
   *
   * @param notebookId - 笔记本ID
   */
  public async openNotebook(notebookId: string): Promise<SiyuanData> {
    return await this.siyuanRequest("/api/notebook/openNotebook", {
      notebook: notebookId,
    })
  }

  /**
   * 关闭笔记本
   *
   * @param notebookId - 笔记本ID
   */
  public async closeNotebook(notebookId: string): Promise<SiyuanData> {
    return await this.siyuanRequest("/api/notebook/closeNotebook", {
      notebook: notebookId,
    })
  }

  /**
   * 重命名笔记本
   *
   * @param notebookId - 笔记本ID
   * @param name - 新笔记本名称
   */
  public async renameNotebook(notebookId: string, name: string): Promise<SiyuanData> {
    return await this.siyuanRequest("/api/notebook/renameNotebook", {
      notebook: notebookId,
      name: name,
    })
  }

  /**
   * 分页获取根文档
   *
   * @param keyword - 关键字
   */
  public async getRootBlocksCount(keyword: string): Promise<number> {
    const stmt = `SELECT COUNT(DISTINCT b1.root_id) as count
        FROM blocks b1
        WHERE 1 = 1
        AND (b1.root_id ='${keyword}' OR (b1.content LIKE '%${keyword}%') OR (b1.tag LIKE '%${keyword}%')
    )`
    const data = (await this.sql(stmt)) as any[]
    this.logger.debug("getRootBlocksCount data=>", data[0].count)
    return data[0].count
  }

  /**
   * 以sql发送请求
   *
   * @param sql - sql
   */
  public async sql(sql: string): Promise<SiyuanData["data"]> {
    const sqldata: { stmt: string } = {
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
  public async siyuanRequest(url: string, data: object): Promise<SiyuanData> {
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
