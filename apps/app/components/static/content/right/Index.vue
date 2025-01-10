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

// 控制大纲状态，true 为展开，false 为收起
const showOutline = ref(false)
// 控制 hover 状态，true 为 hover 展开，false 为 hover 收起
const isHovered = ref(false)

// 切换大纲显示/隐藏
const toggleOutline = () => {
  showOutline.value = !showOutline.value
}

// hover 状态控制
const onHover = (state:boolean) => {
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
</script>

<template>
  <div class="outline-wrapper" :class="{ 'outline-wrapper-expanded': showOutline }">
    <div
      v-if="outlineData && outlineData.length > 0"
      class="outline-container"
      :class="{ 'outline-expanded': showOutline }"
    >
      <div class="outline-content">
        <static-content-right-outline :outline-data="outlineData" :max-depth="outlineMaxDepth" />
      </div>
    </div>
    <div
      class="toggle-btn"
      @click="toggleOutline"
      @mouseenter="onHover(true)"
      @mouseleave="onHover(false)"
    >
      <el-icon><More /></el-icon>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
/* 包裹容器 */
.outline-wrapper
  position relative
  width unset

.outline-wrapper-expanded
  width 240px

/* 大纲整体容器 */
.outline-container
  position fixed /* 固定在页面右侧 */
  top 0
  right 0
  height 100vh /* 占满视窗高度 */
  width 240px /* 固定宽度，仅在展开时可见 */
  background var(--background)
  border-left 1px solid var(--border-color)
  display flex
  flex-direction column
  transform translateX(100%) /* 默认隐藏大纲 */
  transition transform 0.3s ease

/* 展开状态 */
.outline-container.outline-expanded
  transform translateX(0)

/* 大纲内容 */
.outline-content
  flex 1
  overflow-y auto /* 独立滚动 */
  padding 16px

/* 切换按钮 */
.toggle-btn
  position fixed /* 按钮始终固定 */
  top 16px
  right 20px
  z-index 100
  cursor pointer
  transition right 0.3s ease

/* 小屏适配：隐藏大纲 */
@media (max-width: 768px)
  .outline-container
    display none
</style>
