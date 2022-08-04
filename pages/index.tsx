import type {GetServerSideProps, NextPage} from 'next'
import {API} from "../lib/api";
import {API_TYPE_CONSTANTS} from "../lib/constants";
import {Post} from "../lib/common/post";
import DefaultLayout from "../components/themes/default/defaultLayout";
import SiteConfig from "../lib/common/siteconfig";

type Props = {
    type: string,
    layoutCfg: SiteConfig,
    posts: Post[]
}

const Home: NextPage<Props> = (props, context) => {
    return (
        <DefaultLayout props={props.layoutCfg}>
            <div>
                {props.posts.map((post) => (
                    <p key={post.postid}>
                        <a href={post.postid}>{post.title}</a>
                    </p>
                ))}
            </div>
        </DefaultLayout>
    )
}

export default Home

// https://github.com/siyuan-note/siyuan/blob/master/API_zh_CN.md#%E9%89%B4%E6%9D%83
// https://github.com/vercel/next.js/blob/canary/examples/cms-wordpress/pages/index.js
export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const query = context.query || {}
    if (query.t instanceof Array) {
        throw new Error("参数类型错误")
    }

    let cfg: SiteConfig = new SiteConfig()
    let result: Array<Post> = []
    const type = query.t || API_TYPE_CONSTANTS.API_TYPE_SIYUAN
    const api = new API(type)

    // 配置
    const cfgs = await api.getUsersBlogs() || []
    if (cfgs.length > 0) {
        cfg.userBlog = cfgs[0]
    }
    // 文章
    result = await api.getRecentPosts(10)

    return {
        props: {
            type: type,
            layoutCfg: JSON.parse(JSON.stringify(cfg)),
            posts: JSON.parse(JSON.stringify(result))
        }
    }
}