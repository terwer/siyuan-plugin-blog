# 发现与决策

## 需求
- 用户反馈：手机端分享页两边留白很宽，实际内容区域很窄，阅读体验不好。
- 本地复现入口：使用 `./dev.sh` 启动后访问 `http://localhost:4000/s/20260329025638-3ne0z7i`。
- 当前要求：先用文件规划系统组织排查，不急于直接修复。
- 用户已进一步确认：移动端布局要紧凑，正文左右边距原则上控制在 4px 以下，并要求立即开始修复。
- 约束：遇到不确定技术细节、业务逻辑、设计决策或实现方案时，必须主动向用户确认，不能使用 mock 数据、占位符或临时方案应付。

## 研究发现
- 已用 Chrome DevTools 在 `390×844 DPR=3` 移动端视口复现目标页。
- 当前运行时布局关键尺寸：
  - `viewport.innerWidth = 390`
  - `.content-layout` 宽约 `380px`
  - 左侧 `.aside-left.sidebarClosed` 即使收起仍占 `60px`
  - `.main-content` 从 `x=60` 开始，宽约 `320px`，且 `padding-right=60px`
  - `.fn__flex-1.protyle` 实际宽约 `260px`
  - `.protyle-title` 与 `.protyle-wysiwyg` 左右各有 `32px` padding，标题正文可用宽度约 `186px`
- 已定位到源码样式：
  - `apps/app/components/static/content/Index.vue`：`.main-content padding 0 60px 0 0`
  - `apps/app/components/static/content/left/Index.vue`：`.sidebarClosed width: 60px`
  - `apps/app/components/static/content/Main.vue`：`.protyle-title` 与 `.protyle-wysiwyg` 左右 `32px`
  - `apps/app/components/static/content/PostMeta.vue`：移动端 `.post-meta` 左右 `16px`
  - `apps/app/components/static/content/right/Index.vue`：右侧浮动按钮/大纲固定在右侧，原布局用正文右 padding 预留空间
- 上一版结构性源码修复失效：
  - 用户反馈文档树菜单不可用。
  - 用户反馈文档大纲、AI 助手被破坏，界面错乱。
  - 结论：不能通过改动侧栏/按钮位置、侧栏占位、右侧大纲容器布局来换取正文宽度。
- 已撤回会影响功能结构的改动：
  - 不再改 `apps/app/components/static/content/Index.vue` 的 `.main-content` 右侧预留。
  - 不再改 `apps/app/components/static/content/left/Index.vue` 的侧栏占位和标题 margin 行为。
  - 不再改 `apps/app/components/static/content/left/SidebarButton.vue` 的文档树按钮位置。
  - 不再改 `apps/app/components/static/content/right/Index.vue` 的大纲/AI 按钮和容器布局。

## 技术决策
| 决策 | 理由 |
|------|------|
| 先建立计划，再进行复现与定位 | 用户要求使用文件规划，且该问题需要跨浏览器视口、运行时样式和源码定位 |
| 后续以实际运行页面为准 | 移动端宽度问题必须通过真实渲染尺寸和加载样式确认 |
| 手机端正文左右边距目标按 4px 以下处理 | 用户已确认紧凑目标，属于本次修复的核心验收标准 |
| 移动端优先用 media query 做最小覆盖 | 桌面端当前布局可能依赖 60px 侧栏/按钮预留空间，本次问题集中在手机端 |
| 手机端标题容器、元信息、正文左右 padding 统一为 `4px`，标题输入内部左右 padding 归零 | 满足用户“原则上 4px 以下”的验收口径 |
| ~~侧边栏/大纲在移动端不参与 flex 占位~~ | 已撤销：破坏功能，不能接受 |
| 新方案必须保持文档树、大纲、AI 助手原结构不变 | 用户明确要求禁止丧失任何功能 |

## 遇到的问题
| 问题 | 解决方案 |
|------|---------|
| 目标移动端边距此前尚未明确 | 用户已确认“原则上 4px 以下” |

