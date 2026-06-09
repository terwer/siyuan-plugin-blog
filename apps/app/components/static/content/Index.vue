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
</script>

<template>
  <div :class="{ 'content-layout': true, 'headed-layout': props.setting?.showHeader }">
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
  padding 0 60px 0 0 /* 右侧留出60px空间给按钮组 */
  margin 0

@media (max-width: 768px)
  .content-layout
    margin 12px 0

  .main-content
    padding-right 0
</style>
