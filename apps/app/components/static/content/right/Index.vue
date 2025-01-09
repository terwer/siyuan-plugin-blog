<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup lang="ts">
import { More } from "@element-plus/icons-vue"
import type AppConfig from "~/app.config"

const props = defineProps<{ post: any, setting: typeof AppConfig }>()

const outlineData = ref(props.post.outline ?? [] as any)
const outlineMaxDepth = ref(props.post?.outlineLevel ?? 6)

// 控制大纲是否显示
const showOutline = ref(false)
const toggleOutline = () => {
  showOutline.value = !showOutline.value
}

onMounted(() => {
  const isMobile = window.innerWidth <= 768
  if (!isMobile) {
    showOutline.value = true
  }
})
</script>

<template>
  <div v-if="outlineData &&outlineData.length>0" class="outline-container">
    <div class="outline-content" :class="{ 'outline-expanded': showOutline }">
      <static-content-right-outline :outline-data="outlineData" :max-depth="outlineMaxDepth" />
    </div>
    <div class="toggle-btn" @click="toggleOutline">
      <el-icon><More /></el-icon>
    </div>
  </div>
  <el-aside v-else class="aside-right-empty" />
</template>

<style lang="stylus" scoped>
.aside-right-empty
  width 20px
.outline-container
  position: relative
  height: 100vh
  display: flex
  flex-direction: column

.outline-content
  position: fixed
  top: 0
  right: 0
  transform: translateX(100%)
  transition: transform 0.3s ease

.outline-expanded
  position relative
  transform: translateX(0)

.toggle-btn
  position: fixed
  color var(--dim)
  top: 32px
  right: 20px
  cursor: pointer
  z-index: 10
  transition: right 0.3s ease
  //&:hover
  //  color: #0056b3

.outline:not(.outline-expanded) .toggle-btn
  right: -40px

/* 移动端适配，默认收起大纲 */
@media (max-width: 768px)
  .outline-container
    z-index 99
  .outline-content
    position fixed
</style>
