import { navbar } from "vuepress-theme-hope"

export const enNavbar = navbar([
    "/en/",
    {
        text: "Posts",
        icon: "edit",
        link: "/en/post/",
    },
    {
        text: "Timeline",
        icon: "note",
        link: "/en/timeline/",
    },
    {
        text: "About",
        icon: "discover",
        link: "/en/about/",
    },
    {
        text: "Guestbook",
        icon: "note",
        link: "/en/guestbook/",
    },
])
