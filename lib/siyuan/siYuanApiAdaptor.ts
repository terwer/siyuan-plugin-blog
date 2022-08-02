import {IApi} from "../api";
import {getBlockByID} from "./siYuanApi";
import {Post} from "../common/post";

/**
 * 思源笔记API适配器
 */
export class SiYuanApiAdaptor implements IApi {
    async getRecentPosts(numOfPosts: number): Promise<Array<any>> {
        let result = []

        // 本地测试
        let pageId = "20220724172444-16a2oc1"

        let page = await getBlockByID(pageId)
        if (page) {
            // 适配公共属性
            let commonPost = new Post()
            commonPost.postid = page.id
            commonPost.title = page.content
            result.push(commonPost)
        }
        return Promise.resolve(result);
    }
}