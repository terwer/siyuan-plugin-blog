<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup lang="ts">
import { List, Opportunity, Paperclip } from "@element-plus/icons-vue"
import type { Component } from "vue"
import type AppConfig from "~/app.config"
import { useViewerCapabilities } from "~/composables/useViewerCapabilities"
import { hasMeaningfulTextContent } from "~/utils/content"

const logger = createAppLogger("right-index")
const route = useRoute()
const props = defineProps<{ post: any, setting: typeof AppConfig }>()
const { aiAssistantSupported } = useViewerCapabilities()

// 当前激活的模块ID
type ModuleId = string

// ==================== 侧边栏功能模块配置 ====================
// 后续增加模块时，只需要补一条定义，不要再去修改切换逻辑本身。
interface SidebarModuleDefinition {
  id: ModuleId
  name: string
  type: "outline" | "ai" | "graph"
  icon: Component
  order: number
  tabBadge?: string
  tabBadgeClass?: string
  isAvailable: () => boolean
  getWidth: () => number
  contentClass: string
  clientOnly?: boolean
  renderContent?: () => Component | null
}
const activeModuleId = ref<ModuleId>("outline")

// 侧边栏显示状态 - 统一控制侧边栏的展开/收起
const showSidebar = useState("sidebar-show", () => false)

const outlineData = computed(() => Array.isArray(props.post?.outline) ? props.post.outline : [])
const outlineMaxDepth = computed(() => props.post?.outlineLevel ?? 6)
const hasOutlineData = computed(() => outlineData.value.length > 0)
const AIPanelComponent = __ENABLE_AI_ASSISTANT__
  ? defineAsyncComponent(() => import("~/components/ai-assistant/AIPanel.vue"))
  : null

// ========== AI 助手功能配置 ==========
// AI 最终值兼容历史默认行为：
// 1. 若 post.aiAssistantEnabled 显式存在，优先以分享后的冻结结果为准
// 2. 若 post 缺失该字段，回退到全局源配置
// 3. 若全局也缺失，则兼容历史默认开启行为
const resolvedAiAssistantEnabled = computed(() => {
  const postValue = props.post?.aiAssistantEnabled

  if (postValue === true || postValue === "true") {
    return true
  }

  if (postValue === false || postValue === "false") {
    return false
  }

  return props.setting?.aiAssistantEnabled !== false
})

// AI 能力由 viewer build capability、分享后的 post 快照和全局兼容回退共同决定
const aiAssistantEnabled = computed(() => aiAssistantSupported.value && resolvedAiAssistantEnabled.value)

// 检查文档内容是否有效（用于判断 AI 功能是否可用）
const hasValidContent = computed(() => {
  return hasMeaningfulTextContent(props.post?.editorDom ?? "")
})

// AI 模块是否应该显示（受 viewer capability、分享快照和内容三重控制）
const showAIModule = computed(() => aiAssistantEnabled.value && hasValidContent.value)

// 从文档树跳转过来时，自动展开大纲（与左侧文档树保持联动）
const isFromDocTree = computed(() => route.query.from === "docTree")

// ==================== 大纲宽度调整功能 ====================
const OUTLINE_WIDTH_KEY = "siyuan-blog-outline-width"
const AI_WIDTH_KEY = "siyuan-blog-ai-width"
const OUTLINE_PINNED_KEY = "siyuan-blog-outline-pinned"
const DEFAULT_WIDTH = 280
const AI_DEFAULT_WIDTH = 380 // AI面板默认更大宽度
const MIN_WIDTH = 200
const MAX_WIDTH = 500

// 大纲宽度状态
const outlineWidth = ref(DEFAULT_WIDTH)
const aiWidth = ref(AI_DEFAULT_WIDTH) // AI面板宽度
const isResizing = ref(false)

// 大纲固定显示状态
// 使用 useState 确保 SSR 和客户端状态一致，避免闪烁
const isPinned = useState("outline-pinned", () => false)

