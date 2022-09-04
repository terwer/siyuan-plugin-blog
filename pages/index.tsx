import type {GetServerSideProps, GetStaticProps, NextPage} from 'next'
import {API} from "../lib/api";
import {API_TYPE_CONSTANTS} from "../lib/constants";
import {Post} from "../lib/common/post";
import DefaultLayout from "../components/themes/default/defaultLayout";
import SiteConfig from "../lib/common/siteconfig";
import DefaultHomePostList from "../components/themes/default/defaultHomePostList";
import {assginPreviewUrlForPosts, getHomelink, isEmptyString} from "../lib/util";
import {CategoryInfo} from "../lib/common/categoryInfo";

type Props = {
    type: string,
    layoutCfg: SiteConfig,
    posts: Post[],
    cats: CategoryInfo[]
}

const Home: NextPage<Props> = (props, context) => {
    return (
        <DefaultLayout props={props.layoutCfg} type={props.type} cats={props.cats}>
            <DefaultHomePostList posts={props.posts} type={props.type}/>
        </DefaultLayout>
    )
}

export default Home

// https://github.com/siyuan-note/siyuan/blob/master/API_zh_CN.md#%E9%89%B4%E6%9D%83
// https://github.com/vercel/next.js/blob/canary/examples/cms-wordpress/pages/index.js
export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    // Add whatever `Cache-Control` value you want here
    // 生产环境进行请求缓存
    // if(process.env.NODE_ENV=="production"){
    //     context.res.setHeader(
    //         'Cache-Control',
    //         'public, s-maxage=1, stale-while-revalidate=59'
    //     )
    // }

    const query = context.query || {}
    if (query.t instanceof Array) {
        throw new Error("参数类型错误")
    }

    let cfg: SiteConfig = new SiteConfig()
    let result: Array<Post> = []

    // type
    let type = query.t || process.env.DEFAULT_TYPE
    if (isEmptyString(type)) {
        type = API_TYPE_CONSTANTS.API_TYPE_SIYUAN
    } else {
        type = type || API_TYPE_CONSTANTS.API_TYPE_SIYUAN
    }
    // homeLink
    cfg.weburl = getHomelink(type)

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
    assginPreviewUrlForPosts(type, result)

    // 分类
   const cats = await  api.getCategories()

    return {
        props: {
            type: type,
            layoutCfg: JSON.parse(JSON.stringify(cfg)),
            posts: JSON.parse(JSON.stringify(result)),
            cats: JSON.parse(JSON.stringify(cats))
        }
    }
}

// 鉴于性能考虑，首页采取缓存模式
// export const getStaticProps: GetStaticProps<Props> = async (context) => {
//     let cfg: SiteConfig = new SiteConfig()
//     let result: Array<Post> = []
//     const type = API_TYPE_CONSTANTS.API_TYPE_SIYUAN
//
//     const api = new API(type)
//
//     // 配置
//     const cfgs = await api.getUsersBlogs() || []
//     if (cfgs.length > 0) {
//         cfg.userBlog = cfgs[0]
//     }
//     // 文章
//     result = await api.getRecentPosts(10)
//
//     return {
//         props: {
//             type: type,
//             layoutCfg: JSON.parse(JSON.stringify(cfg)),
//             posts: JSON.parse(JSON.stringify(result))
//         }
//     }
// }