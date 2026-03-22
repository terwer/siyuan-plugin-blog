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

// 获取当前项的文本内容
const getItemText = (item) => {
  if (props.isRoot || getItemLevel(item) === 1) {
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
  
  // 获取子项数组（支持 blocks 和 children 两种结构）
  const children = props.item.blocks || props.item.children || []
  if (!children.length) return false
  
  // 递归检查子项中是否有激活的
  const checkChildren = (items) => {
    for (const child of items) {
      // 获取子项的文本内容（考虑不同层级结构）
      let childText = ''
      const childLevel = parseInt(child.subType?.replace("h", "") || "1", 10)
      
      // 第一级使用 name，其他使用 content
      if (childLevel === 1 || child.name) {
        childText = child.name || ''
      } else {
        childText = child.content || ''
      }
      
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
      const grandChildren = child.blocks || child.children || []
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
    <!-- 第一级 -->
    <div v-if="getItemLevel(item) === 1 || isRoot" class="nested-items">
      <a class="item-link" 
         :class="{ active: isActive, 'parent-active': hasActiveChild }" 
         @click.prevent="scrollToSection(item.id)" 
         :title="adjustItemName(item.name)">
        {{ adjustItemName(item.name) }}
      </a>
      <div v-if="getItemLevel(item) < maxDepth">
        <outline-item v-for="(child, index) in item.blocks" :key="index" :item="child" :max-depth="maxDepth" :container-width="containerWidth" :active-text="activeText" />
      </div>
    </div>

    <!-- 其他级别且有子项 -->
    <div v-else-if="Array.isArray(item.children) && item.children.length > 0" class="nested-items">
      <a class="item-link" 
         :class="{ active: isActive, 'parent-active': hasActiveChild }" 
         @click.prevent="scrollToSection(item.id)" 
         :title="adjustItemName(item.content)">
        {{ adjustItemName(item.content) }}
      </a>
      <div v-if="getItemLevel(item) < maxDepth">
        <outline-item v-for="(child, index) in item.children" :key="index" :item="child" :max-depth="maxDepth" :container-width="containerWidth" :active-text="activeText" />
      </div>
    </div>

    <!-- 无子项 -->
    <div v-else>
      <div v-if="getItemLevel(item) < maxDepth">
        <a class="item-link" 
           :class="{ active: isActive }" 
           @click.prevent="scrollToSection(item.id)" 
           :title="adjustItemName(item.content)">
          {{ adjustItemName(item.content) }}
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
  color: #555
  text-decoration: none
  cursor: pointer
  transition: all 0.2s ease
  display: block
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap
  max-width: 100%
  line-height: 1.6
  padding: 4px 12px 4px 16px /* 左侧留出边框空间 */
  font-size: 13px
  border-left: 2px solid transparent /* 默认透明边框 */
  border-radius: 0 4px 4px 0 /* 右侧圆角 */

  &:hover
    color: #1890ff
    background: rgba(24, 144, 255, 0.06)
    border-left-color: rgba(24, 144, 255, 0.3)

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
  background: rgba(24, 144, 255, 0.1)
  border-left-color: #1890ff
  font-weight: 500

  &:hover
    background: rgba(24, 144, 255, 0.15)
    border-left-color: #1890ff

  // Dark mode styles
  html[data-theme-mode="dark"] &
    color: #40a9ff
    background: rgba(64, 169, 255, 0.2)
    border-left-color: #40a9ff
    
    &:hover
      background: rgba(64, 169, 255, 0.25)

/* 父级激活状态 - 子项激活时父级保持半高亮 */
.parent-active
  color: #1890ff
  border-left-color: rgba(24, 144, 255, 0.5)
  
  &:hover
    background: rgba(24, 144, 255, 0.06)
    border-left-color: #1890ff

  // Dark mode styles
  html[data-theme-mode="dark"] &
    color: #40a9ff
    border-left-color: rgba(64, 169, 255, 0.5)
    
    &:hover
      background: rgba(64, 169, 255, 0.1)
      border-left-color: #40a9ff
</style>