// 从 localStorage 读取保存的宽度
const loadSavedWidth = () => {
  if (process.client) {
    // 读取大纲宽度
    const savedWidth = localStorage.getItem(OUTLINE_WIDTH_KEY)
    if (savedWidth) {
      const width = parseInt(savedWidth, 10)
      if (width >= MIN_WIDTH && width <= MAX_WIDTH) {
        outlineWidth.value = width
      }
    }
    // 读取AI面板宽度 - 如果没有保存过，使用默认最大宽度
    const savedAIWidth = localStorage.getItem(AI_WIDTH_KEY)
    if (savedAIWidth) {
      const width = parseInt(savedAIWidth, 10)
      if (width >= MIN_WIDTH && width <= MAX_WIDTH) {
        aiWidth.value = width
      }
    } else {
      // 首次使用，设置为最大宽度
      aiWidth.value = AI_DEFAULT_WIDTH
    }
  }
}

// 保存宽度到 localStorage
const saveWidth = (width: number) => {
  if (process.client) {
    localStorage.setItem(OUTLINE_WIDTH_KEY, width.toString())
  }
}

// 保存AI面板宽度到 localStorage
const saveAIWidth = (width: number) => {
  if (process.client) {
    localStorage.setItem(AI_WIDTH_KEY, width.toString())
  }
}

// 从 localStorage 读取固定状态
const loadPinnedState = () => {
  if (process.client) {
    const savedPinned = localStorage.getItem(OUTLINE_PINNED_KEY)
    if (savedPinned) {
      const pinnedValue = savedPinned === "true"
      isPinned.value = pinnedValue
      // 如果固定，同步设置 showSidebar 避免闪烁
      if (pinnedValue) {
        showSidebar.value = true
      }
    }
  }
}

// 保存固定状态到 localStorage
const savePinnedState = (pinned: boolean) => {
  if (process.client) {
    localStorage.setItem(OUTLINE_PINNED_KEY, pinned.toString())
  }
}

const moduleDefinitions: SidebarModuleDefinition[] = [
  {
    id: "outline",
    name: "static.outline",
    type: "outline",
    icon: List,
    order: 1,
    tabBadge: "☰",
    tabBadgeClass: "tab-icon",
    contentClass: "outline-content",
    isAvailable: () => hasOutlineData.value,
    getWidth: () => outlineWidth.value,
    renderContent: () => resolveComponent("static-content-right-outline") as Component,
  },
  {
    id: "ai",
    name: "ai.assistant.title",
    type: "ai",
    icon: Opportunity,
    order: 2,
    tabBadge: "AI",
    tabBadgeClass: "tab-icon-ai",
    contentClass: "ai-content",
    clientOnly: true,
    isAvailable: () => showAIModule.value,
    getWidth: () => aiWidth.value,
    renderContent: () => AIPanelComponent,
  },
]

const getModuleDefinition = (moduleId: ModuleId | null) => {
  if (!moduleId) {
    return null
  }

  return moduleDefinitions.find(module => module.id === moduleId) ?? null
}

const getFirstAvailableModuleId = () => {
  return moduleDefinitions
    .filter(module => module.isAvailable())
    .sort((a, b) => a.order - b.order)[0]?.id ?? null
}

const getFirstAvailableModuleIdExcluding = (excludedModuleId: ModuleId) => {
  return moduleDefinitions
    .filter(module => module.id !== excludedModuleId && module.isAvailable())
    .sort((a, b) => a.order - b.order)[0]?.id ?? null
}

const isModuleAvailable = (moduleId: ModuleId | null) => {
  return getModuleDefinition(moduleId)?.isAvailable() ?? false
}

const currentModuleId = computed<ModuleId | null>(() => {
  if (isModuleAvailable(activeModuleId.value)) {
    return activeModuleId.value
  }

  return getFirstAvailableModuleId()
})

const activeSidebarWidth = computed(() => getModuleDefinition(currentModuleId.value)?.getWidth() ?? outlineWidth.value)
const activeModuleDefinition = computed(() => getModuleDefinition(currentModuleId.value))
const activeContentComponent = computed(() => activeModuleDefinition.value?.renderContent?.() ?? null)

