<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup>
import { nextTick, ref, watch } from "vue"

const props = defineProps({
  outlineData: {
    type: Array,
    required: true,
  },
  maxDepth: {
    type: Number,
    default: -1,
  },
  activeText: {
    type: String,
    default: "",
  },
  width: {
    type: Number,
    default: 280,
  }
})

const { t } = useI18n()
const outlineContentRef = ref(null)

const getRootLevel = () => {
  if (props.outlineData.length === 0) {
    return 1
  }

  const levels = props.outlineData.map(item => getItemLevel(item))
  const uniqueLevels = new Set(levels)

  if (uniqueLevels.size === 1) {
    return levels[0]
  } else {
    return Math.min(...levels)
  }
}

const getItemLevel = (item) => {
  const level = parseInt(item.subType.replace("h", ""), 10)
  return isNaN(level) ? 1 : level
}

// 滚动到激活的目录项
const scrollToActiveItem = () => {
  nextTick(() => {
    if (!outlineContentRef.value || !props.activeText) return
    
    const activeElement = outlineContentRef.value.querySelector('.item-link.active')
    if (!activeElement) return
    
    const container = outlineContentRef.value
    const elementRect = activeElement.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    
    // 计算元素相对于容器的位置
    const elementTop = elementRect.top - containerRect.top + container.scrollTop
    const elementHeight = activeElement.offsetHeight
    const containerHeight = container.clientHeight
    
    // 检查元素是否在可视区域内
    const isInViewport = elementTop >= container.scrollTop && 
                         elementTop + elementHeight <= container.scrollTop + containerHeight
    
    if (!isInViewport) {
      // 滚动到元素居中显示
      const targetScrollTop = elementTop - (containerHeight / 2) + (elementHeight / 2)
      container.scrollTo({
        top: Math.max(0, targetScrollTop),
        behavior: 'smooth'
      })
    }
  })
}

// 监听激活文本变化，自动滚动
watch(() => props.activeText, () => {
  scrollToActiveItem()
}, { flush: 'post' })
</script>

<template>
  <div class="outline" :style="{ width: width + 'px' }">
    <div ref="outlineContentRef" class="outline-content">
      <div
        v-for="(item, index) in outlineData"
        :key="index"
        class="outline-item"
      >
        <static-content-right-outline-item
          :item="item"
          :max-depth="maxDepth"
          :root-level="getRootLevel()"
          :is-root="true"
          :active-text="activeText"
          :container-width="width"
        />
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.outline
  width: 100% /* 填满父容器 */
  height: 100% /* 填满父容器 */
  display: flex
  flex-direction: column
  overflow: hidden /* 防止内容溢出 */
  font-family: var(--b3-font-family, "Helvetica Neue", Arial, sans-serif)

.outline-content
  flex-grow: 1
  overflow-y: auto
  overflow-x: hidden
  padding: 8px 0
  scroll-behavior: smooth /* 平滑滚动 */
  overscroll-behavior: contain /* 防止滚动传播到父元素 */
  -webkit-overflow-scrolling: touch /* iOS 平滑滚动 */
  
  /* 自定义滚动条 */
  &::-webkit-scrollbar
    width: 4px
  
  &::-webkit-scrollbar-track
    background: transparent
  
  &::-webkit-scrollbar-thumb
    background: rgba(0, 0, 0, 0.15)
    border-radius: 2px
  
  &::-webkit-scrollbar-thumb:hover
    background: rgba(0, 0, 0, 0.25)
  
  // Dark mode scrollbar
  html[data-theme-mode="dark"] &
    &::-webkit-scrollbar-thumb
      background: rgba(255, 255, 255, 0.15)
    
    &::-webkit-scrollbar-thumb:hover
      background: rgba(255, 255, 255, 0.25)

.outline-item
  margin-bottom: 2px /* 减小间距 */
</style>
