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
import ZhiCommon from "zhi-common"
import SiyuanConstants from "./siyuanConstants"
import ISiyuanKernelApi, { type SiyuanData } from "./ISiyuanKernelApi"
import ZhiSiyuanApiUtil from "./ZhiSiyuanApiUtil"

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
  private readonly env: Env
  private readonly common: ZhiCommon
  public readonly siyuanConfig

  /**
   * 初始化思源服务端 API
   *
   * @param cfg - 环境变量 或者 配置项
   */
  constructor(cfg: Env | SiyuanConfig) {
    this.VERSION = "1.0.0"
    this.env = ZhiSiyuanApiUtil.zhiEnv()
    this.common = new ZhiCommon()

    if (cfg instanceof SiyuanConfig) {
      this.siyuanConfig = cfg

      this.logger = LogFactory.customLogFactory(LogLevelEnum.LOG_LEVEL_DEBUG, "zhi").getLogger("siyuan-kernel-api")
    } else {
      const env = cfg
      const logLevel = EnvHelper.getEnvLevel(env)
      const siyuanApiUrl = env.getStringEnv(SiyuanConstants.VITE_SIYUAN_API_URL_KEY)
      const siyuanApiToken = env.getStringEnv(SiyuanConstants.VITE_SIYUAN_AUTH_TOKEN_KEY)
      this.siyuanConfig = new SiyuanConfig(siyuanApiUrl, siyuanApiToken)

      this.logger = LogFactory.customLogFactory(logLevel, "siyuan-kernel-api", env).getLogger(SiyuanKernelApi.name)
    }
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
     * 分页获取根文档

     * ```sql
     * select DISTINCT b2.root_id,b2.parent_id,b2.content from blocks b2
     *        WHERE 1==1
     * AND b2.id IN (
     *     SELECT DISTINCT b1.root_id
     *        FROM blocks b1
     *        WHERE 1 = 1
     *        AND ((b1.content LIKE '%github%') OR (b1.tag LIKE '%github%'))
     *        ORDER BY b1.updated DESC,b1.created DESC LIMIT 0,10
     * )
     * ORDER BY b2.updated DESC,b2.created DESC
     * ```
     *
     * @param page 页码
     * @param pagesize 数目
     * @param keyword 可选，搜索关键字
     */
  public async getRootBlocks(page: number, pagesize: number, keyword: string): Promise<any> {
    const stmt = `select DISTINCT b2.root_id,b2.parent_id,b2.content from blocks b2
        WHERE 1==1
        AND b2.id IN (
             SELECT DISTINCT b1.root_id
                FROM blocks b1
                WHERE 1 = 1
                AND (b1.root_id ='${keyword}' OR (b1.content LIKE '%${keyword}%') OR (b1.tag LIKE '%${keyword}%'))
                ORDER BY b1.updated DESC,b1.created DESC LIMIT ${page * pagesize},${pagesize}
        )
        ORDER BY b2.updated DESC,b2.created DESC`
    return await this.sql(stmt)
  }

  /**
   * 获取该文档下面的子文档个数
   *
   * ```sql
   * SELECT COUNT(DISTINCT b1.root_id) AS count
   * FROM blocks b1
   * WHERE b1.path LIKE '%/20220927094918-1d85uyp%';
   * ```
   *
   * @param docId 文档ID
   */
  public async getSubdocCount(docId: string): Promise<number> {
    const stmt = `SELECT COUNT(DISTINCT b1.root_id) AS count
        FROM blocks b1
        WHERE b1.root_id='${docId}' OR b1.path LIKE '%/${docId}%'`
    const data = (await this.sql(stmt)) as any[]
    return data[0].count
  }

  /**
   * 分页获取子文档
   *
   * ```sql
   * SELECT DISTINCT b2.root_id,b2.content,b2.path FROM blocks b2
   * WHERE b2.id IN (
   *   SELECT DISTINCT b1.root_id
   *      FROM blocks b1
   *      WHERE b1.path like '%/20220927094918-1d85uyp%'
   *      AND ((b1.content LIKE '%文档%') OR (b1.tag LIKE '%文档%'))
   *      ORDER BY b1.updated DESC,b1.created DESC LIMIT 0,10
   * )
   * ORDER BY b2.updated DESC,b2.created DESC
   * ```
   *
   * @param docId 文档ID
   * @param page 页码
   * @param pagesize 数目
   * @param keyword 关键字
   */
  public async getSubdocs(docId: string, page: number, pagesize: number, keyword: string): Promise<any> {
    const stmt = `SELECT DISTINCT b2.root_id,b2.content,b2.path FROM blocks b2
        WHERE b2.id IN (
          SELECT DISTINCT b1.root_id
             FROM blocks b1
             WHERE b1.root_id='${docId}' OR b1.path like '%/${docId}%'
             AND ((b1.content LIKE '%${keyword}%') OR (b1.tag LIKE '%${keyword}%'))
             ORDER BY b1.updated DESC,b1.created DESC LIMIT ${page * pagesize},${pagesize}
        )
        ORDER BY b2.content,b2.updated DESC,b2.created DESC,id`

    this.logger.debug("siyuanApi getSubdocs sql=>", stmt)
    return await this.sql(stmt)
  }

  /**
   * 以id获取思源块信息
   * @param blockId 块ID
   */
  public async getBlockByID(blockId: string): Promise<any> {
    const stmt = `select *
                from blocks
                where id = '${blockId}'`
    const data = (await this.sql(stmt)) as any[]
    if (!data || data.length === 0) {
      throw new Error("通过ID查询块信息失败")
    }
    return data[0]
  }

  /**
   * 以slug获取思源块信息
   * @param slug 内容快别名
   */
  public async getRootBlockBySlug(slug: string): Promise<any> {
    const stmt = `select root_id from attributes where name='custom-slug' and value='${slug}' limit 1`
    const data = (await this.sql(stmt)) as any[]
    return data[0]
  }

  /**
   * 以内容块ID获取根块
   *
   * @param blockID 内容块ID
   */
  public async getRootBlock(blockID: string): Promise<any> {
    const stmt = `select root_id from blocks where id='${blockID}' limit 1`
    const data = (await this.sql(stmt)) as any[]
    return data[0]
  }

  /**
   * 导出markdown文本
   * @param docId 文档id
   */
  public async exportMdContent(docId: string): Promise<any> {
    const data = {
      id: docId,
    }
    const url = "/api/export/exportMdContent"
    return await this.siyuanRequest(url, data)
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
    if (this.env.isDev()) {
      this.logger.trace("sql=>", sql)
    }
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

    if (this.env.isDev()) {
      this.logger.trace("开始向思源请求数据，reqUrl=>", reqUrl)
      this.logger.trace("开始向思源请求数据，fetchOps=>", fetchOps)
    }

    const response = await fetch(reqUrl, fetchOps)
    const resJson = await response.json()
    if (this.env.isDev()) {
      this.logger.trace("思源请求数据返回，resJson=>", resJson)
    }

    if (resJson.code === -1) {
      throw new Error(resJson.msg)
    }
    return resJson.code === 0 ? resJson.data : null
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
   * 创建笔记本
   *
   * @param name - 新笔记本名称
   */
  public async createNotebook(name: string): Promise<SiyuanData> {
    return await this.siyuanRequest("/api/notebook/createNotebook", {
      name: name,
    })
  }

  /**
   * 删除笔记本
   *
   * @param notebookId - 笔记本ID
   */
  public async removeNotebook(notebookId: string): Promise<SiyuanData> {
    return await this.siyuanRequest("/api/notebook/removeNotebook", {
      notebook: notebookId,
    })
  }

  /**
   * 获取笔记本配置
   *
   * @param notebookId - 笔记本ID
   */
  public async getNotebookConf(notebookId: string): Promise<SiyuanData> {
    return await this.siyuanRequest("/api/notebook/getNotebookConf", {
      notebook: notebookId,
    })
  }

  /**
   * 保存笔记本配置
   *
   * ```json
   * {
   *   "notebook": "20210817205410-2kvfpfn",
   *   "conf": {
   *       "name": "测试笔记本",
   *       "closed": false,
   *       "refCreateSavePath": "",
   *       "createDocNameTemplate": "",
   *       "dailyNoteSavePath": "/daily note/{{now | date \"2006/01\"}}/{{now | date \"2006-01-02\"}}",
   *       "dailyNoteTemplatePath": ""
   *     }
   * }
   * ```
   * @param notebookConf - 笔记本配置
   */
  public async setNotebookConf(notebookConf: object): Promise<SiyuanData> {
    return await this.siyuanRequest("/api/notebook/setNotebookConf", notebookConf)
  }

  /**
   * 推送消息
   *
   * 参数
   *
   * ```json
   * {
   *   "msg": "test",
   *   "timeout": 7000
   * }
   * ```
   *
   * timeout：消息持续显示时间，单位为毫秒。可以不传入该字段，默认为 7000 毫秒
   *
   * 返回值
   *
   * ```
   * {
   *   "code": 0,
   *   "msg": "",
   *   "data": {
   *       "id": "62jtmqi"
   *   }
   * }
   *
   * id：消息 ID
   * ```
   *
   * @param msgObj 消息体
   */
  public async pushMsg(msgObj: object): Promise<SiyuanData> {
    return await this.siyuanRequest("/api/notification/pushMsg", msgObj)
  }

  /**
   * 推送报错消息
   *
   * 参数
   *
   * ```
   * {
   *   "msg": "test",
   *   "timeout": 7000
   * }
   * ```
   *
   * timeout：消息持续显示时间，单位为毫秒。可以不传入该字段，默认为 7000 毫秒
   *
   * 返回值
   *
   * ```
   * {
   *   "code": 0,
   *   "msg": "",
   *   "data": {
   *       "id": "qc9znut"
   *   }
   * }
   *
   * id：消息 ID
   * ```
   *
   * @param msgObj
   */
  public async pushErrMsg(msgObj: object): Promise<SiyuanData> {
    return await this.siyuanRequest("/api/notification/pushErrMsg", msgObj)
  }

  /**
   * 获取块属性
   * @param blockId
   */
  public async getBlockAttrs(blockId: string): Promise<any> {
    const data = {
      id: blockId,
    }
    const url = "/api/attr/getBlockAttrs"
    return await this.siyuanRequest(url, data)
  }

  /**
   * 设置块属性
   * @param blockId
   * @param attrs
   */
  public async setBlockAttrs(blockId: string, attrs: any): Promise<any> {
    const url = "/api/attr/setBlockAttrs"
    return await this.siyuanRequest(url, {
      id: blockId,
      attrs,
    })
  }
}

export default SiyuanKernelApi
