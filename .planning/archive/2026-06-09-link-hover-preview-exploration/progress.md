# 进度日志

## 会话：2026-06-09

### 当前状态
- **阶段：** 1 - 需求与约束整理
- **开始时间：** 2026-06-09

### 已执行操作
- 读取 `planning-with-files-zh` 技能说明。
- 读取现有活跃计划 `.planning/2026-06-05-mobile-share-reading-width/`，确认其是旧的移动端阅读宽度任务。
- 新建本需求规划目录 `.planning/2026-06-09-link-hover-preview-exploration/`。
- 将用户截图中的参考悬浮预览体验与本次需求记录到 `findings.md`。
- 将 `.planning/.active_plan` 切换到本需求；旧计划目录保留未归档。

### 测试结果
| 测试 | 预期 | 实际 | 状态 |
|------|------|------|------|
| 规划初始化 | 新需求有独立规划文件 | 已创建 task_plan/findings/progress | 通过 |

### 错误
| 错误 | 解决方案 |
|------|---------|

### 阶段 2 初步结构查看
- 查看根目录、workspace、`apps/app/package.json` 与 `nuxt.config.ts`。
- 查看 Nuxt pages、static content 组件目录与分享页相关搜索结果。
- 关键发现已同步到 `findings.md`。

### 阶段 2 细查：数据获取、链接转换、设置来源
- 查看 `pages/s/[id].vue`、`Detail.vue`、`Main.vue`、`useAuthModeFetch.ts`。
- 查看 `05.domparser.static.client.ts`、`useStaticBlockRef.ts`、左侧文档树组件和 app config。
- 查看免费版设置 UI 与 git 状态。
- 发现一次非阻塞命令问题：未引用 `apps/app/pages/s/[id].vue` 导致 zsh 将 `[]` 当 glob，已用引号重试成功。
- 关键发现已同步到 `findings.md`。

### 阶段 3-5 方案输出
- 基于项目现状形成 Nuxt 客户端插件方案。
- 明确事件委托、内部链接识别、按需获取、缓存、预览渲染、钉住/关闭状态机、配置字段与实施路线。
- 方案内容已写入 `findings.md`，本轮未修改功能代码。

### 工作区状态备注
- 本轮悬浮预览方案探索只新增/更新 `.planning` 文件，未主动实现链接悬浮预览功能代码。
- 后续检查到工作区存在其他移动端/文档树相关未提交改动：`left/Index.vue`、`left/MenuItem.vue`、`right/Index.vue` 以及未跟踪 `apps/app/composables/useDocTreeSource.ts`。这些不属于本次悬浮预览方案实现，暂不处理，避免误删用户/其他任务改动。

### 方案重写：接受 iframe 页面思维
- 用户指出上一版自建 preview renderer 方案复杂且不直接，要求按页面思维重写。
- 已将 `findings.md` 中新增“页面思维 iframe 预览优先”的反思与新方案。
- 后续如进入实现，应以 iframe 悬浮预览为主，不再走 editorDom 摘要/富渲染器路线。

### 边界讨论：无权限、有密码、不存在
- 根据用户要求，补充 iframe 方案在无权限、有密码、不存在、过期、网络失败、跨域等状态下的推荐行为。
- 关键结论：iframe 目标页面是权限和存在性的最终裁决者；不存在/未发布/无权限在预览态不精确区分，避免泄露。

### OpenSpec 提案生成
- 根据最终 iframe 页面预览设计，新增 OpenSpec change：`openspec/changes/add-link-hover-iframe-preview/`。
- 文件包括：`proposal.md`、`design.md`、`tasks.md`、`specs/link-hover-preview/spec.md`。
- 本次只生成规范提案，未实现功能代码。

### OpenSpec 提案中文化
- 根据用户要求，将 `openspec/changes/add-link-hover-iframe-preview/` 下的提案、设计、任务和规格增量正文改为中文。
- 保留 OpenSpec 关键字、文件名、配置字段、路由参数和代码标识为英文。

### OpenSpec 提案中文化
- 按用户要求，将 `openspec/changes/add-link-hover-iframe-preview/` 下 proposal/design/tasks/spec 正文改写为中文。
- 保留 OpenSpec 关键词、文件名、字段名、代码标识和 Requirement/Scenario 等结构关键词为英文。

### OpenSpec 重大修正：content-only preview
- 根据用户指出的重大遗漏，重写 OpenSpec：iframe 悬浮层只展示正文，最多标题。
- 明确 preview mode 必须隐藏 header/footer、左侧文档树、右侧大纲、AI、侧边浮动按钮、主题/深色切换、文档元信息等非正文 UI。
- 增加 minimal-change 约束：不新建重复页面、不复制正文渲染逻辑、不重写侧栏/AI/大纲组件，优先用轻量 `isPreviewMode` 和局部条件渲染/CSS 实现。

### 2026-06-15 OpenSpec apply：iframe content-only hover preview 实现
- 根据 `add-link-hover-iframe-preview` 执行实现。
- 新增 viewer 配置 `linkHoverPreview`，默认开启、默认 sticky、默认 `Escape` 关闭、`showTitle=true`。
- 增强 `useStaticBlockRef.ts`：block-ref 转 `<a>` 时保留 `data-doc-id` 和 `data-share-doc-link="true"`。
- 新增 `apps/app/plugins/020.link-hover-preview.client.ts`：同源内部文档链接 hover/focus 后显示单例 iframe 悬浮预览，追加 `preview=1&from=hoverPreview`，保留 query，提供 loading、超时 fallback、关闭、打开全文、路由切换清理和递归预览禁止。
- 修改 `Detail.vue`、`content/Index.vue`、`content/Main.vue`：`preview=1` 下启用 content-only preview mode，只保留正文和可选标题；隐藏 header/footer、文档树、大纲、AI、侧边按钮、文档元信息和图片预览组件；密码/过期/未分享等状态保持极简内容态。
- 执行 `pnpm --filter @terwer/share-pro-app exec nuxi prepare` 两次，均通过：`[nuxi] ✔ Types generated in .nuxt`。
- OpenSpec tasks 已标记 48/48 完成；真实密码、过期、CSP 阻止等仍建议用对应样例做人工回归。
