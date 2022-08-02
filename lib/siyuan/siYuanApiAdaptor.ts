import {IApi} from "../api";
import {Post} from "../common/post";
import log from "../logUtil";

/**
 * 思源笔记API适配器
 */
export class SiYuanApiAdaptor implements IApi {
    async getRecentPosts(numOfPosts: number): Promise<Array<any>> {
        let result: any[] = []

        // const k = "js"
        // const siyuanPosts = await searchBlock(k)
        // log.logInfo(siyuanPosts)

        // for (let m = 0; m < siyuanPosts.length; m++) {
        //     const siyuanPost = siyuanPosts[0]
        //
        //     // 本地测试
        //     // const pageId = "20220724172444-16a2oc1"
        //     const pageId = siyuanPost.box
        //
        //     let page = await getBlockByID(pageId)
        //     if (page) {
        //         // 适配公共属性
        //         let commonPost = new Post()
        //         commonPost.postid = page.id
        //         commonPost.title = page.content
        //         result.push(commonPost)
        //     }
        // }

        return Promise.resolve(result);
    }
}