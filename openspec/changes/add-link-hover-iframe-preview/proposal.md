# Change: Add iframe-based content-only hover preview for shared notes

## Why
当前分享页会把思源块引用转换成普通链接。用户想查看引用文档时，必须点击跳转或打开新页面，缺少笔记本体里“悬浮即可预览目标文档正文”的便利体验。

我们已经支持子文档发布，目标子文档本身就是一个可访问的分享页面。因此预览仍应采用“页面思维”用 iframe 加载目标页，但 iframe 内不能展示完整分享页 chrome。悬浮层里应该只展示正文，最多展示标题；文档树、大纲、AI、主题/深色切换、header、footer、侧边按钮等都不应该出现。

## What Changes
- 为分享页正文中的内部文档链接增加 client-only hover preview。
- 预览内容通过 iframe 加载目标分享页。
- 目标页在 `preview=1` 下进入 content-only preview mode。
- content-only preview mode 只展示正文，最多展示标题。
- 隐藏 header、footer、左侧文档树、右侧大纲、AI 助手、侧边浮动按钮、主题/深色切换、文档元信息等非正文元素。
- 保持原链接点击跳转行为不变。
- 预览框默认不 sticky，提供图钉按钮切换 pinned/sticky，并支持 `Escape` 关闭。
- 无权限、有密码、过期、未分享、不存在等状态仍交给目标页面自身处理，但状态页也必须是极简内容态，不展示页面 chrome。
- 禁止 iframe 预览页内部再次触发 hover preview。

## Out of Scope
- 不重新实现 JSON/editorDom preview renderer。
- 不新建一套独立 preview 页面。
- 不大幅调整现有分享页布局结构。
- 不预取或索引整棵子文档树。
- 不在父页面精确区分“不存在 / 未分享 / 无权限”。
- 不改变目标文档正常全页访问规则。
- 不在当前仓库实现付费/专业版创作端设置 UI；如果专业版 UI 位于其他仓库，需要后续同步。

## Design Summary
父页面通过 Nuxt client plugin 监听 `.protyle-wysiwyg` 内部文档链接的 hover/focus 事件。用户悬浮到同源内部文档链接时，插件创建或复用一个全局悬浮预览容器，并在容器中加载 iframe。iframe URL 使用目标链接，并追加 `preview=1&from=hoverPreview`。

目标分享页检测到 `preview=1` 后，不再按完整分享页展示，而进入 content-only preview mode。该模式应尽量用一个小的 preview flag 和少量条件渲染/CSS class 完成，不做大幅重构：正常页面保持现有结构，只有 preview mode 下隐藏非正文区域。

iframe 中的目标页面仍是所有访问状态的事实来源。如果目标文档有密码，iframe 展示目标页面已有密码验证内容，但不展示 header/footer/sidebar/tools；如果目标文档过期、未分享、无权限或不存在，iframe 展示目标页面已有空状态/过期状态/错误状态，但同样保持极简内容态。

## User Experience
- 鼠标悬浮内部文档链接：短延迟后显示 content-only iframe 预览。
- 预览中只看到目标文档正文，最多看到目标文档标题。
- 预览默认不 sticky：鼠标离开链接/预览区域后自动关闭；点击图钉后进入 pinned/sticky 状态。
- 默认按 `Escape` 关闭。
- 预览头部提供关闭按钮和“打开全文”。
- 如果用户在 iframe 内完成密码验证，“打开全文”应尽量使用 iframe 当前 URL，保留验证后的 `key`。
- 外链和跨域链接不触发预览。

## Minimal-change Implementation Principle
- 不新建重复的 preview route/page。
- 不复制 `Detail.vue` / `Main.vue` 的渲染逻辑。
- 不重写左右侧栏、大纲、AI 等组件。
- 推荐新增一个轻量 `isPreviewMode` 判断，并通过现有组件的条件渲染或根 class 隐藏非正文区域。
- preview mode 改动应局限在少数入口/布局组件，例如 `Detail.vue`、`content/Index.vue`、`content/Main.vue` 和 hover preview client plugin。
- 正常分享页没有 `preview=1` 时行为必须保持不变。

## Risk / Compatibility
- iframe 加载完整 Nuxt 页面，但 content-only preview mode 会减少可见 UI 和部分非必要组件渲染。
- 如果部署响应头禁止 same-origin iframe，预览会失败，需要降级到“打开全文”。
- `preview=1` 必须严格限定作用范围，不能影响正常分享页。
- iframe 页面必须禁用内部二次 hover preview，避免递归预览窗口。

## Open Decisions
以下决策视为已对齐，除非后续产品方向变化：
- iframe 内可展示标题，但不展示文档元信息、文档树、大纲、AI、主题/深色切换等非正文元素。
- 有密码页面允许在 pinned iframe 预览中展示原有密码表单，但表单页面也必须是极简内容态。
- 不在父层精确区分 not found、not shared、no permission。
- 父层不使用当前页 `docTree` 预判目标权限；目标页面是最终裁决者。
