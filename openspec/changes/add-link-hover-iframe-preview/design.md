# Design: iframe-based content-only shared link hover preview

## Current State
分享页由 Nuxt 应用渲染，典型路由包括 `/s/:id`。正文内容插入到 `.protyle-wysiwyg`，现有静态 DOM parser 会把 `span[data-type="block-ref"]` 转成普通 `<a>` 链接。目前这些链接没有 hover preview 行为。

分享 viewer 已经能够完整渲染目标文档页面，包括子文档发布、主题样式、资源路径、图片、公式、代码高亮、密码验证、过期状态、未分享状态和空状态。预览应复用这条页面渲染链路，但 preview iframe 内必须是 content-only 展示，不应把完整分享页的导航、侧栏、工具、主题切换等 UI 一起带进去。

## Target Architecture

### Parent page plugin
新增 Nuxt client-only plugin，例如：

```text
apps/app/plugins/020.link-hover-preview.client.ts
```

职责：
- 在 `preview=1` 或 iframe 预览上下文中提前退出。
- 使用事件委托监听正文内部链接。
- 识别同源内部文档链接。
- 管理单例悬浮预览容器。
- 根据目标链接生成 iframe `src`。
- 处理 sticky 状态、关闭按钮、快捷键关闭、路由切换清理、加载超时兜底。

非职责：
- 不获取目标文档 JSON。
- 不解析或清洗 `editorDom` 作为预览内容。
- 不判断目标文档是否存在或是否有权限。
- 不重新实现密码或权限 UI。
- 不负责隐藏目标页内部 chrome；这由目标页 `preview=1` 模式处理。

### Target page content-only preview mode
目标分享页收到 `preview=1` 后进入 content-only preview mode。

允许展示：
- 正文内容。
- 目标文档标题，且标题是可选上限。
- 密码、过期、未分享、无权限、not-found 等访问状态内容；这些状态内容替代正文展示。

必须隐藏：
- header。
- footer。
- 左侧文档树。
- 右侧大纲。
- AI assistant。
- 侧边浮动按钮。
- 主题/深色切换入口。
- 文档元信息栏、阅读时间、日期等非正文信息。
- 其他与正文阅读无关的全局工具。

实现方式要求：
- 使用轻量 `isPreviewMode` 判断。
- 优先通过少量条件渲染和 preview root class 控制展示。
- 不新建重复页面，不复制现有内容渲染链路。
- 不重写左右侧栏、大纲、AI 组件。
- preview mode 只在 `preview=1` 下生效。

### iframe URL construction
给定内部目标 URL，插件追加或覆盖：

```text
preview=1
from=hoverPreview
```

必须保留有意义的已有 query，例如密码验证 `key`。

### Internal link detection
链接只有满足以下条件时才可预览：
- 是正文渲染内容中的 `<a>`。
- 解析后的 origin 与当前页面相同。
- path 匹配已配置的文档路由，默认支持 `/s/:id` 等分享文档路径。
- 当前页面不是 preview iframe 页面。

可选增强：
- 在块引用转换为 `<a>` 时保留 `data-doc-id`，并增加稳定标记，例如 `data-share-doc-link="true"`，用于更精准识别。

## State Handling Matrix

| Target state | Parent plugin behavior | iframe / target page behavior |
| --- | --- | --- |
| 已发布且可访问 | loading 后展示 iframe | 只展示标题可选 + 正文内容 |
| 有密码 | loading 后展示 iframe | 只展示极简密码验证内容，不展示页面 chrome |
| iframe 内密码验证成功 | “打开全文”优先使用 iframe 当前 URL | 验证后只展示标题可选 + 正文内容 |
| 未分享 / 无权限 | 父层不精确区分 | 只展示目标页极简不可访问/空状态 |
| 不存在 / ID 错误 | 父层不精确区分 | 只展示目标页极简 not-found/空状态 |
| 已过期 | 父层不特殊处理 | 只展示目标页极简过期状态 |
| 网络失败 / iframe 被阻止 / 超时 | 显示失败兜底和“打开全文” | iframe 可能空白或加载失败 |
| 外链 / 跨域链接 | 不触发预览 | 保持链接原行为 |

## Sticky and Keyboard Behavior
- `stickyDefault` 默认 `false`。
- 预览头部提供图钉按钮，允许用户对当前预览切换 pinned/sticky 状态。
- 预览框必须提供可见关闭按钮。
- 默认关闭快捷键为 `Escape`。
- 支持后续配置自定义快捷键。
- 当焦点位于 `input`、`textarea`、`select`、`contenteditable` 内时，除 `Escape` 外的自定义快捷键不应被截获。
- 路由切换时关闭预览。

## Configuration
建议 viewer 配置结构：

```ts
linkHoverPreview?: {
  enabled?: boolean
  stickyDefault?: boolean
  closeShortcut?: string
  hoverDelay?: number
  width?: number
  height?: number
  maxWidth?: number
  maxHeightRatio?: number
  sameOriginOnly?: boolean
  timeoutMs?: number
  showTitle?: boolean
}
```

建议默认值：

```ts
{
  enabled: true,
  stickyDefault: false,
  closeShortcut: "Escape",
  hoverDelay: 150,
  width: 460,
  height: 360,
  maxWidth: 560,
  maxHeightRatio: 0.7,
  sameOriginOnly: true,
  timeoutMs: 8000,
  showTitle: true
}
```

## Security / Privacy
- 默认不 iframe 外链或跨域 URL。
- 父层不泄露目标 ID 到底是不存在还是不可访问。
- 不绕过目标页面的密码、过期或分享检查。
- 父 plugin 不读取或复制目标私有正文内容。
- 目标页面运行时状态是最终事实来源。

## Validation Strategy
- 正常已发布子文档可以在 hover iframe 中显示正文。
- preview iframe 内最多展示标题 + 正文。
- preview iframe 内不显示 header、footer、文档树、大纲、AI、主题/深色切换、侧边按钮、文档元信息。
- 原链接点击跳转行为保持不变。
- `preview=1` 只影响 iframe 预览页，不影响正常分享页。
- 有密码目标显示极简密码页，并可在 pinned iframe 内验证。
- “打开全文”在密码验证后尽量保留 iframe 当前 URL。
- 未分享、无权限、不存在、过期页面展示目标页极简状态。
- 外链不触发预览。
- `Escape` 和关闭按钮可以关闭预览。
- iframe 预览页内部不会继续创建嵌套预览。
