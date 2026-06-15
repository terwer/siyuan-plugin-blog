# Agent 任务:修复和改进链接悬停预览功能

## 上下文
你正在为思源笔记博客插件的 `add-link-hover-iframe-preview` 功能工作。核心实现已完成约 85%,但还存在一些 bug 和需要改进的地方。

## 背景
该功能为分享页中的内部文档链接添加基于 iframe 的悬停预览。当用户将鼠标悬停在指向另一个分享文档的链接上时,会显示一个浮动预览窗口,在 iframe 中以纯内容模式(隐藏头部、底部、侧边栏等)展示目标文档的内容。

## 涉及的文件
1. `/apps/app/plugins/libs/domparser/useStaticBlockRef.ts` - 块引用链接转换
2. `/apps/app/plugins/020.link-hover-preview.client.ts` - 主要的悬停预览插件(462 行)
3. `/apps/app/components/static/Detail.vue` - 带预览模式的入口组件
4. `/apps/app/components/static/content/Index.vue` - 布局组件
5. `/apps/app/components/static/content/Main.vue` - 内容渲染组件
6. `/apps/app/app.config.ts` - 配置类型定义

## 需要修复的关键 Bug

### 🔴 BUG #1: convertALinks 中未定义的变量(P0 - 必须修复)
**文件**: `apps/app/plugins/libs/domparser/useStaticBlockRef.ts`
**行数**: 62-80,特别是第 71-74 行

**问题**:
```typescript
const convertALinks = (rootElement: any) => {
  rootElement.querySelectorAll("span[data-type=\"a\"]").forEach((el: HTMLElement) => {
    const href = el.getAttribute("data-href") ?? "#"
    
    // 创建新的 a 元素
    const newEl = document.createElement("a")
    newEl.href = href
    newEl.target = "_blank"
    newEl.textContent = el.textContent
    
    // ❌ BUG: 'id' 在此作用域中未定义!
    if (id) {
      newEl.dataset.docId = id
      newEl.dataset.shareDocLink = "true"
    }
    
    el.replaceWith(newEl)
  })
}
```

**影响**: 
- 普通超链接(`span[data-type="a"]`)无法被标记为内部文档链接
- 即使这些链接指向内部文档,悬停预览也不会触发
- 这会破坏非块引用的内部链接的功能

**解决方案选项**:
1. 如果 href 匹配内部文档路径模式,从 URL 中提取文档 ID
2. 检查原始 span 是否有 data-id 属性
3. 移除普通链接的数据集分配(如果它们不应该可预览)

**推荐修复方案**:
```typescript
const convertALinks = (rootElement: any) => {
  const docPath = getDocPath()
  
  rootElement.querySelectorAll("span[data-type=\"a\"]").forEach((el: HTMLElement) => {
    const href = el.getAttribute("data-href") ?? "#"
    const id = el.getAttribute("data-id") // Extract data-id from original element
    
    // Create new a element
    const newEl = document.createElement("a")
    newEl.href = href
    newEl.target = "_blank"
    newEl.textContent = el.textContent
    
    // Mark as share doc link if it has doc ID or matches internal path
    if (id || isInternalDocHref(href, docPath)) {
      newEl.dataset.docId = id || extractDocIdFromHref(href, docPath)
      newEl.dataset.shareDocLink = "true"
    }
    
    el.replaceWith(newEl)
  })
}

// 辅助函数:检查 href 是否指向内部文档
const isInternalDocHref = (href: string, docPath: string): boolean => {
  try {
    const url = new URL(href, window.location.origin)
    const segments = url.pathname.split("/").filter(Boolean)
    if (segments.length < 2) return false
    return segments[0] === docPath || INTERNAL_DOC_PATHS.has(segments[0])
  } catch {
    return false
  }
}

// 辅助函数:从 href 提取文档 ID
const extractDocIdFromHref = (href: string, docPath: string): string | null => {
  try {
    const url = new URL(href, window.location.origin)
    const segments = url.pathname.split("/").filter(Boolean)
    if (segments[0] === docPath && segments.length >= 2) {
      return segments[1]
    }
    return null
  } catch {
    return null
  }
}
```

