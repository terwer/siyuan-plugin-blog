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
const showOutline = ref(false)
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
const isPinned = ref(false)

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
      isPinned.value = savedPinned === 'true'
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
const onScroll = () => {
  // logger.info("start scroll...")
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
    const distance = Math.abs(rect.top - 20) // 偏移调整
    if (distance < minDistance) {
      minDistance = distance
      closestNode = node
    }
  })

  // 如果找到最近节点，更新其内部文本
  if (closestNode) {
    const nodeText = closestNode.querySelector("div")?.textContent?.trim()
    if (nodeText && nodeText !== activeNodeText.value) {
      activeNodeText.value = nodeText
      // logger.info("Active Node Text:", nodeText)
    }
  }
}

onMounted(() => {
  // 从 localStorage 加载保存的宽度和固定状态（确保在客户端执行）
  loadSavedWidth()
  loadPinnedState()
  
  // 如果处于固定状态，自动展开大纲
  if (isPinned.value) {
    showOutline.value = true
  }
  
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
  <div v-if="outlineData && outlineData.length > 0" class="outline-wrapper" :class="{ 'outline-wrapper-expanded': showOutline }">
    <div
        class="outline-container"
        :class="{ 'outline-expanded': showOutline, 'is-resizing': isResizing }"
        :style="{ width: showOutline ? outlineWidth + 'px' : '0px' }"
    >
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
        <!-- 拖拽指示器图标 -->
        <div class="resize-indicator">
          <div class="resize-dots">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      </div>
    </div>
    <!-- 大纲控制按钮组 -->
    <div
        v-if="showOutline"
        class="outline-controls"
        :style="{ right: outlineWidth + 16 + 'px' }"
    >
      <!-- 图钉按钮 -->
      <div
          class="control-btn pin-btn"
          :class="{ 'pin-btn-active': isPinned }"
          @click="togglePin"
          title="固定显示大纲"
      >
        <el-icon :size="14"><Paperclip /></el-icon>
      </div>
      <!-- 更多按钮 -->
      <div
          class="control-btn toggle-btn"
          @click="toggleOutline"
          @mouseenter="onHover(true)"
          title="切换大纲显示"
      >
        <el-icon :size="14"><More /></el-icon>
      </div>
    </div>
    <!-- 收起状态下的更多按钮 -->
    <div
        v-else
        class="toggle-btn-collapsed"
        @click="toggleOutline"
        @mouseenter="onHover(true)"
    >
      <el-icon :size="14"><More /></el-icon>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
/* 包裹容器 */
.outline-wrapper
  position relative
  width unset
  margin-left 20px

.outline-wrapper-expanded
  width 200px

/* 大纲整体容器 */
.outline-container
  position fixed /* 固定在页面右侧 */
  top 0
  right 0
  height 100vh /* 占满视窗高度 */
  width 0 /* 默认宽度为0，通过style动态设置 */
  background var(--background)
  border-left 1px solid var(--border-color)
  display flex
  flex-direction column
  transform translateX(100%) /* 默认隐藏大纲 */
  transition transform 0.3s ease

/* 展开状态 */
.outline-container.outline-expanded
  transform translateX(0)

/* 拖拽时禁用过渡，使调整更流畅 */
.outline-container.is-resizing
  transition none

/* 大纲内容 */
.outline-content
  flex 1
  overflow-y auto /* 独立滚动 */
  padding 16px
  min-width 0 /* 防止flex子项溢出 */

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

/* 大纲控制按钮组 */
.outline-controls
  position fixed
  top 20px
  z-index 100
  display flex
  align-items center
  gap 8px
  padding 6px
  background var(--background)
  border 1px solid var(--border-color)
  border-radius 8px
  box-shadow 0 2px 8px rgba(0, 0, 0, 0.08)
  transition all 0.3s ease

/* 控制按钮通用样式 */
.control-btn
  width 28px
  height 28px
  display flex
  align-items center
  justify-content center
  border-radius 6px
  cursor pointer
  transition all 0.2s ease
  color var(--text-color-secondary)

.control-btn:hover
  background var(--el-fill-color-light)
  color var(--text-color-primary)

/* 图钉按钮 */
.pin-btn
  color var(--text-color-secondary)

.pin-btn-active
  background var(--el-color-primary-light-9)
  color var(--el-color-primary)

.pin-btn-active:hover
  background var(--el-color-primary)
  color white

/* 切换按钮 */
.toggle-btn
  color var(--text-color-secondary)

/* 收起状态下的切换按钮 */
.toggle-btn-collapsed
  position fixed
  top 20px
  right 20px
  z-index 100
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