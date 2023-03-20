import { IApi } from "~/utils/lib-temp/api"
import { SiYuanApi } from "~/utils/lib-temp/siyuan/siYuanApi"
import { UserBlog } from "~/utils/lib-temp/common/userBlog"
import Env from "zhi-env"
import ZhiUtil from "~/utils/zhiUtil"
import { DefaultLogger } from "zhi-log"
import { API_TYPE_CONSTANTS } from "~/utils/lib-temp/constants"
import { removeTitleNumber, removeWidgetTag } from "~/utils/lib-temp/htmlUtil"
import { Post } from "~/utils/lib-temp/common/post"
import { renderHTML } from "~/utils/lib-temp/markdownUtil"

/**
 * 思源笔记API适配器
 */
export class SiYuanApiAdaptor implements IApi {
  private readonly env: Env
  private readonly logger: DefaultLogger
  private readonly siyuanApi: SiYuanApi

  constructor(nuxtEnv: any) {
    this.env = new Env(nuxtEnv)

    const zhiSdk = ZhiUtil.zhiSdk(this.env)
    this.logger = zhiSdk.getLogger()

    this.siyuanApi = new SiYuanApi(nuxtEnv)
  }

  public async getUsersBlogs(): Promise<Array<UserBlog>> {
    const result: Array<UserBlog> = []
    // const data = await this.metaWeblog.getUsersBlogs(this.appkey, this.username, this.password);
    const userBlog = new UserBlog()
    userBlog.blogid = API_TYPE_CONSTANTS.API_TYPE_SIYUAN
    userBlog.blogName = API_TYPE_CONSTANTS.API_TYPE_SIYUAN
    userBlog.url = this.env.getStringEnv("VITE_SIYUAN_API_URL")
    result.push(userBlog)

    return result
  }

  public async getRecentPosts(numOfPosts: number, page: number, keyword?: string): Promise<Array<any>> {
    const result: any[] = []

    let pg = 0
    if (page) {
      pg = page
    }
    const k = keyword || ""
    const siyuanPosts: any = await this.siyuanApi.getRootBlocks(pg, numOfPosts, k)
    // log.logInfo(siyuanPosts)

    for (let i = 0; i < siyuanPosts.length; i++) {
      const siyuanPost = siyuanPosts[i]

      // 某些属性详情页控制即可
      const attrs: any = await this.siyuanApi.getBlockAttrs(siyuanPost.root_id)

      // // 发布状态
      // let isPublished = true
      // const publishStatus = attrs["custom-publish-status"] || "draft"
      // if (publishStatus == "secret") {
      //     isPublished = false;
      // }
      //
      // // 访问密码
      // const postPassword = attrs["custom-publish-password"] || ""

      // 文章别名
      const customSlug = attrs["custom-slug"] || ""

      let title = siyuanPost.content || ""
      title = removeTitleNumber(title)

      // 适配公共属性
      const commonPost = new Post()
      commonPost.postid = siyuanPost.root_id
      commonPost.title = title
      commonPost.permalink = customSlug == "" ? "/post/" + siyuanPost.root_id : "/post/" + customSlug + ".html"
      // commonPost.isPublished = isPublished
      // commonPost.mt_keywords = attrs.tags || ""
      result.push(commonPost)
    }

    return Promise.resolve(result)
  }

  public async getPost(postid: string, useSlug?: boolean): Promise<any> {
    let pid = postid
    if (useSlug) {
      const pidObj: any = await this.siyuanApi.getBlockBySlug(postid)
      if (pidObj) {
        pid = pidObj.root_id
      }
    }
    const siyuanPost: any = await this.siyuanApi.getBlockByID(pid)
    if (!siyuanPost) {
      throw new Error("文章不存存在，postid=>" + pid)
    }

    const attrs: any = await this.siyuanApi.getBlockAttrs(pid)
    const md: any = await this.siyuanApi.exportMdContent(pid)

    // 发布状态
    let isPublished = true
    const publishStatus = attrs["custom-publish-status"] || "draft"
    if (publishStatus == "secret") {
      isPublished = false
    }

    // 访问密码
    const postPassword = attrs["custom-post-password"] || ""

    // 访问密码
    const shortDesc = attrs["custom-desc"] || ""

    // 渲染Markdown
    let html = renderHTML(md.content)
    // 移除挂件html
    html = removeWidgetTag(html)

    let title = siyuanPost.content || ""
    title = removeTitleNumber(title)

    // 适配公共属性
    const commonPost = new Post()
    commonPost.postid = siyuanPost.root_id || ""
    commonPost.title = title
    commonPost.description = html || ""
    commonPost.shortDesc = shortDesc || ""
    commonPost.mt_keywords = attrs.tags || ""
    commonPost.isPublished = isPublished
    commonPost.wp_password = postPassword
    // commonPost.dateCreated

    return commonPost
  }
}
