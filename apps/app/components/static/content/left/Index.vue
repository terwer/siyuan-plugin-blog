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
  height: 100vh
  .aside-sidebar
    width: 100%
    height: 100%
    overflow-y: auto
    transition: opacity 0.3s ease
    opacity: 1
    pointer-events: auto

.sidebarOpen
  width: 280px

.sidebarClosed
  width: 60px
  .aside-sidebar
    opacity: 0
    pointer-events: none
</style>