// 切换固定显示状态
const togglePin = () => {
  isPinned.value = !isPinned.value
  savePinnedState(isPinned.value)
  // 固定时自动展开侧边栏
  if (isPinned.value) {
    showSidebar.value = true
  }
  logger.info("Outline pinned state:", isPinned.value)
}

// 开始拖拽调整宽度
const startResize = (e: MouseEvent) => {
  e.preventDefault()
  isResizing.value = true

  const startX = e.clientX
  // 根据当前激活的模块决定调整哪个宽度
  const isAIActive = currentModuleId.value === "ai"
  const startWidth = isAIActive ? aiWidth.value : outlineWidth.value

  const handleMouseMove = (moveEvent: MouseEvent) => {
    if (!isResizing.value) { return }

    const deltaX = startX - moveEvent.clientX
    const newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, startWidth + deltaX))

    // 根据当前激活的Tab更新对应的宽度
    if (isAIActive) {
      aiWidth.value = newWidth
    } else {
      outlineWidth.value = newWidth
    }
  }

  const handleMouseUp = () => {
    isResizing.value = false
    // 根据当前激活的Tab保存对应的宽度
    if (isAIActive) {
      saveAIWidth(aiWidth.value)
    } else {
      saveWidth(outlineWidth.value)
    }
    document.removeEventListener("mousemove", handleMouseMove)
    document.removeEventListener("mouseup", handleMouseUp)
    document.body.style.userSelect = ""
    document.body.style.cursor = ""
  }

  document.addEventListener("mousemove", handleMouseMove)
  document.addEventListener("mouseup", handleMouseUp)
  document.body.style.userSelect = "none"
  document.body.style.cursor = "col-resize"
}

// 当前激活的节点 ID
const activeNodeText = ref("")

// 清理节点文本（与 OutlineItem.vue 的 adjustItemName 保持一致）
const cleanNodeText = (text: string) => {
  if (!text) { return "" }
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, "\"")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\n/g, " ")
    .replace(/：/g, "")
    .replace(/:/g, "")
    .replace(/,/g, "")
    .replace(/<[^>]+>/g, (match) => {
      const textContent = match.match(/>([\s\S]*?)</)
      return textContent ? textContent[1] : ""
    })
    .trim()
}

const onScroll = () => {
  // 获取页面中所有符合条件的节点
  const nodes = document.querySelectorAll("[data-subtype^=\"h\"]")
  if (!nodes.length) {
    logger.warn("No nodes with data-subtype found")
    return
  }

  // 找到距离视口顶部最近的节点
  let closestNode: any = null
  let minDistance = Number.MAX_VALUE

  nodes.forEach((node) => {
    const rect = node.getBoundingClientRect()
    const distance = Math.abs(rect.top - 80) // 增加偏移量，考虑大纲位置
    if (distance < minDistance) {
      minDistance = distance
      closestNode = node
    }
  })

  // 如果找到最近节点，更新其内部文本
  if (closestNode) {
    const rawText = closestNode.querySelector("div")?.textContent?.trim()
    const nodeText = cleanNodeText(rawText)
    if (nodeText && nodeText !== activeNodeText.value) {
      activeNodeText.value = nodeText
      logger.info("Active Node Text:", nodeText, "subtype:", closestNode.getAttribute("data-subtype"))
    }
  }
}

// 标记是否已完成初始加载
const isInitialized = ref(false)

// ==================== AI 面板相关 ====================
// 计算可见的模块（按order排序）
const visibleModules = computed(() => {
  return moduleDefinitions
    .filter(module => module.isAvailable())
    .sort((a, b) => a.order - b.order)
})

// 获取模块按钮的样式类
const getModuleButtonClass = (module: SidebarModuleDefinition) => {
  const isActive = currentModuleId.value === module.id && showSidebar.value
  return {
    [`collapsed-btn--${module.type}`]: true,
    "collapsed-btn--active": isActive
  }
}

const openModule = (moduleId: ModuleId) => {
  const module = getModuleDefinition(moduleId)

  if (!module || !module.isAvailable()) {
    logger.warn(`Module ${moduleId} is not available`)
    return
  }

  activeModuleId.value = moduleId
  showSidebar.value = true
}

const closeSidebar = () => {
  showSidebar.value = false
}

