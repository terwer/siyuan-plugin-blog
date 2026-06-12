# link-hover-preview Specification Delta

## ADDED Requirements

### Requirement: Internal document links shall support iframe hover preview
分享 viewer SHALL 为正文中的内部分享文档链接提供 client-side hover preview。

#### Scenario: Hover published internal document link
- **GIVEN** 分享页正文包含一个指向已发布、可访问文档的内部链接
- **WHEN** 用户 hover 或 focus 该链接
- **THEN** viewer SHALL 显示悬浮预览容器
- **AND** 容器 SHALL 通过 iframe 加载目标分享页
- **AND** iframe URL SHALL 包含 `preview=1` 和 `from=hoverPreview`

#### Scenario: Click behavior remains unchanged
- **GIVEN** 分享页正文包含一个内部文档链接
- **WHEN** 用户点击该链接
- **THEN** 链接 SHALL 保持现有导航行为
- **AND** hover preview SHALL NOT 替代正常跳转

### Requirement: Preview content shall use page-first iframe rendering
hover preview SHALL 通过 iframe 渲染目标分享页，不得从文档 JSON 或 editor DOM 重建另一套 preview renderer。

#### Scenario: Target document contains rich content
- **GIVEN** 目标文档包含主题样式、图片、公式、代码块或其他 viewer 已支持内容
- **WHEN** 目标文档显示在 hover preview 中
- **THEN** iframe SHALL 复用目标页面现有渲染链路
- **AND** 父 hover 层 SHALL NOT 解析 `editorDom` 来重建预览

### Requirement: Preview mode shall render content only
目标分享页 SHALL 支持由 `preview=1` 激活的 content-only preview mode。

#### Scenario: Accessible target page is loaded as iframe preview
- **GIVEN** 分享页以 `preview=1` 加载
- **AND** 目标文档可访问
- **WHEN** 页面渲染
- **THEN** 页面 SHALL 只展示正文内容
- **AND** 页面 MAY 展示目标文档标题
- **AND** 页面 SHALL NOT 展示 header、footer、文档树、大纲、AI 助手、侧边浮动工具、主题/深色切换、文档元信息栏、阅读时间或日期
- **AND** 样式 SHALL NOT 影响没有 `preview` 的正常页面

#### Scenario: Preview mode hides page chrome
- **GIVEN** 分享页以 `preview=1` 加载
- **WHEN** 页面渲染完成
- **THEN** 左侧文档树 SHALL NOT 可见
- **AND** 右侧大纲 SHALL NOT 可见
- **AND** AI assistant SHALL NOT 可见
- **AND** 主题/深色切换入口 SHALL NOT 可见
- **AND** header/footer SHALL NOT 可见

### Requirement: Preview mode shall be implemented with minimal structural change
content-only preview mode SHALL 通过轻量 preview flag 和局部条件渲染/CSS 实现，避免大幅重构现有分享页。

#### Scenario: Normal page has no preview parameter
- **GIVEN** 分享页没有 `preview=1`
- **WHEN** 页面渲染
- **THEN** 正常 header、footer、文档树、大纲、AI 助手和主题/深色切换行为 SHALL 保持不变

#### Scenario: Preview mode is enabled
- **GIVEN** 分享页带有 `preview=1`
- **WHEN** 页面渲染
- **THEN** viewer SHALL 复用现有正文渲染组件
- **AND** viewer SHALL NOT 使用重复的 preview page 或复制正文渲染逻辑

### Requirement: Target page shall remain authority for access state
父 hover 层 SHALL NOT 独立判断目标文档权限、密码、过期、未分享或存在性状态。

#### Scenario: Target page requires password
- **GIVEN** 内部文档链接指向有密码保护的分享页
- **WHEN** hover preview iframe 加载目标页面
- **THEN** iframe SHALL 显示目标页面现有密码验证 UI
- **AND** 密码验证页面 SHALL NOT 展示 header、footer、文档树、大纲、AI 助手或主题/深色切换
- **AND** 父 hover 层 SHALL NOT 自行获取或验证密码

