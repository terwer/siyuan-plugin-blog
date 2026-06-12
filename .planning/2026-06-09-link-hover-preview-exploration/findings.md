# 发现与决策

## 用户需求记录
- 用户反馈：分享的网页笔记里，鼠标放到链接上没有悬浮效果，必须点击才能跳转到对应文档；希望实现笔记本体中的悬浮预览体验。
- 用户截图体现的参考体验：笔记正文中的内部文档链接在悬浮/聚焦时，会显示一个文档预览浮层，浮层可看到目标文档标题和部分内容。
- 用户补充分析：分享分析界面是独立页面，和笔记本体不同；笔记本体悬浮可能依赖子文档也被发布，而当前系统已支持子文档发布，因此可考虑纯前端实现。
- 用户建议：用 Nuxt 客户端插件形式实现，降低 SSR/首屏渲染成本。
- 用户体验目标：尽量满足付费用户；悬浮效果最好支持默认钉住、可设置快捷键关闭，做到极致方便。

## 初步约束
- 本轮只探索方案，不急于写代码。
- 不使用 mock 数据、占位符或临时方案。
- 后续如涉及技术细节、业务逻辑、设计决策或实现方式不确定，必须先向用户确认。

## 研究发现
- 待项目结构与运行时链路梳理后补充。

## 技术决策
| 决策 | 理由 |
|------|------|
| 优先探索 Nuxt 客户端插件 | 悬浮预览是客户端交互，不应增加 SSR 首屏渲染成本；用户也明确建议该方向 |
| 采用渐进增强思路 | 未支持 JS、未发布目标文档或移动端触摸场景下，原链接点击跳转仍应可用 |

## 待确认问题
| 问题 | 影响 |
|------|------|
| 默认钉住的精确定义 | 决定 hover/leave/click/keyboard 状态机 |
| 目标文档内容来源 | 决定是否纯前端读取已发布页面/manifest，或需要 API |
| 快捷键默认值与冲突处理 | 决定设置界面和 keydown 监听逻辑 |
| 功能付费边界 | 决定默认开启策略与权限判断位置 |

## 2026-06-09 项目结构初查
- 项目是 pnpm workspace，Nuxt 应用位于 `apps/app`，包名 `@terwer/share-pro-app`，Nuxt 版本约 `^3.16.0`。
- 根命令 `pnpm dev`/`./dev.sh` 最终进入 `@terwer/share-pro-app`，符合用户提出的 Nuxt 客户端插件思路。
- Nuxt 当前已有 `apps/app/plugins/` 目录，可放客户端插件，例如后续候选路径 `apps/app/plugins/link-hover-preview.client.ts`。
- 分享/静态阅读相关路由包括 `apps/app/pages/s/[id].vue`、`doc/[id].vue`、`post/[id].vue` 等；`/s/:id` 是用户此前移动端验证用分享入口。
- 分享页主体组件链路初步定位为 `pages/s/[id].vue` → `components/static/Detail.vue` → `components/static/content/Index.vue` → `Main.vue`，正文 HTML 由 `Main.vue` 使用 `v-html` 渲染 `post.editorDom`。
- 内容侧边功能已有左侧文档树与右侧大纲/AI，后续方案不能破坏这些现有交互。

## 2026-06-09 运行链路与数据来源细查
- `/s/:id` 页面文件是 `apps/app/pages/s/[id].vue`，只关闭 layout 并渲染 `<static-detail-page />`。
- `components/static/Detail.vue` 通过 `useAuthModeFetch().fetchPostMeta(id, providerMode)` 获取当前文档数据：
  - provider mode：POST `${providerUrl}/api/share/getDoc`，参数 `fdId`，若 URL 有 `?key` 则带 `fdKey`。
  - normal mode：读取 `public/siyuan-blog/${id}.json`。
