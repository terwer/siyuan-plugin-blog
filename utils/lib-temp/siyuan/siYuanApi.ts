import Env from "zhi-env"
import ZhiUtil from "~/utils/zhiUtil"
import { DefaultLogger } from "zhi-log"

/**
 * 思源API v2.0.27
 *
 * @author terwer
 * @date 2022-08-02 23:17
 *
 * https://github.com/siyuan-note/siyuan/blob/master/API_zh_CN.md#%E9%89%B4%E6%9D%83
 */
export class SiYuanApi {
  private readonly env: Env
  private readonly logger: DefaultLogger

  constructor(nuxtEnv: any) {
    this.env = new Env(nuxtEnv)

    const zhiSdk = ZhiUtil.zhiSdk(this.env)
    this.logger = zhiSdk.getLogger()
  }

  /**
   * 分页获取根文档
   * @param page 页码
   * @param pagesize 数目
   * @param keyword 关键字
   */
  public async getRootBlocks(page: number, pagesize: number, keyword: string) {
    const stmt = `SELECT b.content, tmp.root_id
                FROM (SELECT DISTINCT root_id
                      FROM blocks
                      WHERE 1 = 1
                        AND content LIKE '%${keyword}%'
                      ORDER BY created DESC LIMIT ${page}, ${pagesize}) tmp,
                     blocks b
                WHERE tmp.root_id = b.root_id
                  AND b.parent_id = ''
                ORDER BY b.created DESC`
    return await this.sql(stmt)
  }

  /**
   * 获取块属性
   * @param blockId
   */
  public async getBlockAttrs(blockId: string) {
    const data = {
      id: blockId,
    }
    const url = "/api/attr/getBlockAttrs"
    return this.siyuanRequest(url, data)
  }

  /**
   * 设置块属性
   * @param blockId
   * @param attrs
   */
  public async setBlockAttrs(blockId: string, attrs: any) {
    const url = "/api/attr/setBlockAttrs"
    return this.siyuanRequest(url, {
      id: blockId,
      attrs: attrs,
    })
  }

  /**
   * 以id获取思源块信息
   * @param blockId 内容块ID
   */
  public async getBlockByID(blockId: string) {
    const stmt = `select *
                from blocks
                where id = '${blockId}'`
    const data = await this.sql(stmt)
    return data[0]
  }

  /**
   * 以slug获取思源块信息
   * @param slug 内容块别名
   */
  public async getBlockBySlug(slug: string) {
    const stmt = `select root_id from attributes 
               where name='custom-slug' and value='${slug}' 
               limit 1`
    const data = await this.sql(stmt)
    return data[0]
  }

  /**
   * 导出markdown文本
   * @param docId 文档id
   */
  public async exportMdContent(docId: string) {
    const data = {
      id: docId,
    }
    const url = "/api/export/exportMdContent"
    return this.siyuanRequest(url, data)
    //文档hepath与Markdown 内容
  }

  /**
   * 向思源请求数据
   * @param url url
   * @param data 数据
   * @param method 请求方法 GET | POST
   * @param useToken 权限TOKEN
   */
  private async siyuanRequest(url: string, data: any, method?: string, useToken?: boolean) {
    if (this.env.getStringEnv("VITE_SIYUAN_API_URL") != "") {
      url = this.env.getStringEnv("VITE_SIYUAN_API_URL") + url
    }

    let m = "POST"
    if (method) {
      m = method
    }

    const fetchOps = {
      body: JSON.stringify(data),
      method: m,
    }
    if (useToken != false) {
      Object.assign(fetchOps, {
        headers: {
          Authorization: `Token ${this.env.getStringEnv("VITE_SIYUAN_AUTH_TOKEN")}`,
        },
      })
    }

    this.logger.debug("向思源请求数据，url=>", url)
    this.logger.debug("向思源请求数据，fetchOps=>", fetchOps)
    const response = await fetch(url, fetchOps)
    const result = await response.json()
    this.logger.debug("向思源请求数据，result=>", result)
    return result.code === 0 ? result.data : null
  }

  /**
   * 以sql发送请求
   * @param sql sql
   */
  private async sql(sql: string) {
    const sqldata = {
      stmt: sql,
    }
    const url = "/api/query/sql"
    return this.siyuanRequest(url, sqldata)
  }
}
