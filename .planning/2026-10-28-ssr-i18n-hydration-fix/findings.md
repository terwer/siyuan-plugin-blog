# 研究发现：SSR 文档树与 i18n 原始 key

## 1. 复现环境
- 页面：`http://localhost:4000/x/20260324172422-7srxrel`
- 启动方式：`apps/app/script/dev.sh`（先备份 `nuxt.config.ts`，再用 `nuxt.node.config.ts` 启动，SSR 开启）
- 运行进程：`nuxt dev --host`（PID 4631，端口 4000）
- 环境变量：`NUXT_PUBLIC_PROVIDER_MODE=true`，provider `http://localhost:8086`
- provider 返回的静态配置真实值：`"lang": "zh-CN"`（注意是连字符 BCP-47，不是 `zh_CN`）

## 2. 关键证据

### 2.1 SSR HTML 实际包含文档树
```bash
curl -s http://localhost:4000/x/20260324172422-7srxrel -o /tmp/page.html
```
- 文件大小 120299 字节，HTTP 200
- `文档树` 出现 1 次，`static.docTree` 出现 0 次
- 侧栏 HTML：
  ```html
  <aside class="el-aside aside-left sidebarClosed" ...>
    <div class="el-scrollbar sidebar-container aside-sidebar" ...>
      <div class="sidebar-header" ...>文档树</div>
      <ul class="el-menu ... sidebar-menu" ...>
        ... 000.「精华」特性专属测试 / 001.callout支持 / 002.代码块 / 丁原 / 丁管 ...
  ```
- 带 `?from=docTree` 时类名为 `sidebarOpen`，`文档树` 同样存在

结论：**SSR 确实渲染了文档树中文**。但默认 `sidebarClosed` 规则为 `opacity: 0; pointer-events: none`（`components/static/content/left/Index.vue:105-111`），所以首屏视觉不可见；折叠按钮 `SidebarButton` 只在客户端 `onMounted` 后 Teleport 到 body 才会出现。禁用 JS 时用户完全看不到文档树。

### 2.2 客户端运行时语言被破坏
在浏览器中读取：
```js
$i18n.locale.value            // "zh-CN"
$i18n.availableLocales        // ["en_US", "zh_CN"]
$i18n.t('static.docTree')     // "static.docTree"（未命中）
```
- `locale = "zh-CN"` 不在可用语言列表中，对应消息不存在
- intlify 将消息域报告为 `'zh'`：`Not found 'static.docTree' key in 'zh' locale messages.`

### 2.3 控制台完整因果链
```
[intlify] Not found 'blog.share' key in 'zh' locale messages.
  at Detail.vue:113  ← Promise.then ← Footer.vue:25 useClientThemeMode setup
[intlify] Not found 'static.docTree' key in 'zh' locale messages.
  at Sidebar.vue:231
[Vue warn]: Hydration text content mismatch
  - rendered on server: 文档树
  - expected on client: static.docTree
[Vue warn]: Hydration completed but contains mismatches.
[intlify] Not found 'static.outline' key in 'zh' locale messages.
[intlify] Not found 'ai.assistant.title' key in 'zh' locale messages.
```
- 服务端用默认 `zh_CN` 渲染出中文
- 客户端在 `Footer.vue` 的 `onBeforeMount` 把全局 locale 改成 `"zh-CN"`，导致后续水合子树按无效语言渲染出原始 key
- 右侧大纲/AI 面板是客户端就绪后才渲染，因此全部显示原始 key

## 3. 根因明细

### 根因 A（直接原因）：语言代码未归一化
- `components/static/Footer.vue:64-69`
  ```ts
  onBeforeMount(() => {
    if (props.setting?.lang) {
      locale.value = props.setting?.lang as any
    }
  })
  ```
- `setting.lang` 来自 provider 用户配置，真实值为 `zh-CN`
- 应用支持的语言为 `zh_CN` / `en_US`
- 结果：消息查找全部失败，所有 `t()` 返回 key，并触发水合不匹配

### 根因 B（结构性原因）：SSR 与 CSR 应用语言的时机不一致
- 服务端从不读取 `setting.lang`，始终用默认 `zh_CN` 渲染
- 客户端只在 `Footer` 挂载后修改 locale
- 即使 `setting.lang` 是合法的 `en_US`，也会出现「服务端中文 → 客户端英文」的水合不匹配
- `Footer` 挂载时机晚于部分子树（异步组件）水合，属于竞态触发点

### 根因 C：`?lang=` 处理失效
- `plugins/00.i18n.ts:21`
  ```ts
  if (i18n.locales.value.includes(route.query.lang)) {
  ```
