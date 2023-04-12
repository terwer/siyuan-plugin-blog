import { navbar } from "vuepress-theme-hope"

export const enNavbar = navbar([
  "/",
  {
    text: "Api",
    icon: "creative",
    prefix: "/api/",
    children: [
      {
        text: "Zhi core",
        icon: "creative",
        prefix: "zhi-core/",
        children: ["zhi-core"],
      },
    ],
  },
  {
    text: "Blog",
    icon: "note",
    link: "https://terwer.space",
  },
])
