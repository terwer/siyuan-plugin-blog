<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup lang="ts">
import { BrowserUtil } from "zhi-device"
import type AppConfig from "~/app.config"
import { useRoute } from '#imports'

const route = useRoute()
const props = defineProps<{ post: any, setting: typeof AppConfig }>()

const formData = reactive({
  sidebarVisible: false
})

const isFromDocTree = computed(() => {
  return route.query.from === 'docTree'
})

const shouldShowSidebar = computed(() => {
  // 显示侧边栏的条件：docTree 存在且有内容
  return props.post.docTree && props.post.docTree.length > 0
})

const sidebarClass = computed(() => {
  // 如果从文档树过来，默认展开；否则使用用户的手动控制状态
  const isVisible = isFromDocTree.value ? true : formData.sidebarVisible
  return {
    'aside-left': true,
    'sidebarOpen': isVisible,
    'sidebarClosed': !isVisible
  }
})

const emitToggleSidebar = (state: boolean) => {
  formData.sidebarVisible = state
  // 防止标题栏被侧边按钮遮挡
  if (BrowserUtil.isInBrowser) {
    const element = document.querySelector(".protyle-title__input") as HTMLElement | null
    if (!element) {
      return
    }
    element.style.marginLeft = formData.sidebarVisible ? "25px" : "0"
  }
}
</script>

<template>
  <el-aside
    v-if="shouldShowSidebar"
    :class="sidebarClass"
  >
    <static-content-left-sidebar class="aside-sidebar" :post="props.post" :setting="props.setting" />
    <static-content-left-sidebar-button @toggle-sidebar="emitToggleSidebar" />
  </el-aside>
  <el-aside v-else class="aside-left-empty" />
</template>

<style scoped lang="stylus">
.aside-left-empty
  width 40px
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
    :deep(.el-sub-menu__title)
      //height 100vh
      max-width 250px

.sidebarOpen
  width: 280px

.sidebarClosed
  width: 60px
  .aside-sidebar
    opacity: 0
    pointer-events: none
</style>
