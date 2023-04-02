import { navbar } from "vuepress-theme-hope"

export const zhNavbar = navbar([
  "/zh/",
  {
    text: "文章",
    icon: "edit",
    link: "/zh/post/",
  },
  {
    text: "关于",
    icon: "discover",
    link: "/zh/about/",
  },
  {
    text: "留言",
    icon: "note",
    link: "/zh/guestbook/",
  },
])
