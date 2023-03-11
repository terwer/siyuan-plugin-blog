import Theme from "~/src/index"

/**
 * @packageDocumentation
 * 🛍️ 一款自带插件和博客的思源笔记主题
 */
;(async () => {
  const theme = new Theme()
  await theme.init("electron")
})()
