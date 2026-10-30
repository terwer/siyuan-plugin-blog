import { sanitizeAiMarkdown } from "../utils/aiMarkdown.ts"

const cases = [
  ["single-line valid bold", "**正常加粗**", "**正常加粗**"],
  ["bold followed by CJK", "**答案：**更新集中", "**答案：** 更新集中"],
  ["bold inner trailing space", "**答案： **更新集中", "**答案：** 更新集中"],
  ["bold inner leading space", "** 答案：**更新", "**答案：** 更新"],
  ["bold followed by punctuation", "**语言显示修复**：中文", "**语言显示修复**：中文"],
  ["bold followed by space", "**正常** 正文", "**正常** 正文"],
  ["bold at line end", "**加粗**\n下一行", "**加粗**\n下一行"],
  ["multi-line bold valid", "**第一行\n第二行**", "**第一行\n第二行**"],
  ["multi-line bold followed by text", "**第一行\n第二行**正文", "**第一行\n第二行** 正文"],
  ["multi-line bold with surrounding text", "开头 **跨行\n加粗** 结束", "开头 **跨行\n加粗** 结束"],
  ["multi-line bold inner spaces", "** 第一行\n第二行 **", "**第一行\n第二行**"],
  ["blank line inside bold markers", "**第一行\n\n第二行**", "第一行\n\n第二行"],
  ["two bold spans same line", "**A** 和 **B**", "**A** 和 **B**"],
  ["two bold spans two lines", "**A**\n**B**", "**A**\n**B**"],
  ["list item valid bold", "- **语言显示修复**：中文", "- **语言显示修复**：中文"],
  ["list item malformed bold", "- **首次打开更顺畅： **内容先显示", "- **首次打开更顺畅：** 内容先显示"],
  ["list marker without space", "-阅读偏好可自选", "- 阅读偏好可自选"],
  ["plus list marker without space", "+要点内容", "+ 要点内容"],
  ["negative number not list", "-5 是负数", "-5 是负数"],
  ["italic untouched", "*斜体* 正常", "*斜体* 正常"],
  ["heading untouched", "## Q1：标题", "## Q1：标题"],
  ["heading without space untouched", "##Q1：标题", "##Q1：标题"],
  ["stray marker surrounded by spaces", "-阅读偏好可自选： ** 桌面端", "- 阅读偏好可自选： 桌面端"],
  ["unmatched marker at line end", "文本 ** 内容", "文本 内容"],
  ["inline code untouched", "行内 `**代码**` 保持不变", "行内 `**代码**` 保持不变"],
  ["escaped marker untouched", "\\**文字\\**", "\\**文字\\**"],
  ["odd bold markers strip paragraph", "**A：**内容A。\n**B：内容B。", "A：内容A。\nB：内容B。"],
  [
    "real speed read with unclosed bold",
    "关键要点\n**手机端更好读：**调整正文宽度。\n**PC 端新增内链预览：**鼠标悬浮即可预览。\n**预览内容更专注：只展示正文，不包含文档树。\n**更新已生效：**重新打开分享页即可。",
    "关键要点\n手机端更好读：调整正文宽度。\nPC 端新增内链预览：鼠标悬浮即可预览。\n预览内容更专注：只展示正文，不包含文档树。\n更新已生效：重新打开分享页即可。",
  ],
  ["code fence untouched", "```\n**代码： **内容\n```", "```\n**代码： **内容\n```"],
  ["code fence blank lines untouched", "```\n**第一行\n\n第二行**\n```", "```\n**第一行\n\n第二行**\n```"],
  ["question answer paragraphs", "**问题：** 问题？\n\n**答案：** 答案。", "**问题：** 问题？\n\n**答案：** 答案。"],
  ["question answer single newline", "**问题：** 问题？\n**答案：** 答案。", "**问题：** 问题？\n**答案：** 答案。"],
  ["bold inside list multi-line", "- **要点：\n  说明**正文", "- **要点：\n  说明** 正文"],
]

let failed = 0
for (const [name, input, expected] of cases) {
  const actual = sanitizeAiMarkdown(input)
  const ok = actual === expected
  if (!ok) {
    failed++
  }
  console.log(`${ok ? "PASS" : "FAIL"} ${name}`)
  if (!ok) {
    console.log(`  input   : ${JSON.stringify(input)}`)
    console.log(`  expected: ${JSON.stringify(expected)}`)
    console.log(`  actual  : ${JSON.stringify(actual)}`)
  }
}

if (failed === 0) {
  console.log(`ALL PASS (${cases.length})`)
  process.exit(0)
}

console.log(`${failed}/${cases.length} FAILED`)
process.exit(1)
