import {IApi} from "../api";
import {exportMdContent, getBlockAttrs, getBlockByID, getDoc, getRootBlocks} from "./siYuanApi";
import {Post} from "../common/post";
import {UserBlog} from "../common/userBlog";
import {API_TYPE_CONSTANTS} from "../constants";
import log from "../logUtil";
import {render} from "../markdownUtil";
import {removeWidgetTag} from "../htmlUtil";

/**
 * 思源笔记API适配器
 */
export class SiYuanApiAdaptor implements IApi {
    public async getUsersBlogs(): Promise<Array<UserBlog>> {
        let result: Array<UserBlog> = []
        // const data = await this.metaWeblog.getUsersBlogs(this.appkey, this.username, this.password);
        const userBlog = new UserBlog()
        userBlog.blogid = API_TYPE_CONSTANTS.API_TYPE_SIYUAN
        userBlog.blogName = API_TYPE_CONSTANTS.API_TYPE_SIYUAN
        userBlog.url = process.env.SIYUAN_API_URL || ""
        result.push(userBlog)

        return result;
    }

    public async getRecentPosts(numOfPosts: number, page: number): Promise<Array<any>> {
        let result: any[] = []

        let pg = 0
        if (page) {
            pg = page
        }
        const siyuanPosts = await getRootBlocks(pg, numOfPosts)
        // log.logInfo(siyuanPosts)

        for (let i = 0; i < siyuanPosts.length; i++) {
            const siyuanPost = siyuanPosts[i]

            // 适配公共属性
            let commonPost = new Post()
            commonPost.postid = siyuanPost.root_id
            commonPost.title = siyuanPost.content
            commonPost.permalink = "/post/" + siyuanPost.root_id + ".html"
            result.push(commonPost)
        }

        return Promise.resolve(result);
    }

    public async getPost(postid: string): Promise<any> {
        const siyuanPost = await getBlockByID(postid)
        if (!siyuanPost) {
            throw new Error("文章不存存在，postid=>" + postid)
        }

        const attr = await getBlockAttrs(postid)
        const md = await exportMdContent(postid)

        // 渲染Markdown
        let html = render(md.content)
        // 移除挂件html
        html = removeWidgetTag(html)

        // 适配公共属性
        let commonPost = new Post()
        commonPost.postid = siyuanPost.root_id
        commonPost.title = siyuanPost.content
        commonPost.description = html
        commonPost.mt_keywords = attr.tags
        // commonPost.dateCreated

        return commonPost
    }
}