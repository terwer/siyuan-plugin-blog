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
      <a class="outline-title-link"> {{ t("static.outline") }} </a>
    </div>
    <div v-for="(item, index) in outlineData" :key="index">
      <static-content-right-outline-item :item="item" :max-depth="maxDepth" :root-level="getRootLevel()" :is-root="true" />
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.outline
  width: 240px
  background-color: #fff
  padding: 10px
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1)
  z-index: 9
  overflow-y auto
  height: 100vh
  position: relative

.outline-title
  margin-bottom: 1rem
  .outline-title-link
    color: #333
    font-weight: 600
    text-decoration: none
    cursor: pointer
    transition: color 0.3s ease
    &:hover
      color: #007bff
</style>