## 资源
- 页面：`http://localhost:4000/s/20260329025638-3ne0z7i`
- 启动命令：`./dev.sh`

## 视觉/浏览器发现
<!-- 关键：每执行2次查看/浏览器操作后必须更新此部分 -->
<!-- 多模态内容必须立即以文本形式记录 -->
- 390px 手机视口下，正文实际阅读宽度被左侧收起栏 `60px`、右侧按钮预留 `60px`、正文内边距 `32px×2` 叠加压缩，标题输入区域仅约 `186px`，与用户反馈一致。
- 修复后验证数据：
  - `360×640`：`.aside-left width=0`，`.main-content width≈350`，标题/元信息/正文 `padding-left/right=4px`，无横向滚动。
  - `390×844`：`.aside-left width=0`，`.main-content width≈380`，标题/元信息/正文 `padding-left/right=4px`；打开右侧大纲时 `.outline-container` 为 `x=4,width≈382`；打开左侧文档树时标题 `margin-left=0`。
  - `414×896`：`.aside-left width=0`，`.main-content width≈404`，标题/元信息/正文 `padding-left/right=4px`，无横向滚动。
  - `1024×768` 桌面视口：仍保持 `.aside-left width=60`、`.main-content padding-right=60px`、正文左右 `32px`，桌面布局未被移动端规则影响。
- 上述“修复后验证数据”对应的结构性方案已作废，不能作为最终验收依据。

---
*每执行2次查看/浏览器/搜索操作后更新此文件*
*防止视觉信息丢失*

## 2026-06-05 继续审计：用户最新反馈复现
- 用户最新反馈明确两点：顶部空白过多；右侧按钮点击后抽屉盒子里很多元素仍看不到。
- 390×844 移动端运行时复现到：`.content-layout` 当前 `margin-top=96px`，标题从 `y=96` 开始，确实形成明显顶部空白。
- 点击右侧“文档大纲”后，`.outline-container` 虽然有 `z-index=3000` 且元素命中顺序在正文之上，但 `background var(--background)` 实际计算为 `rgba(0,0,0,0)`；根变量中 `--background` 为空，`--b3-theme-background=#fff`。因此抽屉内容叠在大标题上，视觉上像层级不足/大量内容不可见。
- 当前右侧抽屉展开尺寸：`x=12,y=96,w=326,h=732,right=52`，右侧按钮 `z-index=3001`；问题核心不是按钮本身，而是抽屉面板背景透明、顶部跟随 96px 空白，以及移动按钮占据顶部导致内容区不得不下移。
- 结论：下一步只做移动端 CSS 修复：去掉 96px 顶部预留；把左右浮动按钮改为侧边中部悬浮，避免与标题文字耦合；右侧抽屉使用明确的实体背景和更高面板层级。

## 2026-06-09 右侧按钮二次点击不能 toggle
- 用户确认移动端视觉修复基本通过，但右侧按钮展开后再次点击无法关闭。
- 复盘上一版 CSS：展开态 `.outline-aside:not(.outline-collapsed)` 使用 `pointer-events none` 让遮罩层不截获正文/按钮事件；`.outline-container` 已恢复 `pointer-events auto`，但 `.collapsed-buttons` 未显式恢复。
- 根因：右侧按钮组是 `.outline-aside` 子元素，展开态可能继承/受父容器 pointer-events 影响，导致第二次点击不能触发 `toggleModule`。
- 修复：移动端 `.collapsed-buttons` 和 `.collapsed-btn` 显式设置 `pointer-events auto`，只恢复按钮点击，不改变视觉布局和业务逻辑。

## 2026-06-09 左侧文档树按钮挡正文
- 用户截图确认：移动端左侧文档树按钮位于正文左边缘中部，会遮挡段落文字，视觉上和正文耦合。
- 修复策略：不再把文档树按钮放在左侧正文边缘；移动端将其放到右侧浮动工具轨道上方，与大纲/AI 按钮形成同一条操作区，释放左侧阅读区域。
- 保持不变：文档树按钮组件、点击事件、文档树开关逻辑不变；仅移动端 CSS 位置调整。
