import { getSideBar } from "vitepress-plugin-autobar"
export default {
  title: "helpdoc", // 设置网站标题
  description: "a online helpdoc",
  base: "/", // 设置站点根路径
  outDir: "./.vitepress/dist", // 设置输出目录
  repo: "https://github.com/terwer/zhi-env", // 添加 git 链接
  markdown: {
    toc: { includeLevel: [2, 3] },
  },
  themeConfig: {
    // 添加导航栏
    nav: [
      {
        text: "helpdoc",
        link: "/",
        target: "_self",
      },
    ],
    sidebar: getSideBar("./docs", {
      ignoreMDFiles: ["index"],
    }),
  },
}