const selectModule = (moduleId: ModuleId) => {
  openModule(moduleId)
}

// 模块按钮交互：
// 1. 点击未激活模块 => 打开侧栏并切换到该模块
// 2. 点击当前激活模块 => 直接收起侧栏
const toggleModule = (moduleId: ModuleId) => {
  const isCurrentModule = currentModuleId.value === moduleId

  if (showSidebar.value && isCurrentModule) {
    closeSidebar()
    return
  }

  openModule(moduleId)
}

const closeModule = (moduleId: ModuleId) => {
  if (currentModuleId.value !== moduleId) {
    return
  }

  const fallbackModuleId = getFirstAvailableModuleIdExcluding(moduleId)
  if (fallbackModuleId) {
    openModule(fallbackModuleId)
  } else {
    showSidebar.value = false
  }
}

const updateScrollListener = (enabled: boolean) => {
  if (enabled) {
    window.addEventListener("scroll", onScroll, true)
  } else {
    window.removeEventListener("scroll", onScroll, true)
  }
}

watch(hasOutlineData, (available) => {
  if (!process.client) {
    return
  }

  updateScrollListener(available)
  if (!available) {
    activeNodeText.value = ""
  }
}, { immediate: false })

watch(() => props.post?.postid, () => {
  activeNodeText.value = ""
})

onMounted(() => {
  // 从 localStorage 加载保存的宽度和固定状态（确保在客户端执行）
  loadSavedWidth()
  loadPinnedState()

  // 来自文档树跳转时，若未固定（图钉未启用），自动展开大纲
  // 优先级：图钉固定 > URL 参数触发 > 默认收起
  if (!isPinned.value && isFromDocTree.value && hasOutlineData.value) {
    showSidebar.value = true
    logger.info("Auto expand sidebar due to from=docTree")
  }

  // 有文档大纲才绑定滚动
  if (hasOutlineData.value) {
    logger.info("Mounted: Adding scroll listener, outline width:", outlineWidth.value, "pinned:", isPinned.value)
    updateScrollListener(true)
  }

  // 延迟标记初始化完成，避免初始过渡动画
  setTimeout(() => {
    isInitialized.value = true
  }, 100)
})

onUnmounted(() => {
  logger.info("Unmounted: Removing scroll listener")
  window.removeEventListener("scroll", onScroll, true)
})
</script>

