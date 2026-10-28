# 任务计划：修复 SSR 中文渲染丢失与客户端 i18n 原始 key（含水合不匹配）

## 目标
恢复分享页（例如 `/x/20260324172422-7srxrel`）的服务端渲染与国际化：SSR 输出可见的中文文档树，客户端水合后不再出现 `static.docTree`、`static.outline`、`ai.assistant.title` 等原始 key，控制台不再出现 `Hydration text content mismatch` 与 `[intlify] Not found ...` 警告。

## 当前阶段
阶段 4：实施修复

## 各阶段

### 阶段 1：复现与证据固化
- [x] 在真实开发服务器 `http://localhost:4000` 复现问题
- [x] 抓取 SSR HTML 并与客户端 DOM 对比
- [x] 抓取浏览器控制台警告与运行时 `$i18n` 状态
- [x] 将证据写入 `findings.md`
- **状态：** complete

### 阶段 2：根因确认
- [x] 确认 i18n 根因：`setting.lang = "zh-CN"` 覆盖了合法的 `zh_CN`
- [x] 确认 SSR/CSR 语言应用时机不一致（服务端不应用 setting.lang，客户端在 Footer 挂载时才应用）
- [x] 确认文档树 SSR 输出存在但默认被隐藏（`sidebarClosed` → `opacity: 0`）
- [x] 确认 `plugins/00.i18n.ts` 的 `?lang` 判断永不成立
- **状态：** complete

### 阶段 3：修复方案确认
- [x] 用户澄清：问题指 i18n 文案，不涉及侧栏默认展开策略
- [x] 用户要求：必须兼容各种语言代码写法，不能依赖简单的 fallback
- [x] 用户要求：详情页与首页都要修复
- [x] 确定最终技术方案并写入本文件
- **状态：** complete

### 阶段 4：实施修复
- [x] 新增语言代码归一化与统一应用逻辑
- [x] 在服务端与客户端相同的渲染时机应用语言（Detail / HomePage）
- [x] 修复 `plugins/00.i18n.ts` 的 `?lang` 处理
- [x] 为所有构建配置增加 `fallbackLocale`
- [x] 更新 `progress.md`
- **状态：** complete

### 阶段 5：验证
- [x] `curl` 校验 SSR HTML 中包含目标中文且不存在原始 key
- [x] 浏览器控制台零 `Hydration ... mismatch`、零 `[intlify] Not found`
- [x] 验证 `zh-CN` / `zh_CN` / `en-US` / `en_US` / 缺失 lang 五种输入
- [x] 验证 `?lang=en_US` 与 `?lang=en-US`
- [x] 验证桌面端默认页面与文档树客户端跳转
- [x] 归一化函数 23 个用例全部通过
- **状态：** complete

### 阶段 6：附带修复：左侧文档树滚动定位
- [x] 确认 `[left-sidebar] active element not found` 是真实 bug
- [x] 修复 `activeIndex` 误用 `.value` 导致选择器为 `undefined`
- [x] 修复滚动目标误匹配整个展开子树容器的问题
- [x] 警告改为重试全部失败后只输出一次
- [x] 顶层与深层文档滚动验证通过
- **状态：** complete

### 阶段 7：交付
- [x] 汇总修改文件与验证证据
- [x] 更新计划状态并交付
- **状态：** complete

## 关键问题
1. 已确认：用户关注的是 i18n 文案（服务端中文被客户端原始 key 覆盖），不是侧栏默认折叠行为。
2. 语言代码必须兼容所有常见写法：`zh-CN`、`zh_CN`、`zh`、`zh-Hans`、`zh-Hans-CN`、`zh-TW`、`en-US`、`en_US`、`en`、`en-GB`、大小写混写、`zh_CN.UTF-8` 等。
3. `?lang=` 与 `setting.lang` 冲突时的优先级：显式 `?lang=` 优先，其次是 `setting.lang`，最后是应用默认语言。

## 已做决策
| 决策 | 理由 |
|------|------|
| 不修改 provider（8086 Java 服务）返回的 `zh-CN` 数据 | viewer 必须兼容上游历史/标准 BCP-47 值，改上游无法覆盖线上存量数据 |
| 新增统一语言归一化函数，按「完整代码 → 语言+书写体系 → 仅语言」三级匹配 | 从用户角度出发，用户不需要关心语言代码如何书写 |
| 语言必须在服务端与客户端使用同一套归一化逻辑，并在数据就绪、子组件渲染前应用 | 否则 SSR 与 hydration 必然出现文本不一致 |
| 不在 `Footer.vue` 中直接赋值 `locale.value` | 挂载时机晚于部分子树水合，是本次 mismatch 的直接触发点 |
| 为 i18n 配置 `fallbackLocale: "zh_CN"` | 任何缺失的英文键回退为中文，而不是向用户暴露原始 key |
| 侧栏默认折叠交互保持不变 | 用户已澄清关注点为 i18n 文案 |
| URL `?lang` 显式指定且可识别时优先于 `setting.lang` | 显式 URL 参数代表用户当次访问意图 |

## 遇到的错误
| 错误 | 尝试次数 | 解决方案 |
|------|---------|---------|
| 无 | - | - |

## 备注
- 随着进度更新阶段状态：pending → in_progress → complete
- 做重大决策前重新读取此计划（注意力操纵）
- 记录所有错误，避免重复
