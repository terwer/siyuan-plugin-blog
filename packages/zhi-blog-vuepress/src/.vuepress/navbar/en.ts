import { navbar } from "vuepress-theme-hope"

export const enNavbar = navbar([
  "/",
  {
    text: "Posts",
    icon: "edit",
    link: "/post/",
  },
  {
    text: "About",
    icon: "discover",
    link: "/about/",
  },
  {
    text: "Guestbook",
    icon: "note",
    link: "/guestbook/",
  },
])
