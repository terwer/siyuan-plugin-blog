import {UserBlog} from "./userBlog";

export default class SiteConfig {
    userBlog: UserBlog

    domain: string
    weburl: string
    webtheme: string
    webname: string
    webslogen: string
    keywords: string
    description: string
    beianinfo: string

    constructor() {
        this.userBlog = new UserBlog();
        this.domain = ""
        this.weburl = ""
        this.webtheme = "default"
        this.webname = "浅海拾贝"
        this.webslogen = "寻找未知的技术拼图"
        this.keywords = "软件架构、服务端开发、Java、Spring、Dubbo、Zookeeper、微服务"
        this.description = "浅海拾贝是关注与分享互联网及服务端开发技术的个人博客，致力于Java后端开发及服务端技术、软件架构、微服务技术分享。同时也记录个人的一路点滴，所蕴含的包括前端、后端、数据库等知识，欢迎您关注我。"
        this.beianinfo = "粤ICP备18023717号-1"
    }
}