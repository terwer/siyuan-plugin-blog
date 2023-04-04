import { navbar } from "vuepress-theme-hope"

export const defaultNavbar = navbar([
    "/",
    {
        text: "文章",
        icon: "edit",
        link: "/post/",
    },
    {
        text: "随笔",
        icon: "note",
        link: "/timeline/",
    },
    {
        text: "友链",
        link: "/links/",
        icon: "iconfont icon-link",
    },

    {
        text: "关于",
        icon: "discover",
        link: "/about/",
    },
    {
        text: "留言",
        icon: "note",
        link: "/guestbook/",
    },
])
