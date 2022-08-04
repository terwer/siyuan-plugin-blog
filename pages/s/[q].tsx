import {GetServerSideProps, NextPage} from "next";
import SiteConfig from "../../lib/common/siteconfig";
import {Post} from "../../lib/common/post";
import {API_TYPE_CONSTANTS} from "../../lib/constants";
import {API} from "../../lib/api";
import DefaultLayout from "../../components/themes/default/defaultLayout";
import DefaultHomePostList from "../../components/themes/default/defaultHomePostList";

type Props = {
    type: string,
    layoutCfg: SiteConfig,
    posts: Post[]
    keyword: string
}

const SearchResult: NextPage<Props> = (props, context) => {
    return (
        <DefaultLayout props={props.layoutCfg} keyword={props.keyword}>
            <DefaultHomePostList posts={props.posts}/>
        </DefaultLayout>
    )
}

export default SearchResult

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

    const q = context?.params?.q
    if (!q || typeof q !== "string") {
        throw new Error("文章路径错误")
    }
    let keyword = ""
    keyword = q

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
    if (pageno || keyword) {
        let num = 1
        if (typeof pageno === "string") {
            num = parseInt(pageno) || 1
        }
        result = await api.getRecentPosts(10, num - 1, keyword)
    } else {
        result = await api.getRecentPosts(10)
    }

    return {
        props: {
            type: type,
            layoutCfg: JSON.parse(JSON.stringify(cfg)),
            posts: JSON.parse(JSON.stringify(result)),
            keyword: keyword
        }
    }
}