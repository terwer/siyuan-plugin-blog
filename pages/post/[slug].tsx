import {GetServerSideProps, GetStaticProps, NextPage} from "next";
import {Post} from "../../lib/common/post";
import {API} from "../../lib/api";
import {API_TYPE_CONSTANTS} from "../../lib/constants";
import styles from "../../components/themes/default/css/layout.module.css";
import postStyles from "../../components/themes/default/css/post.module.css"
import SiteConfig from "../../lib/common/siteconfig";
import DefaultLayout from "../../components/themes/default/defaultLayout";
import {useEffect} from "react";
import hljs from 'highlight.js'
import 'highlight.js/styles/vs.css'

type Props = {
    type: string,
    propCfg: any
    post: Post
}

const PostDetail: NextPage<Props> = (props, context) => {

    useEffect(() => {
        // 配置 highlight.js
        hljs.configure({
            // 忽略未经转义的 HTML 字符
            ignoreUnescapedHTML: true
        })
        // 获取到内容中所有的code标签
        const codes = document.querySelectorAll('pre code')
        codes.forEach((el) => {
            // 让code进行高亮
            hljs.highlightElement(el as HTMLElement)
        })
    }, [])

    function createMarkup() {
        return {__html: props.post?.description};
    }

    return (
        <DefaultLayout props={props.propCfg}>
            <main className={styles.main}>
                <p>{props.post?.mt_keywords}</p>
                <div className={postStyles.postBody} dangerouslySetInnerHTML={createMarkup()}/>
            </main>
        </DefaultLayout>
    )
}

export default PostDetail

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    // Add whatever `Cache-Control` value you want here
    context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=1, stale-while-revalidate=59'
    )

    const query = context.query || {}
    if (query.t instanceof Array) {
        throw new Error("参数类型错误")
    }

    const slug = context?.params?.slug
    if (!slug || typeof slug !== "string") {
        throw new Error("文章路径错误")
    }
    let smartSlug = ""
    if (slug.indexOf(".html") > -1) {
        smartSlug = slug.replace(".html", "")
    }

    const type = query.t || API_TYPE_CONSTANTS.API_TYPE_SIYUAN

    const api = new API(type)

    let cfg: SiteConfig = new SiteConfig()
    // 配置
    const cfgs = await api.getUsersBlogs() || []
    if (cfgs.length > 0) {
        cfg.userBlog = cfgs[0]
    }

    // 文章
    // log.logInfo("smartSlug=>", smartSlug)
    const post = await api.getPost(smartSlug)

    return {
        props: {
            type: type,
            propCfg: JSON.parse(JSON.stringify(cfg)),
            post: JSON.parse(JSON.stringify(post))
        }
    }
}

// export const getStaticProps: GetStaticProps<Props> = async (context) => {
//     const slug = context?.params?.slug
//     if (!slug || typeof slug !== "string") {
//         throw new Error("文章路径错误")
//     }
//     let smartSlug = ""
//     if (slug.indexOf(".html") > -1) {
//         smartSlug = slug.replace(".html", "")
//     }
//
//     const type = API_TYPE_CONSTANTS.API_TYPE_SIYUAN
//     const api = new API(type)
//
//     let cfg: SiteConfig = new SiteConfig()
//     // 配置
//     const cfgs = await api.getUsersBlogs() || []
//     if (cfgs.length > 0) {
//         cfg.userBlog = cfgs[0]
//     }
//
//     // 文章
//     // log.logInfo("smartSlug=>", smartSlug)
//     const post = await api.getPost(smartSlug)
//
//     return {
//         props: {
//             type: type,
//             propCfg: JSON.parse(JSON.stringify(cfg)),
//             post: JSON.parse(JSON.stringify(post))
//         }
//     }
// }
//
// export async function getStaticPaths() {
//     const type = API_TYPE_CONSTANTS.API_TYPE_SIYUAN
//     const api = new API(type)
//     const result = await api.getRecentPosts(10)
//
//     // 静态路径
//     const fpath = result.map(({postid}) => `/post/${postid}.html`) || [];
//     return {
//         paths: fpath,
//         fallback: true,
//     }
// }