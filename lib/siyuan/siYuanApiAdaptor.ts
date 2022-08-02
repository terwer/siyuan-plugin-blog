import {IApi} from "../api";
import {getBlockByID} from "./siYuanApi";

export class SiYuanApiAdaptor implements IApi {
    async getRecentPosts(numOfPosts: number): Promise<Array<any>> {
        let result = []

        // 本地测试
        let pageId = "20220724172444-16a2oc1"

        let page = await getBlockByID(pageId)
        if (page) {
            result.push(page)
        }
        return Promise.resolve(result);
    }
}