- `components/static/content/Main.vue` 将 `post.editorDom` 用 `v-html` 渲染到 `.protyle-wysiwyg`，并挂载 `v-sdomparser` 等客户端指令。
- `plugins/05.domparser.static.client.ts` 当前已经在客户端处理正文 DOM，调用 `useStaticBlockRef().convertAllLinks(el)` 把思源 `span[data-type="block-ref"]` 转成 `<a>`。
- `plugins/libs/domparser/useStaticBlockRef.ts` 的块引用转换规则：读取 `window.localStorage['static.app.config.json']`，使用 `cfg.docPath`，默认路径 `s`，最终生成 `${home}/${urlPath}/${id}`；同时把普通 `span[data-type="a"]` 转为外链 `<a>`。
- 文档树数据已存在于 `props.post.docTree`，节点包含 `id/name/isShared/hasPassword/isExpired` 等字段；但正文链接的目标完整 `editorDom` 目前只在目标文档加载后可得，当前页面的 docTree 只足够判断是否共享/密码/过期和拿标题。
- `AppConfig` 目前已有 pro 字段 `docTreeEnabled/docTreeLevel/outlineEnabled/outlineLevel/aiAssistantEnabled/postMetaEnabled`，尚无链接悬浮预览配置字段。
- 免费版思源插件的设置 UI 在 `apps/siyuan/src/pages/Setting/*`；但 `apps/siyuan/README_zh_CN.md` 说明收费版/专业版创作端 `share-pro` 不在本仓库，因此“付费用户设置 UI”很可能需要在外部专业版仓库同步实现，本仓库 viewer 端应先兼容配置字段。
- 当前工作区代码未被本次方案探索修改；只新增规划文件并切换 `.planning/.active_plan`。

## 可复用实现点
- 可复用现有客户端 DOM 处理时机：`v-sdomparser` 已在正文元素挂载时运行，适合给内部链接补充 `data-doc-id`、`data-share-state` 等属性；但悬浮交互本身建议放到独立 `.client.ts` 插件，避免把复杂状态机塞进 DOM 转换函数。
- 可复用现有取文档方法：`useAuthModeFetch().fetchPostMeta(id, providerMode)` 可作为预览内容按需加载入口；需要注意 provider mode 的密码文档 `fdKey` 语义和 normal mode 的本地 JSON 缺失情况。

## 2026-06-09 方案草案：Nuxt 客户端插件 + 按需预览

### 推荐总体方案
- 采用 Nuxt 客户端插件实现悬浮预览：候选文件 `apps/app/plugins/020.link-hover-preview.client.ts`。
- 插件只在浏览器端运行，不参与 SSR，不增加首屏 HTML 体积；正文仍由现有 `Detail.vue/Main.vue` 渲染。
- 使用事件委托监听 `.protyle-wysiwyg a[href]` 的 `pointerover/focusin/pointerout/keydown`，不为每个链接挂监听，适配 `v-html` 和后续 DOM 转换。
- 预览框只挂载一个全局实例到 `document.body`；鼠标移动到新内部链接时复用并更新内容，避免多实例渲染成本。

### 链接识别策略
1. 优先让 `useStaticBlockRef.ts` 在把 `span[data-type="block-ref"]` 转成 `<a>` 时保留：`data-doc-id`、`data-share-doc-link="true"`、原始 `data-type`。
2. 插件兜底解析 href：同源并匹配当前 `docPath` 或默认 `/s/:id`、`/x/:id` 等分享路径时视为内部文档链接。
3. 普通外链 `span[data-type="a"]` 和外部域名链接不触发预览，保持原跳转行为。

### 内容获取策略
- 第一阶段建议按需获取：悬浮后延迟约 120~180ms，再调用现有 `useAuthModeFetch().fetchPostMeta(targetId, providerMode)`。
- 结合当前 `post.docTree` 先判断目标文档状态：
  - `isShared === false`：不发起正文请求，显示“该子文档未发布/不可预览”。
  - `hasPassword === true`：默认不预取正文，显示锁定提示，点击仍进入目标页验证。
  - `isExpired === true`：显示过期提示，不预取正文。
  - 状态正常：按需取目标文档 JSON 并渲染预览。
- 做内存 LRU 缓存：`docId -> Promise/PreviewData`，默认 50 条，避免同一链接重复请求；路由切换时可保留或按配置清理。

### 预览渲染策略
- 预览内容以“标题 + 元信息/状态 + 正文摘要”为主，第一版不完整跑所有正文指令，避免公式、图表、嵌入块等重渲染带来成本。
- 正文摘要从 `editorDom` 中解析前 N 个有效块，去除 `script/style/iframe`、内联事件属性和危险 URL；保留段落、标题、列表、代码块和安全图片。
- 如后续付费用户强需求“完整预览”，再增加 `renderLevel: summary | rich` 配置，`rich` 只在按需打开时执行更完整的静态资源处理。

