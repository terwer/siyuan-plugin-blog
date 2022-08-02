import {IApi} from "../api";
import {Post} from "../common/post";

/**
 * 博客园的API适配器
 */
export class MetaWeblogApiAdaptor implements IApi {
    protected metaWeblog: any
    protected username: string
    protected password: string
    protected appkey: string

    constructor() {
        this.metaWeblog = null;
        this.username = ""
        this.password = ""
        this.appkey = ""
    }

    /**
     * getRecentPosts
     * https://codex.wordpress.org/XML-RPC_MetaWeblog_API#metaWeblog.getRecentPosts
     * @param numOfPosts
     */
    public async getRecentPosts(numOfPosts: number): Promise<Array<any>> {
        let result: Array<Post> = []
        const cnblogsPosts = await this.metaWeblog.getRecentPosts(this.appkey, this.username, this.password, numOfPosts);
        for (let i = 0; i < cnblogsPosts.length; i++) {
            const cnblogsPost = cnblogsPosts[i]

            // 适配公共属性
            let commonPost = new Post()
            commonPost.title = cnblogsPost.title
            result.push(commonPost)
        }

        return result;
    }
}