## 需要的改进

### 🟡 改进 #1:添加 CSP/Frame 阻止降级处理(P1)
**文件**: `apps/app/plugins/020.link-hover-preview.client.ts`

**当前状态**: 
- 已有超时处理(第 358-366 行)
- 显示通用错误消息"预览加载失败,可点击打开全文"

**缺失**:
- 检测 iframe 是否被 CSP 头阻止
- 检测 X-Frame-Options 是否阻止嵌入
- 为不同的失败模式提供具体的错误消息

**实现**:
添加 iframe 错误事件监听器:
```typescript
if (iframe) {
  iframe.onerror = () => {
    clearLoadTimer()
    root.classList.remove("share-link-preview--loading")
    root.classList.add("share-link-preview--error")
    if (statusEl) {
      statusEl.textContent = "预览被安全策略阻止，请点击打开全文"
    }
  }
  
  // Also handle load event to detect blank iframes
  iframe.onload = () => {
    clearLoadTimer()
    // Check if iframe content is accessible (same-origin)
    try {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
      if (!iframeDoc || !iframeDoc.body || iframeDoc.body.innerHTML === '') {
        // Might be blocked or empty
        console.warn('Preview iframe may be blocked or empty')
      }
    } catch (e) {
      // Cross-origin, can't check - this is normal for different origins
    }
    root.classList.remove("share-link-preview--loading", "share-link-preview--error")
  }
}
```

### 🟡 改进 #2:验证 Preview Mode 下所有子组件都正确隐藏(P1)

**任务**:审计并验证 preview mode 下所有 UI chrome 元素都被隐藏

**需要检查的组件**:
1. ✅ 头部/底部 - 已在 Detail.vue 中处理(第 229,235 行)
2. ✅ 左侧边栏(文档树) - 已在 content/Index.vue 中处理(第 26 行)
3. ✅ 右侧边栏(大纲/AI) - 已在 content/Index.vue 中处理(第 30 行)
4. ❓ AI 助手组件 - 需要验证它是否尊重 previewMode
5. ❓ 主题/深色模式切换按钮 - 需要验证
6. ❓ 浮动侧边按钮 - 需要验证
7. ✅ 文章元信息栏 - 已在 content/Main.vue 中处理(第 32 行)
8. ✅ 图片预览 - 已在 preview mode 中禁用(第 77 行)

**需要执行的操作**:
检查这些组件并在需要时添加 `v-if="!previewMode"` 或类似的守卫:
- `apps/app/components/static/content/right/Index.vue`
- 任何 AI 助手相关组件
- 主题切换组件
- 浮动操作按钮

### 🟢 改进 #3:将内联样式提取到 Stylus 文件(P2)

**文件**: `apps/app/plugins/020.link-hover-preview.client.ts`(第 188-268 行)

**当前状态**: 样式通过 JavaScript 中的内联 `<style>` 标签注入

**问题**: 
- 不符合项目的 stylus 约定
- 更难维护和主题化
- 没有充分利用项目的 CSS 变量系统

**建议**:
创建 `apps/app/assets/css/link-hover-preview.styl` 并将样式移到那里:
```stylus
.share-link-preview
  position fixed
  z-index 5000
  width min(var(--share-link-preview-width, 460px), calc(100vw - 24px))
  height min(var(--share-link-preview-height, 360px), calc(100vh - 24px))
  max-width min(var(--share-link-preview-max-width, 560px), calc(100vw - 24px))
  background var(--b3-theme-background, var(--el-bg-color, #fff))
  color var(--b3-theme-on-background, var(--el-text-color-primary, #303133))
  border 1px solid rgba(0, 0, 0, 0.12)
  border-radius 12px
  box-shadow 0 14px 40px rgba(15, 23, 42, 0.2)
  overflow hidden
  
  &[hidden]
    display none !important
    
  // ... rest of styles

@media (max-width 768px)
  .share-link-preview
    left 8px !important
    right 8px !important
    top 8px !important
    width calc(100vw - 16px) !important
    height min(70vh, 520px) !important
```

