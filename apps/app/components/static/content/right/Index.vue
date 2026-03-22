<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup lang="ts">
import { More, Paperclip } from "@element-plus/icons-vue"
import type AppConfig from "~/app.config"

const logger = createAppLogger("right-index")
const props = defineProps<{ post: any, setting: typeof AppConfig }>()

const outlineData = ref(props.post.outline ?? [] as any)
const outlineMaxDepth = ref(props.post?.outlineLevel ?? 6)

// 控制大纲状态，true 为展开，false 为收起
// 使用 useState 确保 SSR 和客户端状态一致，避免闪烁
const showOutline = useState('outline-show', () => false)
// 控制 hover 状态，true 为 hover 展开，false 为 hover 收起
const isHovered = ref(false)

// ==================== 大纲宽度调整功能 ====================
const OUTLINE_WIDTH_KEY = 'siyuan-blog-outline-width'
const OUTLINE_PINNED_KEY = 'siyuan-blog-outline-pinned'
const DEFAULT_WIDTH = 280
const MIN_WIDTH = 200
const MAX_WIDTH = 500

// 大纲宽度状态
const outlineWidth = ref(DEFAULT_WIDTH)
const isResizing = ref(false)

// 大纲固定显示状态
// 使用 useState 确保 SSR 和客户端状态一致，避免闪烁
const isPinned = useState('outline-pinned', () => false)

// 从 localStorage 读取保存的宽度
const loadSavedWidth = () => {
  if (process.client) {
    const savedWidth = localStorage.getItem(OUTLINE_WIDTH_KEY)
    if (savedWidth) {
      const width = parseInt(savedWidth, 10)
      if (width >= MIN_WIDTH && width <= MAX_WIDTH) {
        outlineWidth.value = width
      }
    }
  }
}

// 保存宽度到 localStorage
const saveWidth = (width: number) => {
  if (process.client) {
    localStorage.setItem(OUTLINE_WIDTH_KEY, width.toString())
  }
}

