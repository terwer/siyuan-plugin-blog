<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup>
import { ref } from 'vue'

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
  }
})

const getFirstMargin = (item) => {
  const level = getItemLevel(item)
  return (level - 1) * 16
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
    const textContent = match.match(/>[\s\S]*?</)
    return textContent ? textContent[1] : ""
  })
  return adjustedName
}

const getItemLevel = (item) => {
  const level = parseInt(item.subType.replace("h", ""), 10)
  return isNaN(level) ? 1 : level
}

const scrollToSection = (id) => {
  const element = document.querySelector(`[data-node-id="${id}"]`)
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" })
    window.scrollBy(0, -20)
  }
}

// Hover 状态管理
const isHovered = ref(false)
const showTooltip = ref(false)

const handleMouseEnter = () => {
  isHovered.value = true
  // 延迟显示 tooltip，避免快速移动时闪烁
  setTimeout(() => {
    if (isHovered.value) {
      showTooltip.value = true
    }
  }, 300)
}

const handleMouseLeave = () => {
  isHovered.value = false
  showTooltip.value = false
}
</script>

<template>
  <div
    :style="{ paddingLeft: getFirstMargin(item) + 'px' }"
    class="mintlify-outline-item"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- 第一级 -->
    <div v-if="getItemLevel(item) === 1 || isRoot" class="nested-items">
      <a
        class="mintlify-item-link"
        :class="{ active: item.name === activeText }"
        @click.prevent="scrollToSection(item.id)"
        :title="adjustItemName(item.name)"
      >
        {{ adjustItemName(item.name) }}
      </a>

      <!-- Tooltip 显示完整文本 -->
      <div
        v-if="showTooltip && adjustItemName(item.name).length > 20"
        class="tooltip"
        :style="{ left: getFirstMargin(item) + 'px' }"
      >
        {{ adjustItemName(item.name) }}
      </div>

      <div v-if="getItemLevel(item) < maxDepth">
        <mintlify-outline-item
          v-for="(child, index) in item.blocks"
          :key="index"
          :item="child"
          :max-depth="maxDepth"
        />
      </div>
    </div>

    <!-- 其他级别且有子项 -->
    <div v-else-if="Array.isArray(item.children) && item.children.length > 0" class="nested-items">
      <a
        class="mintlify-item-link"
        :class="{ active: item.name === activeText }"
        @click.prevent="scrollToSection(item.id)"
        :title="adjustItemName(item.content)"
      >
        {{ adjustItemName(item.content) }}
      </a>

      <!-- Tooltip 显示完整文本 -->
      <div
        v-if="showTooltip && adjustItemName(item.content).length > 20"
        class="tooltip"
        :style="{ left: getFirstMargin(item) + 'px' }"
      >
        {{ adjustItemName(item.content) }}
      </div>

      <div v-if="getItemLevel(item) < maxDepth">
        <mintlify-outline-item
          v-for="(child, index) in item.children"
          :key="index"
          :item="child"
          :max-depth="maxDepth"
        />
      </div>
    </div>

    <!-- 无子项 -->
    <div v-else>
      <div v-if="getItemLevel(item) < maxDepth">
        <a
          class="mintlify-item-link"
          @click.prevent="scrollToSection(item.id)"
          :title="adjustItemName(item.content)"
        >
          {{ adjustItemName(item.content) }}
        </a>

        <!-- Tooltip 显示完整文本 -->
        <div
          v-if="showTooltip && adjustItemName(item.content).length > 20"
          class="tooltip"
          :style="{ left: getFirstMargin(item) + 'px' }"
        >
          {{ adjustItemName(item.content) }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.mintlify-outline-item
  margin-bottom 8px
  position relative

.mintlify-item-link
  color #333333
  text-decoration none
  cursor pointer
  transition all 0.2s ease
  font-size 14px
  line-height 1.5
  display block
  padding 2px 0
  white-space nowrap
  overflow hidden
  text-overflow ellipsis
  max-width 240px

  &:hover
    color #1e40af

  // Dark mode styles
  html[data-theme-mode="dark"] &
    color #ddd
    &:hover
      color #3399ff

.active
  color #1e40af !important
  font-weight 600

  // Dark mode styles
  html[data-theme-mode="dark"] &
    color #3399ff

// Tooltip 样式
.tooltip
  position absolute
  top -28px
  background-color rgba(0, 0, 0, 0.8)
  color white
  padding 4px 8px
  border-radius 4px
  font-size 12px
  white-space nowrap
  z-index 1001
  pointer-events none
  max-width 300px
  word-break break-word

// 防止文本换行导致堆叠
div[style*="paddingLeft"]
  white-space nowrap
  overflow hidden
  text-overflow ellipsis
</style>