- Nuxt i18n v10 的 `locales.value` 是语言对象数组，不是字符串数组，`includes("en_US")` 永远为 `false`
- 因此带 `?lang=` 时总是回落到 `defaultLocale`，且服务端/客户端行为可能不一致

### 根因 D（SSR 可见性）：
- `components/static/content/left/Index.vue:24-26` 初始 `sidebarVisible` 仅当 `?from=docTree` 且非移动端时为 `true`
- 默认 `sidebarClosed` → `opacity: 0`
- SSR HTML 有内容但不可见，必须依赖客户端 JS 点击按钮才能看到
- 右侧大纲面板 `effectiveShowSidebar` 依赖 `isPageInteractiveReady`，SSR 输出为空属于现有设计

## 4. 受影响文件
| 文件 | 影响 |
|------|------|
| `apps/app/components/static/Footer.vue` | 直接设置无效 locale，触发本次故障 |
| `apps/app/components/static/Detail.vue` | 加载 setting 后未同步语言；SSR/CSR 一致性修复入口 |
| `apps/app/components/static/HomePage.vue` | 同样加载 setting，需要同步语言 |
| `apps/app/plugins/00.i18n.ts` | `?lang` 判断错误 |
| `apps/app/components/static/content/left/Index.vue` | 文档树默认折叠，SSR 不可见 |
| `apps/app/components/static/content/left/SidebarButton.vue` | 折叠按钮仅客户端渲染 |
| `apps/app/components/static/content/right/Index.vue` | 客户端就绪后才渲染，原始 key 暴露点 |

## 5. 修复备选方案

### 方案 1（推荐）：统一语言归一化 + 在 Detail/HomePage 数据就绪后同步语言
- 新增工具函数（如 `apps/app/utils/i18n.ts` 或 `composables/useAppLocale.ts`）：
  - 将 `zh-CN` / `zh_cn` / `zh-Hans` / `zh` 归一化为 `zh_CN`
  - 将 `en-US` / `en` 归一化为 `en_US`
  - 只接受 `availableLocales` 内的值
- `Detail.vue` 在 `loadPageData()`（服务端与客户端都会执行）之后 `await setLocale(target)`，保证 SSR 与 hydration 使用同一语言
- `HomePage.vue` 同理
- `Footer.vue` 删除语言赋值逻辑
- 修复 `plugins/00.i18n.ts` 使用同一归一化函数与 `setLocale`
- 优点：一处归一化，SSR/CSR 一致；可兼容 provider 历史数据
- 风险：服务端渲染中途切语言需验证消息已加载（当前构建消息为内联，`setLocale` 亦可异步加载）

### 方案 2：仅修 Footer 使用归一化 + 校验可用语言
- 改动最小，只解决原始 key 与水合不匹配（因为归一化后 `zh-CN → zh_CN` 与服务端一致）
- 缺点：`en-US` 场景仍会「服务端中文 → 客户端英文」不匹配；结构性问题未解决
- 结论：可作为兜底，但不彻底

### 方案 3：文档树 SSR 可见性
- 3A 保持现状：默认折叠，接受 SSR 文本不可见（仅 SEO 源码可见）
- 3B 桌面端默认展开：`sidebarVisible` 初始值改为「有 docTree 且非移动端」，SSR 输出 `sidebarOpen`，首屏即可见；移动端仍默认折叠
- 3C 仅服务端默认展开、客户端保持折叠：会造成水合类名不一致，不推荐

## 6. 待确认
1. ~~“SSR 完全没有渲染文档树”的验收口径~~ 用户已澄清：关注 i18n 文案。
2. ~~桌面端是否要默认展开文档树~~ 用户已澄清：不是侧栏交互问题。
3. ~~`?lang=` 与 `setting.lang` 的优先级~~ 已确定：可识别的 `?lang` 优先。

## 7. 附带发现：左侧文档树滚动定位失效（已修复）
- 位置：`apps/app/components/static/content/left/Sidebar.vue`
- Bug 1：`activeIndex` 是普通字符串，却按 `activeIndex.value` 读取 → `undefined`，
  `[data-doc-id="undefined"]` 永远匹配失败，挂载后重试 10 次输出 11 条警告。
- Bug 2：`[data-doc-id="id"]` 会优先命中 `li.el-sub-menu` 容器；当前文档为父节点时，
  容器包含整棵展开子树（实测 8574px），滚动容器仅 859px，可见性判断永远失败。
- 修复：`activeIndex` 改为 computed；滚动目标优先 `.menu-item-content`，
  子菜单容器回退到 `.el-sub-menu__title`；失败警告只在重试结束后输出一次。
- 验证：顶层文档 `scrollTop=0`；深层文档（关羽）`scrollTop=901.5`，激活行精确居中。
