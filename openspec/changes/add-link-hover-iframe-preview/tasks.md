# Tasks

## 1. Configuration
- [ ] 在 shared viewer app config 中增加 `linkHoverPreview` 类型和默认值。
- [ ] 增加 `showTitle` 配置，默认允许 preview 中展示标题。
- [ ] 确保缺失配置字段时使用安全默认值。

## 2. Link identification
- [ ] 可选增强 block-ref 链接转换，保留 `data-doc-id` 并标记内部文档链接。
- [ ] 在 client plugin 中实现同源内部文档链接识别。
- [ ] 保持外链和跨域链接原行为不变。

## 3. Client iframe preview plugin
- [ ] 新增 Nuxt client plugin 负责 hover preview 编排。
- [ ] 在 `preview=1` 或 iframe 预览上下文中提前退出。
- [ ] 使用事件委托监听正文内容 hover/focus。
- [ ] 实现 hover delay 和取消逻辑。
- [ ] 创建并复用单例悬浮预览容器。
- [ ] 渲染预览头部、关闭按钮、打开全文、loading、fallback 和 iframe。
- [ ] 将预览定位到链接附近，并限制在 viewport 内。
- [ ] 实现默认 sticky 行为。
- [ ] 实现 `Escape` 和可配置关闭快捷键。
- [ ] 路由切换时关闭预览。

## 4. iframe URL and open-full-page handling
- [ ] 给 iframe 目标 URL 追加 `preview=1&from=hoverPreview`。
- [ ] 保留已有有意义 query，例如 `key`。
- [ ] 可读取时使用 iframe 当前 URL 执行“打开全文”，以保留 iframe 内密码验证结果。
- [ ] 无法读取 iframe 当前 URL 时回退到原始目标链接。

## 5. Target page content-only preview mode
- [ ] 增加轻量 `isPreviewMode` 判断，避免新建重复页面。
- [ ] 仅在 `preview=1` 下进入 content-only preview mode。
- [ ] 在 preview mode 下隐藏 header 和 footer。
- [ ] 在 preview mode 下隐藏左侧文档树。
- [ ] 在 preview mode 下隐藏右侧大纲。
- [ ] 在 preview mode 下隐藏 AI assistant。
- [ ] 在 preview mode 下隐藏侧边浮动按钮和主题/深色切换入口。
- [ ] 在 preview mode 下隐藏文档元信息栏、阅读时间、日期等非正文信息。
- [ ] 在 preview mode 下只保留正文，最多保留标题。
- [ ] 保留密码、过期、未分享、not-found 等访问状态内容，但必须保持极简内容态。
- [ ] 阻止 preview iframe 内部再次触发 hover preview。
- [ ] 确保 preview mode 不影响正常页面。

## 6. Minimal-change constraints
- [ ] 不新建独立 preview route/page。
- [ ] 不复制 `Detail.vue` / `Main.vue` 的正文渲染逻辑。
- [ ] 不重写文档树、大纲、AI 组件。
- [ ] 将改动限制在少量入口/布局组件和 client plugin。
- [ ] 正常分享页没有 `preview=1` 时 DOM 行为和交互保持不变。

## 7. Edge cases
- [ ] 验证有密码目标页能在 pinned iframe 中展示极简密码页并完成验证。
- [ ] 验证未分享/无权限目标不会在父层泄露存在性细节。
- [ ] 验证不存在目标通过目标页极简状态或 fallback 处理。
- [ ] 验证过期目标显示目标页极简过期状态。
- [ ] 验证 iframe 加载超时会显示 fallback 和打开全文操作。
- [ ] 验证 CSP/frame blocking 失败时可优雅降级。

## 8. Regression validation
- [ ] 验证没有 `preview` 时正常分享页渲染不变。
- [ ] 验证 preview mode 外的文档树、大纲、AI 助手、主题/深色切换不受影响。
- [ ] 验证移动端/触屏场景不阻断正常链接导航。
- [ ] 验证桌面端至少一个已发布子文档可 hover 预览。
- [ ] 验证快捷键关闭和快捷键冲突规则。