<template>
  <!-- 侧边栏显示条件：有大纲数据或有可见的 AI 模块（AI 功能独立于大纲） -->
  <div
    v-if="visibleModules.length > 0"
    class="outline-aside"
    :class="{ 'outline-collapsed': !showSidebar, 'outline-initialized': isInitialized }"
  >
    <!-- 占位元素 - 用于在 flex 布局中预留空间，确保正文被挤压 -->
    <div
      class="outline-placeholder"
      :style="{
        width: showSidebar ? activeSidebarWidth + 'px' : '0px',
        minWidth: showSidebar ? activeSidebarWidth + 'px' : '0px',
        maxWidth: showSidebar ? activeSidebarWidth + 'px' : '0px'
      }"
    />

    <!-- 大纲容器 - 使用 fixed 定位，内部独立滚动 -->
    <div
      class="outline-container"
      :class="{ 'is-resizing': isResizing }"
      :style="{
        width: showSidebar ? activeSidebarWidth + 'px' : '0px',
        minWidth: showSidebar ? activeSidebarWidth + 'px' : '0px',
        maxWidth: showSidebar ? activeSidebarWidth + 'px' : '0px'
      }"
    >
      <!-- 大纲标题栏（仅保留 Tab 切换） -->
      <div class="outline-header">
        <div class="sidebar-tabs">
          <button
            v-for="module in visibleModules"
            :key="`tab-${module.id}`"
            class="sidebar-tab"
            :class="{ 'sidebar-tab--active': currentModuleId === module.id }"
            @click="selectModule(module.id)"
          >
            <span :class="module.tabBadgeClass">{{ module.tabBadge ?? module.id }}</span>
            <span>{{ $t(module.name) }}</span>
          </button>
        </div>
        <!-- 图钉按钮 - 保留在标题栏 -->
        <div class="header-btn pin-btn" :class="{ 'pin-btn-active': isPinned }" title="固定显示" @click="togglePin">
          <el-icon :size="14">
            <Paperclip />
          </el-icon>
        </div>
      </div>

      <div v-if="activeContentComponent" :class="activeModuleDefinition?.contentClass">
        <client-only v-if="activeModuleDefinition?.clientOnly">
          <component
            :is="activeContentComponent"
            :title="post.title ?? ''"
            :content="post.editorDom ?? ''"
            :doc-id="post.postid ?? ''"
          />
        </client-only>
        <component
          :is="activeContentComponent"
          v-else
          :outline-data="outlineData"
          :max-depth="outlineMaxDepth"
          :active-text="activeNodeText"
          :width="outlineWidth"
        />
      </div>

      <!-- 拖拽调整宽度的手柄 -->
      <div
        v-if="showSidebar"
        class="resize-handle"
        :class="{ 'is-resizing': isResizing }"
        title="拖拽调整宽度"
        @mousedown="startResize"
      >
        <div class="resize-indicator">
          <div class="resize-dots">
            <span class="dot" />
            <span class="dot" />
            <span class="dot" />
          </div>
        </div>
      </div>
    </div>

    <!-- 垂直按钮组 - 始终显示，点击按钮即可展开/收起对应功能 -->
    <div class="collapsed-buttons">
      <!-- 功能模块按钮 - 动态渲染，便于扩展 -->
      <button
        v-for="module in visibleModules"
        :key="module.id"
        class="collapsed-btn"
        :class="getModuleButtonClass(module)"
        :title="$t(module.name)"
        @click="toggleModule(module.id)"
      >
        <el-icon :size="16">
          <component :is="module.icon" />
        </el-icon>
      </button>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
/* 大纲侧边栏容器 - 使用 flex 布局 */
.outline-aside
  flex-shrink 0
  display flex
  flex-direction row
  align-items flex-start
  /* 确保大纲容器不随正文滚动 */
  position relative
  height 100vh

/* 占位元素 - 确保正文被正确挤压 */
.outline-placeholder
  flex-shrink 0
  height calc(100vh - 120px)
  margin-top 60px
  /* 宽度由 JS 控制，不使用 CSS 过渡 */

/* 收起状态下的占位 */
.outline-collapsed
  width 0 !important