然后在主样式表中导入并从插件中移除内联样式注入。

### 🟢 改进 #4:添加手动测试清单(P1)

**创建**: `openspec/changes/add-link-hover-iframe-preview/MANUAL_TEST_CHECKLIST.md`

**测试场景**:
```markdown
# 链接悬停预览手动测试清单

## 基本功能
- [ ] 将鼠标悬停在块引用链接上会在延迟后显示预览
- [ ] 预览正确显示目标文档内容
- [ ] 预览显示文档标题(启用时)
- [ ] 点击链接仍然正常导航
- [ ] 按 Escape 键关闭预览
- [ ] 点击关闭按钮关闭预览
- [ ] 点击"打开全文"在新标签页中打开完整页面

## Preview Mode 显示
- [ ] 预览 iframe 隐藏头部
- [ ] 预览 iframe 隐藏底部
- [ ] 预览 iframe 隐藏左侧边栏(文档树)
- [ ] 预览 iframe 隐藏右侧边栏(大纲/AI)
- [ ] 预览 iframe 隐藏文章元信息栏
- [ ] 预览 iframe 仅显示内容(和可选的标题)
- [ ] 正常页面(不带 ?preview=1)显示所有 UI 元素

## 边界情况
- [ ] 受密码保护的文档在预览中显示密码表单
- [ ] 可以在预览 iframe 内验证密码
- [ ] 密码验证后,"打开全文"保留 key 参数
- [ ] 过期文档在预览中显示过期状态
- [ ] 未分享文档在预览中显示未分享状态
- [ ] 不存在的文档在预览中显示未找到状态
- [ ] 外部链接不会触发预览
- [ ] 跨域链接不会触发预览

## Sticky 行为
- [ ] 鼠标离开链接后预览仍然可见(sticky 默认)
- [ ] 悬停在另一个链接上将预览切换到新目标
- [ ] 导航到不同路由时预览关闭

## 移动端/响应式
- [ ] 预览在桌面浏览器上正常工作
- [ ] 预览适应移动视口(< 768px)
- [ ] 触摸设备不会意外触发预览

## 性能
- [ ] 多次快速悬停不会创建多个预览
- [ ] 预览容器被重用(不是每次都重新创建)
- [ ] 打开/关闭多次预览后没有内存泄漏

## 配置
- [ ] 将 linkHoverPreview.enabled 改为 false 会禁用功能
- [ ] 更改 hoverDelay 会影响预览显示时机
- [ ] 将 stickyDefault 改为 false 会使预览自动隐藏
- [ ] 配置更改生效(可能需要刷新)
```

### 🟢 改进 #5:增强错误消息(P2)

**文件**: `apps/app/plugins/020.link-hover-preview.client.ts`

**当前**: 通用的"加载中..."和"预览加载失败,可点击打开全文"

**增强**: 根据失败类型提供更具体的消息:
```typescript
// 超时
statusEl.textContent = "预览加载超时,请点击打开全文"

// 网络错误
statusEl.textContent = "网络连接失败,请点击打开全文"

// 被安全策略阻止
statusEl.textContent = "预览被安全策略阻止,请点击打开全文"

// 目标未找到(如果可检测)
statusEl.textContent = "目标文档不存在或无法访问"
```

### 🟢 改进 #6:添加无障碍访问增强(P2)

**文件**: `apps/app/plugins/020.link-hover-preview.client.ts`

**当前**: 关闭按钮上有基本的 aria-label

