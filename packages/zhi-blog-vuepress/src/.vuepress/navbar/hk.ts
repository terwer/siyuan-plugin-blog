import { navbar } from "vuepress-theme-hope"

export const hkNavbar = navbar([
    "/hk/",
    {
        text: "文章",
        icon: "edit",
        link: "/hk/post/",
    },
    {
        text: "隨筆",
        icon: "note",
        link: "/hk/timeline/",
    },
    {
        text: "關於",
        icon: "discover",
        link: "/hk/about/",
    },
    {
        text: "留言",
        icon: "note",
        link: "/hk/guestbook/",
    },
])
