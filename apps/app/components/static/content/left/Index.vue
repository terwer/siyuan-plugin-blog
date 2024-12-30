<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup lang="ts">
import type AppConfig from "~/app.config"

const props = defineProps<{ post: any, setting: typeof AppConfig }>()

const formData = reactive({
  sidebarVisible: false
})

const emitToggleSidebar = (state: boolean) => {
  formData.sidebarVisible = state
}
</script>

<template>
  <el-aside :class="{'aside-left': true, sidebarOpen: formData.sidebarVisible, sidebarClosed: !formData.sidebarVisible}">
    <static-content-left-sidebar class="aside-sidebar" :post="props.post" :setting="props.setting" />
    <static-content-left-sidebar-button @toggle-sidebar="emitToggleSidebar" />
  </el-aside>
</template>

<style scoped lang="stylus">
.aside-left
  transition: width 0.3s ease
  .aside-sidebar
    position: fixed
    top: 0
    left: 0
    height: 100vh
    overflow-y: auto
    transition: opacity 0.3s ease
    opacity: 1
    pointer-events: auto
    :deep(.el-menu)
      height 100vh
      width 250px

.sidebarOpen
  width: 280px

.sidebarClosed
  width: 60px
  .aside-sidebar
    opacity: 0
    pointer-events: none
</style>