// 从 localStorage 读取固定状态
const loadPinnedState = () => {
  if (process.client) {
    const savedPinned = localStorage.getItem(OUTLINE_PINNED_KEY)
    if (savedPinned) {
      const pinnedValue = savedPinned === 'true'
      isPinned.value = pinnedValue
      // 如果固定，同步设置 showOutline 避免闪烁
      if (pinnedValue) {
        showOutline.value = true
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

// 切换固定显示状态
const togglePin = () => {
  isPinned.value = !isPinned.value
  savePinnedState(isPinned.value)
  // 固定时自动展开大纲
  if (isPinned.value) {
    showOutline.value = true
  }
  logger.info("Outline pinned state:", isPinned.value)
}

// 开始拖拽调整宽度
const startResize = (e: MouseEvent) => {
  e.preventDefault()
  isResizing.value = true
  
  const startX = e.clientX
  const startWidth = outlineWidth.value
  
  const handleMouseMove = (moveEvent: MouseEvent) => {
    if (!isResizing.value) return
    
    const deltaX = startX - moveEvent.clientX
    const newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, startWidth + deltaX))
    outlineWidth.value = newWidth
  }
  
  const handleMouseUp = () => {
    isResizing.value = false
    saveWidth(outlineWidth.value)
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
    document.body.style.userSelect = ''
    document.body.style.cursor = ''
  }
  
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
  document.body.style.userSelect = 'none'
  document.body.style.cursor = 'col-resize'
}

// 切换大纲显示/隐藏
const toggleOutline = () => {
  showOutline.value = !showOutline.value
}

// hover 状态控制
const onHover = (state:boolean) => {
  // 固定模式下不响应 hover
  if (isPinned.value) return
  
  if (!showOutline.value) {
    isHovered.value = state
    toggleOutline()
  }
}

// 默认收起大纲
// onMounted(() => {
//   const isMobile = window.innerWidth <= 768
//   if (!isMobile) {
//     showOutline.value = true
//   }
// })

// 当前激活的节点 ID
const activeNodeText = ref("")

// 清理节点文本（与 OutlineItem.vue 的 adjustItemName 保持一致）
const cleanNodeText = (text) => {
  if (!text) return ""
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
  let closestNode:any = null
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

onMounted(() => {
  // 从 localStorage 加载保存的宽度和固定状态（确保在客户端执行）
  loadSavedWidth()
  loadPinnedState()
  
  // 有文档大纲才绑定滚动
  if (outlineData.value && outlineData.value.length > 0) {
    logger.info("Mounted: Adding scroll listener, outline width:", outlineWidth.value, "pinned:", isPinned.value)
    window.addEventListener("scroll", onScroll, true)
  }
})

onUnmounted(() => {
  logger.info("Unmounted: Removing scroll listener")
  window.removeEventListener("scroll", onScroll)
})
</script>

<template>
  <div v-if="outlineData && outlineData.length > 0" class="outline-aside" :class="{ 'outline-collapsed': !showOutline }">
    <!-- 占位元素 - 用于在 flex 布局中预留空间，确保正文被挤压 -->
    <div 
        class="outline-placeholder" 
        :style="{ width: showOutline ? outlineWidth + 'px' : '0px', transition: isResizing ? 'none' : 'width 0.3s ease' }"
    ></div>
    
    <!-- 大纲容器 - 使用 sticky 定位，内部独立滚动 -->
    <div
        class="outline-container"
        :class="{ 'is-resizing': isResizing }"
        :style="{ width: showOutline ? outlineWidth + 'px' : '0px' }"
    >
      <!-- 大纲标题栏（包含按钮组） -->
      <div class="outline-header">
        <div class="outline-title">
          <span class="outline-title-icon">☰</span>
          <span>{{ $t("static.outline") }}</span>
        </div>
        <div class="outline-header-actions">
          <!-- 图钉按钮 -->
          <div
              class="header-btn pin-btn"
              :class="{ 'pin-btn-active': isPinned }"
              @click="togglePin"
              title="固定显示大纲"
          >
            <el-icon :size="14"><Paperclip /></el-icon>
          </div>
          <!-- 关闭按钮 -->
          <div
              class="header-btn close-btn"
              @click="toggleOutline"
              title="关闭大纲"
          >
            <el-icon :size="14"><More /></el-icon>
          </div>
        </div>
      </div>
      
      <div class="outline-content">
        <static-content-right-outline
            :outline-data="outlineData"
            :max-depth="outlineMaxDepth"
            :active-text="activeNodeText"
            :width="outlineWidth"
        />
      </div>
      
      <!-- 拖拽调整宽度的手柄 -->
      <div
          v-if="showOutline"
          class="resize-handle"
          :class="{ 'is-resizing': isResizing }"
          @mousedown="startResize"
          title="拖拽调整宽度"
      >
        <div class="resize-indicator">
          <div class="resize-dots">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 收起状态下的展开按钮 -->
    <div
        v-if="!showOutline"
        class="toggle-btn-collapsed"
        @click="toggleOutline"
        @mouseenter="onHover(true)"
        title="展开大纲"
    >
      <el-icon :size="14"><More /></el-icon>
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
  height 100vh
  transition width 0.3s ease

/* 收起状态下的占位 */
.outline-collapsed
  width 0

/* 大纲整体容器 - 使用 fixed 定位，完全独立于正文滚动 */
.outline-container
  position fixed /* 固定在视窗，不随正文滚动 */
  top 0
  right 0
  height 100vh /* 占满视窗高度 */
  width 0 /* 默认宽度为0，通过style动态设置 */
  background var(--background)
  border-left 1px solid var(--border-color)
  display flex
  flex-direction column
  overflow hidden /* 隐藏溢出，内部滚动 */
  transition width 0.3s ease
  box-shadow -2px 0 8px rgba(0, 0, 0, 0.08)
  z-index 100

/* 拖拽时禁用过渡，使调整更流畅 */
.outline-container.is-resizing
  transition none

/* 大纲标题栏 */
.outline-header
  flex-shrink 0
  display flex
  align-items center
  justify-content space-between
  padding 12px 16px
  border-bottom 1px solid var(--border-color)
  background var(--background)

.outline-title
  display flex
  align-items center
  gap 8px
  font-size 14px
  font-weight 500
  color var(--text-color-primary)

.outline-title-icon
  font-size 12px
  opacity 0.7

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
  padding 16px
  min-width 0 /* 防止flex子项溢出 */
  scroll-behavior smooth /* 平滑滚动 */
  overscroll-behavior contain /* 防止滚动传播到父元素 */
  -webkit-overflow-scrolling touch /* iOS 平滑滚动 */

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

/* 收起状态下的展开按钮 - 使用 fixed 定位 */
.toggle-btn-collapsed
  position fixed
  top 20px
  right 20px
  z-index 101
  width 32px
  height 32px
  display flex
  align-items center
  justify-content center
  border-radius 8px
  background var(--background)
  border 1px solid var(--border-color)
  box-shadow 0 2px 8px rgba(0, 0, 0, 0.08)
  cursor pointer
  transition all 0.3s ease
  color var(--text-color-secondary)

.toggle-btn-collapsed:hover
  background var(--el-fill-color-light)
  color var(--text-color-primary)

/* 小屏适配：不占用宽度 */
@media (max-width: 768px)
  .outline-wrapper
    position fixed
  
  .resize-handle
    display none /* 小屏隐藏拖拽手柄 */
</style>