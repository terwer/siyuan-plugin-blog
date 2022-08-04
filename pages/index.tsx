import type {GetServerSideProps, NextPage} from 'next'
import {API} from "../lib/api";
import {API_TYPE_CONSTANTS} from "../lib/constants";
import {Post} from "../lib/common/post";
import DefaultLayout from "../components/themes/default/defaultLayout";
import SiteConfig from "../lib/common/siteconfig";
import DefaultHomePostList from "../components/themes/default/defaultHomePostList";

type Props = {
    type: string,
    layoutCfg: SiteConfig,
    posts: Post[]
}

const Home: NextPage<Props> = (props, context) => {
    return (
        <DefaultLayout props={props.layoutCfg}>
            <DefaultHomePostList posts={props.posts}/>
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
    const pageno = query.p
    const api = new API(type)

    // 配置
    const cfgs = await api.getUsersBlogs() || []
    if (cfgs.length > 0) {
        cfg.userBlog = cfgs[0]
    }
    // 文章
    if (pageno) {
        let num = 1
        if (typeof pageno === "string") {
            num = parseInt(pageno) || 1
        }
        result = await api.getRecentPosts(10, num - 1)
    } else {
        result = await api.getRecentPosts(10)
    }

    return {
        props: {
            type: type,
            layoutCfg: JSON.parse(JSON.stringify(cfg)),
            posts: JSON.parse(JSON.stringify(result))
        }
    }
}