### 钉住与快捷键状态机
- 推荐把“默认钉住”定义为：预览框出现后默认 sticky，不因鼠标离开链接立即关闭；用户可继续滚动/移动鼠标阅读预览。
- 关闭方式：默认 `Esc`；预览框右上角关闭按钮；点击另一个内部链接时更新为新预览；路由切换自动关闭。
- 快捷键配置字段建议为字符串，例如 `linkHoverPreview.closeShortcut = "Escape"`，后续可支持 `Alt+W` 等组合键。
- 为避免和 AI 助手输入框冲突：当焦点在 `input/textarea/contenteditable` 内时，除 `Escape` 外的自定义快捷键默认不拦截。

### 配置字段建议
```ts
linkHoverPreview?: {
  enabled?: boolean              // 默认 true，付费发布默认开启可在上游设置
  stickyDefault?: boolean        // 默认 true
  closeShortcut?: string         // 默认 "Escape"
  hoverDelay?: number            // 默认 150ms
  cacheSize?: number             // 默认 50
  maxWidth?: number              // 默认 420px
  maxHeightRatio?: number        // 默认 0.6，即 60vh
  renderLevel?: "summary" | "rich" // 默认 summary
  touchMode?: "disabled" | "longPress" // 默认 disabled
}
```

### 实施路线建议
1. Viewer 端先兼容配置：在 `apps/app/app.config.ts` 增加 `linkHoverPreview` 类型与默认值。
2. 修改链接转换：`useStaticBlockRef.ts` 生成内部块引用 `<a>` 时保留 `data-doc-id`，为插件精准识别做铺垫。
3. 新增客户端插件：事件委托、状态机、定位、缓存、按需请求、关闭快捷键。
4. 新增轻量样式：独立 class 前缀，例如 `.share-link-preview-*`，避免影响正文、文档树、大纲和 AI 助手。
5. 如需要设置 UI：本仓库免费版可加兼容字段；付费/专业版创作端因不在当前仓库，需要在对应仓库增加开关、默认钉住和快捷键配置。

### 风险与边界
- provider mode 下密码文档的 `?key` 不一定能复用于目标文档；第一版不对密码文档预取正文更稳妥。
- 当前 normal mode 通过 `/public/siyuan-blog/${id}.json` 获取；如果目标子文档 JSON 未发布，预览应优雅失败并保留原点击跳转。
- 预览框不应阻断原链接点击；插件只能渐进增强。
- 第一版不建议预加载整棵子文档正文，避免大型文档树导致请求风暴。

## 2026-06-09 方案反思与重写：页面思维 iframe 预览优先

### 对上一版方案的反思
- 上一版把问题拆成“链接识别 → 获取 JSON → 解析 editorDom → 自己渲染摘要/富预览”，这是偏数据/组件复刻思路，不符合用户强调的“页面思维”。
- 该方案会重复实现现有分享页已经解决的问题：主题、资源前缀、公式、代码高亮、图片、嵌入块、密码/过期/未分享状态、子文档发布状态等。
- 对于已发布子文档，最直接的预览对象本来就是它自己的分享页面；重建 preview renderer 复杂、易错、维护成本高。
- 正确方向应是：悬浮层只负责“展示一个目标页面的窗口”，目标页面继续走现有 `/s/:id` 或配置后的 `docPath` 页面链路。

### 新推荐方案
- 仍用 Nuxt 客户端插件，但预览内容改为 iframe，不再自建文档数据预览渲染器。
- 插件职责：识别内部文档链接、创建/定位悬浮容器、设置 iframe `src`、处理默认钉住、关闭快捷键、点击外部/路由切换关闭。
- iframe `src` 使用目标链接本身，并附加轻量预览参数，例如 `?preview=1&from=hoverPreview`。
- 分享页在 `preview=1` 时进入紧凑预览模式：隐藏 header/footer/左侧文档树/右侧大纲 AI 浮动按钮，压缩边距，只保留正文阅读区域；这比重新渲染 editorDom 更直接。
- iframe 内部应禁用再次悬浮预览，避免递归套娃；插件检测 `route.query.preview === '1'` 或 `window.self !== window.top` 时可退出。

### iframe 方案优点
- 直接复用现有页面能力：数据加载、权限状态、主题、正文渲染、资源处理全部沿用当前分享页。
- 成本更可控：只在 hover 延迟后加载一个 iframe；不增加 SSR 首屏成本；无需解析和清洗 editorDom。
- 行为更接近用户理解：目标文档就是一个页面，悬浮层只是把页面嵌进去。
- 更容易满足付费用户“极致方便”：默认钉住 + Esc 关闭 + 打开全文按钮即可。

