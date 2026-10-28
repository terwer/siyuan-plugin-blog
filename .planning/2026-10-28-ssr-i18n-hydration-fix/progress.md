# 进度日志

## 2026-10-28 会话 1

### 已完成
1. 阅读 `apps/app` Nuxt 配置、i18n 文件、静态分享页组件结构。
2. 启动态确认：`nuxt dev` 运行于 4000，provider 运行于 8086，SSR 开启。
3. `curl` 抓取 SSR HTML：
   - 包含 `<div class="sidebar-header">文档树</div>` 与完整文档树菜单
   - 默认 `aside-left sidebarClosed`（`opacity: 0`）
4. 浏览器 DevTools 检查运行时 i18n：
   - `$i18n.locale.value === "zh-CN"`，可用语言 `["en_US", "zh_CN"]`
   - provider 配置 `setting.lang === "zh-CN"`
5. 控制台因果链确认：
   - `Footer.vue` `onBeforeMount` 修改 locale 为 `zh-CN`
   - `Sidebar.vue` 水合时 `static.docTree` 未命中
   - Vue 报 `Hydration text content mismatch`（服务端 `文档树` vs 客户端 `static.docTree`）
6. 代码定位：
   - `components/static/Footer.vue:64-69`
   - `plugins/00.i18n.ts:20-25`
   - `components/static/content/left/Index.vue:24-26,105-111`
7. 创建计划文件。

### 待办
- ~~等待用户确认 SSR 文档树验收口径、桌面默认展开策略、语言优先级。~~
- 用户已澄清：关注点为 i18n 文案；必须兼容各种语言代码写法；详情页与首页都修。

### 验证记录
- `curl` 无异常，SSR 渲染正常（中文存在）。
- 浏览器控制台存在 3 类 intlify 警告 + 1 条水合不匹配。

## 2026-10-28 会话 2：实施修复

### 已修改
1. 新增 `apps/app/utils/i18nLocale.ts`
   - `matchSupportedLocale`：完整匹配 → 语言+书写体系 → 仅语言 三级匹配
   - 兼容 `zh-CN`、`zh_CN`、`zh`、`zh-Hans-CN`、`zh-Hant-TW`、`en-US`、`en_US`、`en`、`en-GB`、大小写混写、`.UTF-8`、`@variant`
2. 新增 `apps/app/composables/useAppLocale.ts`
   - 统一语言优先级：`?lang` → `setting.lang` → 默认语言
   - `applyLocale` 在子组件渲染前调用 `setLocale`
3. `apps/app/plugins/00.i18n.ts`
   - 修复 `locales.value.includes()` 永远为 false 的 bug
   - 改为归一化匹配 + `$i18n.setLocale`
4. `apps/app/components/static/Detail.vue`
   - `getSetting()` 后 `await applyLocale(currentSetting?.lang)`
5. `apps/app/components/static/HomePage.vue`
   - `loadSetting()` 后 `await applyLocale(setting.value?.lang)`
6. `apps/app/components/static/Footer.vue`
   - 删除 `onBeforeMount` 中直接赋值 `locale.value` 的逻辑（水合不匹配直接触发点）
7. `apps/app/composables/useClientThemeMode.ts`
   - `<html lang>` 改为按当前语言动态输出 BCP-47（`zh-CN` / `en-US`）
8. 5 个 Nuxt 配置增加 `fallbackLocale: "zh_CN"`

### 直接验证（localhost:4000，真实 provider）
- 默认页（provider `setting.lang = "zh-CN"`）：
  - SSR 输出 `文档树`
  - 客户端水合后仍为 `文档树`，`static.docTree` 出现 0 次
  - 控制台 0 条 intlify 警告、0 条 hydration mismatch
  - 右侧面板 `文档大纲`、`AI 助手 · 阅读助手` 均正常
- `?lang=en_US` / `en-US` / `EN_us`：SSR + 客户端均为 `Document menu`，无原始 key
- `?lang=zh-CN` / `zh_CN.UTF-8` / `zh-Hans-CN` / `zh-Hant-TW` / `ZH-CN`：均为 `文档树`
- `?lang=fr`：回退站点语言中文
- 文档树客户端跳转后语言保持正确
- 归一化函数 23 个用例全部通过（Node 类型剥离直接执行）
- 浏览器内直接调用 Detail 的 `applyLocale("en-US")`：
  - 返回 `en_US`，标题变为 `Document menu`，`html lang=en-US`，无原始 key

### 验证过程中的弯路
- 曾尝试用本地代理改写 provider 返回 `lang` 来验证非默认语言的服务端路径。
  用户明确要求不要开代理，已停止并清理临时脚本；改为直接验证 + 浏览器内调用组合验证。

## 2026-10-28 会话 3：修复 `[left-sidebar] active element not found`

### 根因（确认为真实 bug，不是单纯日志噪音）
1. `Sidebar.vue` 中 `const activeIndex = props.post.postid` 是普通字符串，
   但滚动函数里写的是 `const activeId = activeIndex.value`，得到 `undefined`。
   选择器 `[data-doc-id="undefined"]` 永远匹配不到 → 每次挂载重试 10 次并输出 11 条警告。
2. 修正取值后发现第二个问题：`[data-doc-id="id"]` 会优先匹配到 `li.el-sub-menu`
   容器。当前文档是父节点时，该容器包含整棵已展开子树（实测高度 8574px），
   而滚动容器可视高度仅 859px，因此「元素是否可见」判断永远失败，导致无限重试。
3. 警告按每次重试输出，放大了控制台噪音。

### 修复
- `activeIndex` 改为 `computed(() => props.post.postid)`，模板高亮与滚动定位共用。
- 滚动目标优先取可见行 `.menu-item-content[data-doc-id]`；
  命中 `el-sub-menu` 容器时回退到其 `.el-sub-menu__title` 可见标题行。
- 只在重试全部失败后输出一次警告，不再每次重试都刷屏。

### 验证
- 顶层文档（`000.「精华」...`）：滚到顶部，`title-active` 正常，无任何警告。
- 深层叶子文档（`关羽`）：`scrollTop=901.5`，激活行在 859px 可视区内居中（误差 0），
  仅一条 `scrolling to: 901.5`，无重试、无警告。
- 叶子项正确获得 `is-active` 高亮。
- 控制台仅剩测试环境图片 404。

