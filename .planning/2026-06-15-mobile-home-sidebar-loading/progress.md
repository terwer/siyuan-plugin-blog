# 进度日志

## 会话：2026-06-15

### 已执行操作
- 读取项目现有活跃计划，发现与当前任务无关。
- 新建本任务规划目录并切换 active plan。

### 测试结果
| 测试 | 预期 | 实际 | 状态 |
|------|------|------|------|

### 错误
| 错误 | 解决方案 |
|------|---------|
| 初始 `find` 命令中 zsh 通配无匹配 | 改用明确 `find`/`rg` 命令 |
| Chrome DevTools `list_pages` profile 冲突 | 暂以源码定位为主，必要时再处理浏览器上下文 |

### 源码定位
- 读取 `static/HomePage.vue`、`static/Detail.vue`、`static/content/Index.vue`、`static/content/right/Index.vue`、`usePageInteractiveReady.ts`。
- 确认 loading 骨架阶段没有挂载右侧组件，因此右侧不可交互提示无法出现。
- 确认右侧栏理论上已经通过 `effectiveShowSidebar` 避免未 ready 时参与 flex 占位，但还需要运行时验证是否有残余空白来自外层容器或 loading 分支。

### 纠错与真实修复
- 用户指出前一版对 `./dev.sh` 无效。复核后确认：`Detail.vue/HomePage.vue` loading 骨架分支不是 `./dev.sh` 目标页的真实问题链路。
- 已撤回 `HomePage.vue` 与 `Detail.vue` 的 loading rail 改动。
- 修改 `apps/app/components/static/content/right/Index.vue`：拆开右侧 Teleport 的 loading placeholder 与 ready buttons 条件，使不可交互阶段也能显示 `.mobile-action-rail-placeholder`，但真实按钮仍在 mounted/ready 后显示。
- 执行 `pnpm --filter @terwer/share-pro-app exec nuxi prepare` 通过。
- 用 `./dev.sh` + Chrome DevTools 慢网移动端验证：加载态右侧 placeholder 可见，且没有 `.outline-placeholder` flex 占位；ready 后按钮恢复。

### 用户复测失败：加载态仍有右侧按钮空白
- 用户确认 loading 已出现，但加载态右侧仍然保留按钮轨道空白，判定不通过。
- 下一步修正方向：加载态内容区不再为右侧按钮轨道让位；loading 指示改成贴边非占位显示。

### 第二轮修复：加载态不再占右侧按钮空白
- 修改 `apps/app/components/static/content/right/Index.vue`：加载态不再 Teleport 右侧 placeholder；右侧按钮组只在 `isPageInteractiveReady && isClientMounted` 后挂载。
- 修改 `apps/app/components/static/content/Index.vue`：加载态加 `content-layout--loading`，用居中 spinner 表示加载；强制正文相关容器在加载态铺满 `100vw`，消除右侧 10px 残留空白。
- 执行 `pnpm --filter @terwer/share-pro-app exec nuxi prepare` 通过。
- 使用 `./dev.sh` + Chrome DevTools Slow 3G 移动端 390px 验证：加载态所有核心内容块到 `right=390`，右侧按钮/placeholder/侧栏均不渲染。

### 移动端体验问题 99 分后续修复
- 用户明确两个问题仅限移动端：
  1. loading 时底部遮挡正文太多。
  2. 文档树按钮点击后收起时仍高亮，和右侧两个按钮不统一。
- 修改 `apps/app/components/static/content/Index.vue`：仅在 `max-width: 768px` 的 loading 态下，将 spinner 从视口中心移动到右下角 `right:12px; bottom:12px`，并解除 `.protyle/.protyle-content/.main-content` 在 loading 态的高度/overflow 裁剪，避免正文底部被大片遮挡。
- 修改 `apps/app/components/static/content/left/SidebarButton.vue`：仅移动端将文档树按钮 active 态改为普通白底按钮风格，打开/收起都与右侧按钮组保持一致；桌面 active 态不改。
- 修改 `apps/app/composables/usePageInteractiveReady.ts`：补充客户端 DOM ready/load 兜底，解决 clean dev 下偶发 `readyState=complete` 但 `page-interactive-ready` 仍 false 导致按钮不挂载的问题。
- 执行 `pnpm --filter @terwer/share-pro-app exec nuxi prepare` 通过。注意：该命令在 `./dev.sh` 运行中执行会让 Nuxt dev manifest 进入 404 异常态，已重启 `./dev.sh` 后重新验证。

### 最终验证
- `./dev.sh` 重新干净启动成功，页面 `http://localhost:4000/s/20260329025638-3ne0z7i` 在移动端 `390×844 DPR=3` 验证。
- Fast 4G 完成态：`content-layout` 不含 `content-layout--loading`，`$spage-interactive-ready=true`；文档树按钮打开/关闭后均为白底普通风格，右侧两个按钮也为白底普通风格。
- Slow 3G loading 态：`content-layout--loading` 存在；核心正文容器宽度均为 `390/right=390`；`.sidebar-button/.collapsed-buttons/.collapsed-btn/.outline-container` 均未出现；spinner 位于 `right=12px/bottom=12px`，尺寸 `24×24`；正文高度不再被裁剪。
