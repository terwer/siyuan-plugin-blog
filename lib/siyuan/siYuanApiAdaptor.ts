import {IApi} from "../api";
import {getRootBlocks} from "./siYuanApi";
import {Post} from "../common/post";

/**
 * 思源笔记API适配器
 */
export class SiYuanApiAdaptor implements IApi {
    async getRecentPosts(numOfPosts: number): Promise<Array<any>> {
        let result: any[] = []

        const siyuanPosts = await getRootBlocks(0, numOfPosts)
        // log.logInfo(siyuanPosts)

        for (let i = 0; i < siyuanPosts.length; i++) {
            const siyuanPost = siyuanPosts[i]

            // 适配公共属性
            let commonPost = new Post()
            commonPost.postid = siyuanPost.root_id
            commonPost.title = siyuanPost.content
            result.push(commonPost)
        }

        return Promise.resolve(result);
    }
}