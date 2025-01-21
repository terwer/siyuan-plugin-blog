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
  }
})

const { t } = useI18n()

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
</script>

<template>
  <div class="outline">
    <div class="outline-title">
      <a class="outline-title-link">{{ t("static.outline") }}</a>
    </div>
    <div class="outline-content">
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
        />
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.outline
  width: 240px
  height: 100vh
  background-color: #fff
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1)
  border: 1px solid #eaeaea
  display: flex
  flex-direction: column
  position fixed

  // Dark mode styles
  html[data-theme-mode="dark"] &
    background-color: #1e1e1e
    border-color: #3a3a3a

.outline-title
  flex-shrink: 0
  padding: 10px 20px
  background-color: inherit
  position: sticky
  top: 0
  z-index: 10
  //border-bottom: 1px solid #eaeaea

  // Dark mode styles
  html[data-theme-mode="dark"] &
    border-bottom-color: #3a3a3a

  .outline-title-link
    color: #333
    font-weight: 600
    text-decoration: none
    cursor: pointer
    transition: color 0.3s ease
    &:hover
      color: #007bff

    // Dark mode styles
    html[data-theme-mode="dark"] &
      color: #ddd
      &:hover
        color: #3399ff

.outline-content
  flex-grow: 1
  overflow-y: auto
  background-color: inherit
  padding: 10px

  // Dark mode styles
  html[data-theme-mode="dark"] &
    background-color: #1e1e1e

.outline-item
  margin-bottom: 8px
  padding-left: 5px
</style>