**缺失**:
- 键盘导航(Tab 键支持)
- 预览打开时的焦点陷阱
- 状态变化的屏幕阅读器通知
- 用于更好语义的角色属性

**实现**:
```typescript
// Add role and aria attributes
root.setAttribute("role", "dialog")
root.setAttribute("aria-modal", "true")
root.setAttribute("aria-labelledby", "share-link-preview-title")

// Add id to title element for aria-labelledby
titleEl.id = "share-link-preview-title"

// Trap focus when preview is open
const trapFocus = (event: KeyboardEvent) => {
  if (event.key !== 'Tab' || root.hidden) return
  
  const focusableElements = root.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  const firstFocusable = focusableElements[0] as HTMLElement
  const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement
  
  if (event.shiftKey) {
    if (document.activeElement === firstFocusable) {
      event.preventDefault()
      lastFocusable.focus()
    }
  } else {
    if (document.activeElement === lastFocusable) {
      event.preventDefault()
      firstFocusable.focus()
    }
  }
}

document.addEventListener("keydown", trapFocus, true)
```

## 实施优先级

### 第一阶段:关键修复(首先执行)
1. ✅ 修复 BUG #1:convertALinks 中未定义的变量
   - 这阻碍了普通链接的功能
   - 预计时间:15 分钟

### 第二阶段:重要改进(其次执行)
2. ✅ 添加 CSP/Frame 阻止降级检测
   - 改善边界情况的用户体验
   - 预计时间:30 分钟

3. ✅ 验证所有子组件在 preview mode 下隐藏
   - 确保干净的纯内容显示
   - 预计时间:45 分钟

4. ✅ 创建手动测试清单
   - 启用适当的验证
   - 预计时间:20 分钟

### 第三阶段:锦上添花(最后执行)
5. ⏸️ 将内联样式提取到 stylus 文件
   - 更好的代码组织
   - 预计时间:40 分钟

6. ⏸️ 增强错误消息
   - 更好的用户体验
   - 预计时间:20 分钟

7. ⏸️ 添加无障碍访问增强
   - 更好的包容性
   - 预计时间:60 分钟

## 成功标准

完成此任务后:
1. ✅ 无 TypeScript/lint 错误
2. ✅ 所有内部文档链接(块引用和普通链接)都能触发预览
3. ✅ Preview mode 正确隐藏所有 UI chrome 元素
4. ✅ 对被阻止/失败的 iframe 加载有优雅的降级
5. ✅ 创建手动测试清单并至少验证基本场景
6. ✅ 正常页面显示(不带 ?preview=1)无回归问题

## 测试说明

进行更改后:
1. 运行 `pnpm dev` 或 `pnpm dev:all` 启动开发服务器
2. 导航到包含内部文档链接的分享页
3. 测试块引用和普通链接
4. 验证预览显示纯内容模式
5. 测试边界情况(密码、过期等)
6. 验证正常页面仍然正常工作

## 注意事项

- 实现采用"页面优先"方法,使用 iframe 而不是从 JSON 重建内容
- Preview mode 使用轻量级条件渲染,不是单独的页面
- 父页面不判断目标权限;目标页面是权威来源
- 插件正确防止 iframe 中的递归预览
- 配置从 localStorage 读取,具有合理的默认值

## 需要澄清的问题

如果有任何不清楚的地方:
1. 普通超链接(`span[data-type="a"]`)应该总是可预览的,还是只有指向内部文档的链接?
2. 首选的错误消息语气是什么(技术性 vs 用户友好)?
3. 除了 Escape 之外,是否应该支持其他键盘快捷键(例如,箭头键在链接之间导航)?
4. 预览 UI 是否有特定的主题/配色方案要遵循?

---

**预计总时间**:所有阶段 2-3 小时
**风险级别**:低(隔离的更改,通过手动测试有良好的现有测试覆盖)
**依赖项**:无(自包含功能)