#### Scenario: Target page is not shared or inaccessible
- **GIVEN** 内部文档链接指向未分享或不可访问页面
- **WHEN** hover preview iframe 加载目标页面
- **THEN** iframe SHALL 显示目标页面现有不可访问或空状态
- **AND** 状态页 SHALL 保持极简内容态
- **AND** 父 hover 层 SHALL NOT 暴露该文档是不存在还是仅不可访问

#### Scenario: Target page does not exist
- **GIVEN** 内部文档链接指向不存在或无效文档 ID
- **WHEN** hover preview iframe 加载目标 URL
- **THEN** 目标页面 SHALL 通过自身 not-found 或空状态处理
- **AND** 状态页 SHALL 保持极简内容态
- **AND** 父 hover 层 SHALL NOT 精确区分 missing document 与 inaccessible document

#### Scenario: Target page is expired
- **GIVEN** 内部文档链接指向已过期分享页
- **WHEN** hover preview iframe 加载目标页面
- **THEN** iframe SHALL 显示目标页面现有过期状态
- **AND** 过期状态页 SHALL 保持极简内容态

### Requirement: Preview shall be sticky and closable
hover preview SHALL 支持默认 sticky 行为，并提供键盘和按钮关闭能力。

#### Scenario: Default sticky preview
- **GIVEN** sticky preview 默认启用
- **WHEN** 预览出现
- **THEN** 预览 SHALL 在指针离开原链接后继续可见
- **UNTIL** 用户关闭、hover 另一个可预览链接或发生路由切换

#### Scenario: Close with Escape
- **GIVEN** hover preview 正在显示
- **WHEN** 用户按下 `Escape`
- **THEN** 预览 SHALL 关闭

#### Scenario: Close with button
- **GIVEN** hover preview 正在显示
- **WHEN** 用户点击关闭按钮
- **THEN** 预览 SHALL 关闭

### Requirement: Open full page shall preserve iframe state when possible
hover preview SHALL 提供打开完整页面的操作，并在可读取时保留 iframe 当前导航状态。

#### Scenario: Password validated inside iframe
- **GIVEN** 有密码保护的目标页已在 pinned iframe preview 中打开
- **AND** 用户已在 iframe 中完成密码验证
- **WHEN** 用户点击“打开全文”
- **THEN** viewer SHALL 在可访问时使用 iframe 当前 URL
- **AND** 打开的 URL SHOULD 保留目标页面生成的验证 `key`

#### Scenario: iframe URL is inaccessible
- **GIVEN** 父层无法读取 iframe 当前 URL
- **WHEN** 用户点击“打开全文”
- **THEN** viewer SHALL 回退使用原始目标链接 URL

### Requirement: Preview shall avoid recursive iframe previews
preview 页面 SHALL NOT 创建嵌套 hover preview。

#### Scenario: Link inside iframe preview is hovered
- **GIVEN** 目标页面已在 iframe preview mode 中加载
- **WHEN** 用户 hover iframe 内部链接
- **THEN** iframe 内部的 hover preview plugin SHALL NOT 再创建新的 preview iframe

### Requirement: External and cross-origin links shall not be previewed
hover preview SHALL 只对同源内部分享文档链接生效。

#### Scenario: Hover external link
- **GIVEN** 正文包含外链或跨域链接
- **WHEN** 用户 hover 该链接
- **THEN** 不 SHALL 显示 hover preview
- **AND** 链接 SHALL 保持正常行为

### Requirement: Load failures shall degrade gracefully
iframe 加载失败、超时或被阻止时，hover preview SHALL 提供可降级 fallback。

#### Scenario: iframe preview times out
- **GIVEN** 用户 hover 一个可预览内部链接
- **AND** iframe 在配置的超时时间内没有完成加载
- **WHEN** 超时发生
- **THEN** 预览 SHALL 显示加载失败提示
- **AND** 预览 SHALL 提供打开完整页面的操作
