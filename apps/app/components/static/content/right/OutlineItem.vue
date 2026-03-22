<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup>
import { computed } from "vue"

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  maxDepth: {
    type: Number,
    default: -1,
  },
  isRoot: {
    type: Boolean,
    default: false,
  },
  rootLevel: {
    type: Number,
    default: 1,
  },
  activeText: {
    type: String,
    default: "",
  },
  containerWidth: {
    type: Number,
    default: 280,
  }
})

// 优化的缩进计算：递减缩进策略
const getFirstMargin = (item) => {
  const level = getItemLevel(item)
  // 递减缩进：H1=0, H2=12, H3=20, H4=28, H5+=8...
  if (level === 1) return 0
  if (level === 2) return 12
  if (level === 3) return 20
  return 28 + (level - 4) * 8
}

const adjustItemName = (name) => {
  let adjustedName = name
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, "\"")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\n/g, " ")
    .replace(/：/g, "")
    .replace(/:/g, "")
    .replace(/,/g, "")
  adjustedName = adjustedName.replace(/<[^>]+>/g, (match) => {
    const textContent = match.match(/>([\s\S]*?)</)
    return textContent ? textContent[1] : ""
  })
  return adjustedName
}

const getItemLevel = (item) => {
  const level = parseInt(item.subType.replace("h", ""), 10)
  return isNaN(level) ? 1 : level
}

// 统一获取子项数组（支持 blocks 和 children 两种结构）
const getChildren = (item) => {
  return item.blocks || item.children || []
}

// 获取项的显示文本（用于模板渲染）
const getItemDisplayText = (item) => {
  // 根级别使用 name
  if (props.isRoot) {
    return item.name || ''
  }
  // 非根级别使用 content
  return item.content || item.name || ''
}

// 获取当前项的文本内容（用于激活状态判断）
const getItemText = (item) => {
  // 根级别或第一级使用 name，其他级别使用 content
  // 注意：对于从 h3/h4 等非 h1 开始的文档，根项也是用 name
  if (props.isRoot) {
    return item.name
  }
  
  const level = getItemLevel(item)
  // 第一级使用 name，其他级别使用 content
  if (level === 1) {
    return item.name
  }
  return item.content
}

// 检查当前项是否处于激活状态（精确匹配）
const isActive = computed(() => {
  let itemText = getItemText(props.item) || ''
  
  // 清理文本（与 adjustItemName 保持一致）
  itemText = itemText
    .replace(/&nbsp;/g, " ")
    .replace(/<[^>]+>/g, (match) => {
      const textContent = match.match(/>([\s\S]*?)</)
      return textContent ? textContent[1] : ""
    })
    .trim()
  
  return itemText === props.activeText
})

// 检查当前项是否包含激活的子项（父级半激活状态）
const hasActiveChild = computed(() => {
  if (!props.activeText) return false
  
  // 获取子项数组
  const children = getChildren(props.item)
  if (!children.length) return false
  
  // 递归检查子项中是否有激活的
  const checkChildren = (items) => {
    for (const child of items) {
      // 获取子项的文本内容（非根级别使用 content）
      let childText = child.content || child.name || ''
      
      // 清理文本（与 adjustItemName 保持一致）
      childText = childText
        .replace(/&nbsp;/g, " ")
        .replace(/<[^>]+>/g, (match) => {
          const textContent = match.match(/>([\s\S]*?)</)
          return textContent ? textContent[1] : ""
        })
        .trim()
      
      if (childText === props.activeText) return true
      
      // 递归检查孙级
      const grandChildren = getChildren(child)
      if (grandChildren.length && checkChildren(grandChildren)) return true
    }
    return false
  }
  
  return checkChildren(children)
})

const scrollToSection = (id) => {
  const element = document.querySelector(`[data-node-id="${id}"]`)
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" })
    window.scrollBy(0, -20)
  }
}
</script>

<template>
  <div :style="{ marginLeft: getFirstMargin(item) + 'px' }" class="outline-item">
    <!-- 获取子项数组（统一处理 blocks 和 children） -->
    <div v-if="getChildren(item).length > 0" class="nested-items">
      <a class="item-link" 
         :class="{ active: isActive, 'parent-active': hasActiveChild }" 
         @click.prevent="scrollToSection(item.id)" 
         :title="adjustItemName(getItemDisplayText(item))">
        {{ adjustItemName(getItemDisplayText(item)) }}
      </a>
      <div v-if="getItemLevel(item) < maxDepth">
        <outline-item v-for="(child, index) in getChildren(item)" :key="index" :item="child" :max-depth="maxDepth" :container-width="containerWidth" :active-text="activeText" />
      </div>
    </div>

    <!-- 无子项 -->
    <div v-else>
      <div v-if="getItemLevel(item) < maxDepth">
        <a class="item-link" 
           :class="{ active: isActive }" 
           @click.prevent="scrollToSection(item.id)" 
           :title="adjustItemName(getItemDisplayText(item))">
          {{ adjustItemName(getItemDisplayText(item)) }}
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.outline-item
  margin-bottom: 2px
  padding: 0

  // Dark mode styles
  html[data-theme-mode="dark"] &
    color: #ccc

.item-link
  color: #666 /* 更柔和的文本色 */
  text-decoration: none
  cursor: pointer
  transition: all 0.15s ease-out /* 更快的过渡 */
  display: block
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap
  max-width: 100%
  line-height: 1.5 /* 更紧凑的行高 */
  padding: 3px 10px 3px 14px /* 更紧凑的间距 */
  font-size: 12.5px /* 稍小的字体 */
  border-left: 1.5px solid transparent /* 更细的边框 */
  border-radius: 0 3px 3px 0 /* 更小的圆角 */

  &:hover
    color: #1890ff
    background: rgba(24, 144, 255, 0.04) /* 更淡的悬停背景 */
    border-left-color: rgba(24, 144, 255, 0.25)

  // Dark mode styles
  html[data-theme-mode="dark"] &
    color: #bbb
    &:hover
      color: #40a9ff
      background: rgba(64, 169, 255, 0.1)
      border-left-color: rgba(64, 169, 255, 0.3)

.nested-items
  &:first-child
    margin-left 0
  &:not(:first-child)
    margin-left 16px /* 减小嵌套缩进 */

/* 激活状态 - 左侧边框高亮（当前精确匹配的项） */
.active
  color: #1890ff
  background: rgba(24, 144, 255, 0.06) /* 更淡的背景 */
  border-left-color: #1890ff
  font-weight: 500

  &:hover
    background: rgba(24, 144, 255, 0.1)
    border-left-color: #1890ff

  // Dark mode styles
  html[data-theme-mode="dark"] &
    color: #40a9ff
    background: rgba(64, 169, 255, 0.12)
    border-left-color: #40a9ff
    
    &:hover
      background: rgba(64, 169, 255, 0.18)

/* 父级激活状态 - 子项激活时父级保持半高亮 */
.parent-active
  color: #1890ff
  border-left-color: rgba(24, 144, 255, 0.35) /* 更淡的边框 */
  
  &:hover
    background: rgba(24, 144, 255, 0.04)
    border-left-color: #1890ff

  // Dark mode styles
  html[data-theme-mode="dark"] &
    color: #40a9ff
    border-left-color: rgba(64, 169, 255, 0.35)
    
    &:hover
      background: rgba(64, 169, 255, 0.08)
      border-left-color: #40a9ff
</style>
