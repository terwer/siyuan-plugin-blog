<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup>
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
    const textContent = match.match(/>([\s\S]*?)</)
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
</script>

<template>
  <div :style="{ marginLeft: getFirstMargin(item) + 'px' }" class="outline-item">
    <!-- 第一级 -->
    <div v-if="getItemLevel(item) === 1 || isRoot" class="nested-items">
      <a class="item-link" :class="{ active: item.name === activeText }" @click.prevent="scrollToSection(item.id)">
        {{ adjustItemName(item.name) }}
      </a>
      <div v-if="getItemLevel(item) < maxDepth">
        <outline-item v-for="(child, index) in item.blocks" :key="index" :item="child" :max-depth="maxDepth" />
      </div>
    </div>

    <!-- 其他级别且有子项 -->
    <div v-else-if="Array.isArray(item.children) && item.children.length > 0" class="nested-items">
      <a class="item-link" :class="{ active: item.name === activeText }" @click.prevent="scrollToSection(item.id)">
        {{ adjustItemName(item.content) }}
      </a>
      <div v-if="getItemLevel(item) < maxDepth">
        <outline-item v-for="(child, index) in item.children" :key="index" :item="child" :max-depth="maxDepth" />
      </div>
    </div>

    <!-- 无子项 -->
    <div v-else>
      <div v-if="getItemLevel(item) < maxDepth">
        <a class="item-link" @click.prevent="scrollToSection(item.id)">
          {{ adjustItemName(item.content) }}
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.outline-item
  margin-bottom: 8px
  padding-left: 5px

  // Dark mode styles
  html[data-theme-mode="dark"] &
    color: #ccc

.item-link
  color: #333
  text-decoration: none
  cursor: pointer
  transition: color 0.2s ease

  &:hover
    color: #1890ff
    font-weight: bold

  // Dark mode styles
  html[data-theme-mode="dark"] &
    color: #bbb
    &:hover
      color: #40a9ff

.nested-items
  &:first-child
    margin-left 0
  &:not(:first-child)
    margin-left 20px

.active
  color: #1890ff

  // Dark mode styles
  html[data-theme-mode="dark"] &
    color: #40a9ff
</style>