### iframe 方案实施路线
1. 新增客户端插件 `apps/app/plugins/020.link-hover-preview.client.ts`：事件委托监听正文内部文档链接。
2. 链接转换处可选增强：`useStaticBlockRef.ts` 转 `<a>` 时补 `data-doc-id`，但不是强依赖；iframe 可直接用现有 href。
3. 插件创建单例浮层：标题栏、关闭按钮、打开全文按钮、loading 状态、iframe。
4. iframe URL 规则：目标 href + `preview=1&from=hoverPreview`，保留原有 `key` 等必要参数。
5. 分享页增加 preview mode CSS/逻辑：隐藏非正文区域，压缩边距，禁用 iframe 内二次 hover preview。
6. 设置项保留但简化：`enabled`、`stickyDefault`、`closeShortcut`、`hoverDelay`、`width/height`。

### 新风险点
- iframe 会加载完整 Nuxt 页面，比摘要 JSON 轻渲染更重；但只有 hover 后才加载，且浏览器缓存可复用，复杂度换稳定性是值得的。
- 如果站点设置了禁止 iframe 的响应头，需要确认部署侧是否存在 `X-Frame-Options` 或 CSP `frame-ancestors` 限制；同源 iframe 通常可行。
- preview mode 需要谨慎隐藏侧边功能，不能影响正常 `/s/:id` 页面，只在 `preview=1` 生效。

## 2026-06-09 iframe 方案边界：无权限、有密码、不存在

### 总原则
- iframe 目标页面是权限和存在性的最终裁决者；父页面插件不重新实现权限判断。
- 父页面最多做链接识别、浮层交互、同源安全限制、loading/超时兜底，不根据本页缓存数据伪造最终状态。
- 为避免信息泄露，“不存在 / 未发布 / 无权限”在预览态建议统一表达为“无法预览或无权限访问”，不在悬浮层里精确区分。

### 推荐状态处理
| 目标状态 | iframe 行为 | 父浮层行为 | 推荐文案/交互 |
|---|---|---|---|
| 已发布、无密码、未过期 | iframe 加载目标分享页 `?preview=1` | 显示 loading 后展示页面 | 正常预览，提供“打开全文” |
| 有密码 | iframe 加载目标页面，由目标页显示密码验证 | 默认允许在钉住浮层内验证；“打开全文”应使用 iframe 当前 URL，保留验证后的 `key` | 显示页面原生密码表单；不在父页面另做密码逻辑 |
| 未发布 / 无权限 | iframe 加载目标页面，由目标页显示不可访问状态 | 不尝试绕过、不请求正文 | 统一显示目标页原生空状态；父层可补一句“点击打开查看详情” |
| 不存在 / ID 错误 | iframe 加载后显示 Nuxt/分享页自身错误或空状态 | 不精确区分不存在和无权限 | 统一不可预览，不泄露是否真实存在 |
| 已过期 | iframe 加载目标页面，由目标页显示过期状态 | 不请求正文 | 展示目标页原生过期提示 |
| 网络失败 / iframe 被 CSP 阻止 / 超时 | iframe 可能空白或加载失败 | 8s 左右超时兜底 | 显示“预览加载失败，可点击打开全文” |
| 外链 / 跨域链接 | 不 iframe | 不触发预览 | 保持原链接行为 |

### 密码页细节
- 因为预览默认钉住，有密码页面可以在 iframe 内完成验证；这是页面思维下最直接的行为。
- 如果用户在 iframe 内输入密码后目标页跳转到带 `key` 的 URL，父浮层的“打开全文”应读取 iframe 当前 URL，而不是原始 href，这样可保留验证结果。
- 如果用户不希望在悬浮框内输入密码，后续可加配置：`passwordMode: "iframe" | "openOnly"`；默认建议 `iframe`，体验更完整。

### preview mode 必须保证
- 仅 `preview=1` 生效，不影响正常分享页。
- 预览页隐藏 header/footer/左侧文档树/右侧大纲和 AI 按钮，保留权限页、密码页、过期页、空状态页本身。
- iframe 内禁用二次 hover preview，防止递归。
- 父浮层不阻断原链接点击，hover 只是增强。
