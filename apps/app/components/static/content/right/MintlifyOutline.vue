<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup>
import MintlifyOutlineItem from "~/components/static/content/right/MintlifyOutlineItem.vue"

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
  <div class="mintlify-outline">
    <div class="mintlify-outline-title">
      <span class="mintlify-outline-title-text">{{ t("static.outline") }}</span>
    </div>
    <div class="mintlify-outline-content">
      <div
        v-for="(item, index) in outlineData"
        :key="index"
        class="mintlify-outline-item"
      >
        <mintlify-outline-item
          :item="item"
          :max-depth="maxDepth"
          :root-level="getRootLevel()"
          :is-root="true"
          :active-text="props.activeText"
        />
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.mintlify-outline
  background-color #ffffff
  border-left 1px solid #eaeaea
  box-shadow 2px 0 6px rgba(0, 0, 0, 0.05)
  display flex
  flex-direction column
  min-width 200px
  max-width 280px
  height 100%
  font-family 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif

  // Dark mode support
  html[data-theme-mode="dark"] &
    background-color #1e1e1e
    border-color #3a3a3a

.mintlify-outline-title
  position sticky
  top 0
  z-index 10
  padding 10px 16px
  background-color inherit
  border-bottom 1px solid #eaeaea
  font-size 12px
  font-weight 600
  color #059669
  text-transform uppercase
  letter-spacing 0.5px

  .mintlify-outline-title-text
    color #059669
    font-weight 600
    border-bottom 1px solid #059669
    padding-bottom 2px

.mintlify-outline-content
  flex-grow 1
  overflow-y auto
  background-color inherit
  padding 16px

.mintlify-outline-item
  margin-bottom 8px

// Scrollbar styling
::-webkit-scrollbar
  width 6px

::-webkit-scrollbar-track
  background transparent

::-webkit-scrollbar-thumb
  background-color rgba(0, 0, 0, 0.15)
  border-radius 3px

html[data-theme-mode="dark"] ::-webkit-scrollbar-thumb
  background-color rgba(255, 255, 255, 0.2)
</style>