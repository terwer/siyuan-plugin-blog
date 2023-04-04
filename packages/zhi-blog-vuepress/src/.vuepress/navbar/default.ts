import { navbar } from "vuepress-theme-hope"

export const defaultNavbar = navbar([
  "/",
  {
    text: "文章",
    icon: "edit",
    link: "/post/",
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