/* 大纲整体容器 - 使用 fixed 定位，完全独立于正文滚动 */
.outline-container
  position fixed /* 固定在视窗，不随正文滚动 */
  top 60px /* 顶部留出导航空间 */
  right 60px /* 向右偏移，为右侧按钮组留出空间（按钮组宽度32px + 间距） */
  height calc(100vh - 120px) /* 底部留出按钮空间 */
  background var(--b3-theme-background, var(--el-bg-color, #fff))
  /* 移除左侧边框，保持简洁 */
  border-radius 8px /* 统一圆角 */
  display flex
  flex-direction column
  overflow hidden /* 隐藏溢出，内部滚动 */
  /* 宽度由 JS 控制，不使用 CSS 过渡 */
  box-shadow -2px 2px 8px rgba(0, 0, 0, 0.06) /* 更柔和的阴影 */
  z-index 100 /* 提高 z-index，确保覆盖页面滚动条 */
  font-family var(--b3-font-family, "Helvetica Neue", Arial, sans-serif)

/* 拖拽时禁用过渡 */
.outline-container.is-resizing
  transition none

/* 大纲标题栏 */
.outline-header
  flex-shrink 0
  display flex
  align-items center
  justify-content space-between
  padding 10px 14px /* 更紧凑的间距 */
  border-bottom 1px solid rgba(0, 0, 0, 0.04) /* 更淡的分隔线 */
  background var(--b3-theme-background, var(--el-bg-color, #fff))

/* Tab 切换栏 */
.sidebar-tabs
  display flex
  align-items center
  gap 2px

.sidebar-tab
  display inline-flex
  align-items center
  gap 4px
  padding 4px 10px
  border none
  background transparent
  border-radius 6px
  cursor pointer
  font-size 13px
  font-weight 500
  color var(--text-color-secondary)
  transition all 0.2s ease
  white-space nowrap
  font-family inherit

.sidebar-tab:hover
  background var(--el-fill-color-light)
  color var(--text-color-primary)

.sidebar-tab--active
  background var(--el-color-primary-light-9, rgba(64, 158, 255, 0.1))
  color var(--el-color-primary, #409eff)
  font-weight 600

.tab-icon
  font-size 11px
  opacity 0.6

.tab-icon-ai
  font-size 11px
  font-weight 700
  color var(--el-color-primary, #409eff)

.outline-title
  display flex
  align-items center
  gap 6px /* 更紧凑的间距 */
  font-size 13px /* 稍小的字体 */
  font-weight 600 /* 更粗的标题 */
  color var(--text-color-primary)
  letter-spacing -0.01em /* 更紧凑的字间距 */

.outline-title-icon
  font-size 11px
  opacity 0.5 /* 更淡的图标 */

/* 标题栏按钮组 */
.outline-header-actions
  display flex
  align-items center
  gap 4px

.header-btn
  width 28px
  height 28px
  display flex
  align-items center
  justify-content center
  border-radius 6px
  cursor pointer
  transition all 0.2s ease
  color var(--text-color-secondary)

.header-btn:hover
  background var(--el-fill-color-light)
  color var(--text-color-primary)

/* 图钉按钮 */
.pin-btn-active
  background var(--el-color-primary-light-9)
  color var(--el-color-primary)

.pin-btn-active:hover
  background var(--el-color-primary)
  color white

/* 大纲内容 - 完全独立滚动容器 */
.outline-content
  flex 1
  overflow-y auto /* 启用独立垂直滚动 */
  overflow-x hidden
  background var(--b3-theme-background, var(--el-bg-color, #fff))
  padding 12px 8px /* 更紧凑的间距 */
  min-width 0 /* 防止flex子项溢出 */
  scroll-behavior smooth /* 平滑滚动 */
  overscroll-behavior contain /* 防止滚动传播到父元素 */
  -webkit-overflow-scrolling touch /* iOS 平滑滚动 */

  /* 更精致的滚动条 */
  &::-webkit-scrollbar
    width 3px /* 更细的滚动条 */

  &::-webkit-scrollbar-track
    background transparent

  &::-webkit-scrollbar-thumb
    background rgba(0, 0, 0, 0.08) /* 更淡的滚动条 */
    border-radius 2px

  &::-webkit-scrollbar-thumb:hover
    background rgba(0, 0, 0, 0.15) /* 悬停时稍深 */

/* AI 内容区域 */
.ai-content
  flex 1
  overflow hidden
  display flex
  flex-direction column
  background var(--b3-theme-background, var(--el-bg-color, #fff))

/* 拖拽调整宽度的手柄 */
.resize-handle
  position absolute
  left 0
  top 0
  bottom 0
  width 12px /* 增加宽度以便更容易命中 */
  cursor col-resize
  background transparent
  transition all 0.2s ease
  z-index 10
  display flex
  align-items center
  justify-content center

/* 拖拽指示器容器 */
.resize-indicator
  width 4px
  height 40px
  background rgba(128, 128, 128, 0.2)
  border-radius 2px
  display flex
  align-items center
  justify-content center
  transition all 0.2s ease
  opacity 0.5

/* 拖拽点样式 */
.resize-dots
  display flex
  flex-direction column
  gap 3px
  align-items center

.resize-dots .dot
  width 3px
  height 3px
  background rgba(128, 128, 128, 0.6)
  border-radius 50%
  transition all 0.2s ease

/* 悬停状态 */
.resize-handle:hover
  background rgba(64, 158, 255, 0.1) /* 主题色淡背景 */

.resize-handle:hover .resize-indicator
  background rgba(64, 158, 255, 0.3)
  opacity 1

.resize-handle:hover .resize-dots .dot
  background rgba(64, 158, 255, 0.8)

/* 拖拽中状态 */
.resize-handle.is-resizing
  background rgba(64, 158, 255, 0.15)

.resize-handle.is-resizing .resize-indicator
  background rgba(64, 158, 255, 0.5)
  opacity 1

.resize-handle.is-resizing .resize-dots .dot
  background var(--el-color-primary)

/* 收起状态下的按钮组 - 垂直排列 */
.collapsed-buttons
  position fixed
  top 60px /* 与大纲容器顶部对齐 */
  right 16px /* 靠近右侧边缘 */
  z-index 101 /* 高于 outline-container，确保按钮始终可点击 */
  display flex
  flex-direction column /* 垂直排列 */
  gap 8px /* 按钮间距 */

.collapsed-btn
  width 32px
  height 32px
  display flex
  align-items center
  justify-content center
  border-radius 8px
  background var(--b3-theme-background, var(--el-bg-color, #fff))
  border 1px solid var(--b3-border-color, var(--el-border-color-light, rgba(0, 0, 0, 0.08)))
  box-shadow 0 2px 8px rgba(0, 0, 0, 0.08)
  cursor pointer
  transition all 0.3s ease
  color var(--text-color-secondary)
  padding 0

.collapsed-btn:hover
  background var(--el-fill-color-light)
  color var(--text-color-primary)
  transform translateY(-1px)
  box-shadow 0 4px 12px rgba(0, 0, 0, 0.12)

/* 模块按钮基础样式 - 统一风格，不特殊化 */
.collapsed-btn--outline,
.collapsed-btn--ai
  background var(--b3-theme-background, var(--el-bg-color, #fff))
  color var(--text-color-secondary)

.collapsed-btn--outline:hover,
.collapsed-btn--ai:hover
  background var(--el-fill-color-light)
  color var(--text-color-primary)

/* 模块按钮激活状态 - 统一使用主题色 */
.collapsed-btn--active
  transform scale(1.05)
  box-shadow 0 2px 12px rgba(0, 0, 0, 0.15)

/* AI按钮激活状态 - 与普通按钮一致 */
.collapsed-btn--ai.collapsed-btn--active
  background var(--el-color-primary-light-9, rgba(64, 158, 255, 0.1))
  color var(--el-color-primary, #409eff)
  border-color var(--el-color-primary, #409eff)

/* 大纲按钮激活状态 */
.collapsed-btn--outline.collapsed-btn--active
  background var(--el-color-primary-light-9, rgba(64, 158, 255, 0.1))
  color var(--el-color-primary, #409eff)
  border-color var(--el-color-primary, #409eff)

.module-icon
  font-size 14px
  font-weight 500

/* 小屏适配：不占用宽度 */
@media (max-width: 768px)
  .outline-wrapper
    position fixed

  .outline-aside
    width 0 !important
    min-width 0 !important
    flex 0 0 0 !important
    overflow visible !important

  .outline-aside:not(.outline-collapsed)
    position fixed !important
    inset 0 !important
    width auto !important
    height auto !important
    z-index 4200 !important
    pointer-events none

  .outline-placeholder
    display none !important
    width 0 !important
    min-width 0 !important
    max-width 0 !important

  .outline-aside:not(.outline-collapsed) .outline-container
    top 12px !important
    left 12px !important
    right 52px !important
    bottom 12px !important
    height auto !important
    width auto !important
    min-width 0 !important
    max-width none !important
    background var(--b3-theme-background, var(--el-bg-color, #fff)) !important
    border 1px solid var(--b3-border-color, var(--el-border-color-light, rgba(0, 0, 0, 0.08)))
    box-shadow 0 12px 32px rgba(15, 23, 42, 0.16)
    isolation isolate
    pointer-events auto
    z-index 4200 !important

  .outline-aside:not(.outline-collapsed) .outline-header,
  .outline-aside:not(.outline-collapsed) .outline-content,
  .outline-aside:not(.outline-collapsed) .ai-content
    background var(--b3-theme-background, var(--el-bg-color, #fff)) !important

  .collapsed-buttons
    top 50% !important
    right 8px !important
    transform translateY(-50%)
    pointer-events auto
    z-index 4201 !important

  .collapsed-btn
    pointer-events auto

  .resize-handle
    display none /* 小屏隐藏拖拽手柄 */
</style>
