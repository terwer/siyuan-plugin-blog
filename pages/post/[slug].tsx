import {GetServerSideProps, NextPage} from "next";
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
import {Alert, Button} from "react-bootstrap";
import dynamic from "next/dynamic";
import {CopyButtonPlugin} from "../../lib/codecopy";
// import DefaultPostTags from "../../components/themes/default/defaultPostTags";

type Props = {
    type: string,
    propCfg: any
    post: Post
    publishLink: string
}

const DefaultPostTags = dynamic(
    () => import('../../components/themes/default/defaultPostTags'),
    {ssr: false}
);

const PostDetail: NextPage<Props> = (props, context) => {
    useEffect(() => {
        // 配置 highlight.js
        hljs.configure({
            // 忽略未经转义的 HTML 字符
            ignoreUnescapedHTML: true
        });
        // 代码复制
        hljs.addPlugin(
            // @ts-ignore
            new CopyButtonPlugin({
                // callback: (text:any, el:any) => console.log("Copied to clipboard", text),
            })
        )

        // 代码选项卡
        // 获取到内容中所有的code标签
        const codes = document.querySelectorAll('pre code')
        codes.forEach((el) => {
            // 让code进行高亮
            hljs.highlightElement(el as HTMLElement)
        })
        // 代码块
        const codeGroups = document.querySelectorAll('code-group')
        // 处理每个代码块
        codeGroups.forEach((group) => {
            // 防止重复添加
            if (group.getElementsByTagName("ul").length == 0) {

                const newNode = document.createElement("ul")
                newNode.setAttribute("class", "code-tab")

                const codeBlocks = group.querySelectorAll('code-block')
                codeBlocks.forEach((block) => {
                    const title = block.attributes.getNamedItem('title')?.value
                    const active = block.attributes.getNamedItem('active')?.value
                    const isActive = active != undefined
                    // console.log(block.attributes.length)
                    // console.log(title)
                    // console.log(isActive)

                    const item = document.createElement("li")
                    item.setAttribute("class", isActive ? "code-tab-item current" : "code-tab-item")
                    item.innerHTML = title || ""
                    item.addEventListener("click", function (event) {
                        const targetElement: any = event.target;
                        // 选择状态
                        // console.log(codeBlocks[0].innerHTML)
                        const allLis = targetElement.parentElement.querySelectorAll("li")
                        allLis.forEach((li: any) => {
                            li.setAttribute("class", "code-tab-item")
                        })
                        targetElement.setAttribute("class", "code-tab-item current")

                        // 设置tab
                        codeBlocks.forEach(cb => {
                            if (cb.attributes.getNamedItem('title')?.value == targetElement.innerHTML) {
                                cb.setAttribute('active', '')
                            } else {
                                cb.removeAttribute("active")
                            }
                        })
                        // console.log(targetElement.innerHTML);
                    })

                    newNode.append(item)
                })

                const firstBlock = codeBlocks[0]
                firstBlock?.parentNode?.insertBefore(newNode, firstBlock)
                // console.log("tab")
            }
        })
    }, [])

    function createMarkup() {
        return {__html: props.post?.description};
    }

    return (
        <DefaultLayout props={props.propCfg} type={props.type}>
            <main className={styles.main}>
                {
                    props.post.isPublished ?
                        <div>
                            {(props.type == API_TYPE_CONSTANTS.API_TYPE_SIYUAN) ?
                                <Button className={postStyles.postPublish}>
                                    <a href={props.publishLink} title={props.post.title} target="_blank"
                                       rel="noreferrer">发布到其他平台</a>
                                </Button>
                                : <div></div>
                            }

                            {props.post && props.post.title &&
                                <h1>{props.post?.title}</h1>
                            }

                            {props.post && props.post.mt_keywords &&
                                props.post.mt_keywords != "" &&
                                <div>
                                    <DefaultPostTags tagstr={props.post?.mt_keywords}/>
                                </div>
                            }

                            {props.post && props.post.shortDesc &&
                                props.post.shortDesc != "" &&
                                <div>
                                    <blockquote>
                                        <p>{props.post?.shortDesc}</p>
                                    </blockquote>
                                </div>
                            }

                            <div className={postStyles.postBody} dangerouslySetInnerHTML={createMarkup()}/>
                        </div>
                        : <div>
                            <Alert className={styles.sKeywordInfo} key="danger" variant="danger">
                                对不起，您没有该文章的访问权限
                            </Alert>
                        </div>
                }
            </main>
        </DefaultLayout>
    )
}

export default PostDetail

function getPublishLink(postid: string) {
    const pubSiteUrl = process.env.PUBLISH_SITE_URL || ""
    const opdPwd = process.env.OPT_PWD || ""
    return pubSiteUrl + "/index.html?pwd=" + opdPwd + "&id=" + postid
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    // 生产环境进行请求缓存
    if (process.env.NODE_ENV == "production") {
        context.res.setHeader(
            'Cache-Control',
            'public, s-maxage=1, stale-while-revalidate=59'
        )
    }

    const query = context.query || {}
    if (query.t instanceof Array) {
        throw new Error("参数类型错误")
    }

    const slug = context?.params?.slug
    if (!slug || typeof slug !== "string") {
        throw new Error("文章路径错误")
    }
    let smartSlug = slug || ""
    let useSlug = false
    if (slug.indexOf(".html") > -1) {
        smartSlug = slug.replace(".html", "")
        useSlug = true
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
    const post = await api.getPost(smartSlug, useSlug)

    // 密码授权访问
    const pwd = context.query.pwd || ""
    if (pwd != "" && pwd == post.wp_password) {
        post.isPublished = true
    }

    // SEO
    cfg.webslogen = cfg.webname
    cfg.webname = post.title
    if (post.mt_keywords) {
        cfg.keywords = post.mt_keywords.split(",").join(" ")
    }
    if (post.shortDesc) {
        cfg.description = post.shortDesc
    }

    return {
        props: {
            type: type,
            propCfg: JSON.parse(JSON.stringify(cfg)),
            post: JSON.parse(JSON.stringify(post)),
            publishLink: getPublishLink(post.postid) || ""
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