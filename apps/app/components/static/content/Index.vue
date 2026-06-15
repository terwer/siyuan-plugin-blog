<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup lang="ts">
import type AppConfig from "~/app.config";

const props = defineProps<{ post: any, setting: typeof AppConfig }>()
const { isPageInteractiveReady } = usePageInteractiveReady()
</script>

<template>
  <div
    :class="{
      'content-layout': true,
      'headed-layout': props.setting?.showHeader,
      'content-layout--loading': !isPageInteractiveReady,
    }"
  >
    <static-content-left :post="props.post" :setting="props.setting" />
    <main class="main-content">
      <static-content-main :post="props.post" :setting="props.setting" />
    </main>
    <static-content-right :post="props.post" :setting="props.setting" />
  </div>
</template>

<style scoped lang="stylus">
@import "../../../assets/css/theme/index.styl"

/* 使用 flex 布局替代 el-container */
.content-layout
  display flex
  flex-direction row
  align-items flex-start
  margin 20px 0
  min-height calc(100vh - 40px) /* 减去 margin */

.headed-layout
  margin-top $navbarHeight

.main-content
  flex 1
  min-width 0 /* 防止 flex 子项溢出 */
  padding 0
  margin 0

@media (max-width: 768px)
  .content-layout
    margin 12px 0

  .main-content
    padding-right 0

  .content-layout--loading
    width 100vw
    max-width 100vw
    margin-right 0
    overflow visible

    :deep(.protyle),
    :deep(.protyle-content),
    :deep(.protyle-title),
    :deep(.post-meta),
    :deep(.protyle-wysiwyg)
      width 100vw !important
      max-width 100vw !important
      box-sizing border-box !important

    :deep(.protyle),
    :deep(.protyle-content)
      flex-basis 100vw !important
      height auto !important
      max-height none !important
      overflow visible !important
      overflow-y visible !important

    :deep(.main-content),
    :deep(.protyle-wysiwyg)
      height auto !important
      max-height none !important

    &::after
      content ""
      position fixed
      right 12px
      bottom 12px
      display block
      width 24px
      height 24px
      border 2px solid rgba(64, 158, 255, 0.18)
      border-top-color rgba(64, 158, 255, 0.78)
      border-radius 50%
      background transparent
      pointer-events none
      z-index 4200
      animation mobile-content-loading-spin 0.9s linear infinite

@keyframes mobile-content-loading-spin
  0%
    transform rotate(0deg)
  100%
    transform rotate(360deg)
</style>
