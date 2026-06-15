# 发现与证据

## 用户反馈
- 页面：`http://localhost:4000/s/20260329025638-3ne0z7i`
- 当前移动端“饿扁”问题已修复得较好。
- 剩余问题：
  1. 首页不可交互时，右侧 loading 指示/提示完全看不到。
  2. 首页不可交互时，右侧侧边栏仍然留下很大空白，必须解决。

## 代码/运行时发现
- 待补充。

## 2026-06-15 源码定位阶段发现
- 首页 `/` 入口是 `apps/app/pages/index.vue` → `components/static/HomePage.vue`。
- 首页加载设置时 `HomePage.vue` 的 `isLoading` 分支只渲染 `el-container/el-main/el-skeleton`，不会渲染 `static-content-right`，因此右侧工具/加载指示不会出现。
- 分享页 `/s/:id` 入口是 `apps/app/pages/s/[id].vue` → `components/static/Detail.vue`，加载文档时 `Detail.vue` 的 `isLoading` 分支只渲染 `.detail-loading` 骨架屏，也不会渲染右侧栏。
- 正文布局入口 `components/static/content/Index.vue` 固定包含左侧、正文、右侧三个子组件；当前源码中移动端 `.main-content` 已是 `padding-right 0`。
- 右侧功能栏 `components/static/content/right/Index.vue` 已有 `effectiveShowSidebar = isPageInteractiveReady && showSidebar`，意图是在页面未 ready 时不让右侧栏进入 flex 布局；同时 Teleport 中在未 ready 时显示 `.mobile-action-rail-placeholder`。
- 但 `.mobile-action-rail-placeholder` 仅存在于 `static-content-right` 已挂载且存在可见模块时；首页/详情加载骨架阶段并不挂载它，所以用户看到“不可交互时右侧 loading/指示看不到”与此链路一致。
- 当前工作区已有未提交改动：`right/Index.vue` 中 `isClientMounted` 与 Teleport 延后挂载；`left/SidebarButton.vue` 移动端按钮右侧工具轨样式。后续只做增量最小改动，不回滚已有修复。

## 2026-06-15 修正后的真实根因（以 `./dev.sh` 为准）
- 前一版判断错误：`./dev.sh` 使用 `nuxt.node.config.ts` SSR serve，目标分享页首屏已经带正文，不会命中 `Detail.vue/HomePage.vue` 的 `isLoading` 骨架分支；那条修复已撤回。
- 真实参与目标页加载/不可交互阶段的是 `components/static/content/right/Index.vue` 中的右侧工具轨。
- 当前工作区已有 `isClientMounted` gate：`<Teleport v-if="isClientMounted && visibleModules.length > 0" to="body">`。这会把未交互阶段本该显示的 `.mobile-action-rail-placeholder` 一起挡掉，导致右侧 loading/指示完全看不到。
- 修复后：右侧 Teleport 不再被 `isClientMounted` 整体拦截；未 ready 时直接渲染 `.mobile-action-rail-placeholder`，ready 且 mounted 后才渲染真实 `.collapsed-buttons`。这样 placeholder 不参与 flex 布局，且右侧栏本体仍受 `effectiveShowSidebar` 控制，不会造成正文右侧大空白。

## `./dev.sh` 浏览器验证证据
- 环境：`./dev.sh`，Chrome DevTools 移动端 `390×844 DPR=3`，Slow 3G。
- 加载早期采样：`document.readyState=loading`，`.mobile-action-rail-placeholder` 存在，位置 `x=384,w=4`；`.outline-aside/.outline-placeholder/.outline-container` 均不存在，未占用 flex 宽度。
- 加载中后段采样：`document.readyState=interactive`，placeholder 仍存在，位置 `x=384,w=4`，正文 `.main-content w=380`。
- 完整 ready 后采样：`.collapsed-buttons` 恢复，位置 `x=350,w=32,h=72`；`.mobile-action-rail-placeholder` 消失；正文 `.main-content w=380`，页面 `scrollWidth=390`。

## 2026-06-15 第二轮复测失败后的修正
- 用户复测指出：loading 已出现，但加载态右侧仍占用按钮空白，不通过。
- 重新采样确认：右侧按钮/placeholder 已不渲染，但 `.protyle-title/.protyle-wysiwyg` 仍只到 `right=380`，视口 `innerWidth=390`，剩余 10px 空白来自正文块自身的加载态宽度，而不是右侧按钮组件。
- 新修复：加载态不再在右侧渲染条状 placeholder；改为 `.content-layout--loading::after` 居中 spinner；同时仅在 `.content-layout--loading` 下强制 `.protyle/.protyle-content/.protyle-title/.post-meta/.protyle-wysiwyg` 为 `100vw`。
- 最新 `./dev.sh` + Slow 3G + 390px 采样：加载态 `.content-layout/.main-content/.protyle/.protyle-content/.protyle-title/.post-meta/.protyle-wysiwyg` 均 `w=390,right=390`；`.outline-aside/.outline-placeholder/.outline-container/.collapsed-buttons/.mobile-action-rail-placeholder/.sidebar-button` 均未出现。

## 2026-06-15 移动端 99 分后续问题证据
- 用户明确边界：两个问题均仅指移动端。
- loading 遮挡正文的实际原因：上一版居中 fixed spinner 位于正文中部，并且 loading 态 `.protyle/.protyle-content` 高度被压到首屏片段，造成视觉上底部正文被遮/被裁剪。
- 文档树按钮格格不入的原因：移动端 `.sidebar-button-active` 使用蓝色主题态，而右侧 `.collapsed-btn` 非 active 时是白底普通按钮；用户期望收起后不残留 hilight。最终为移动端统一文档树按钮 active/hidden 均为白底普通风格。
- 验证中踩坑：在 `./dev.sh` 运行时执行 `nuxi prepare` 会导致 Nuxt dev manifest `/_nuxt/builds/meta/dev.json` 404，页面保持 `content-layout--loading`。该状态不是业务正常态，已重启 `./dev.sh` 后干净验证。

## 2026-06-15 移动端正文两端对齐证据
- 普通正文顶层段落：`.protyle-wysiwyg > div > [data-type="NodeParagraph"]`，computed style 已为 `text-align: justify; text-align-last: left`。
- 列表内段落虽也是 `NodeParagraph`，但位于 `NodeListItem` 内；实测没有命中本次选择器，仍为 `text-align: start`，符合“不动列表”的边界。
