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
import { useDocTreeSource } from "~/composables/useDocTreeSource"

const props = defineProps<{ post: any, setting: typeof AppConfig }>()
const { isFromDocTree, isMobileViewport, shouldApplyDocTreeEffects } = useDocTreeSource()

const shouldShowSidebar = computed(() => {
  // 显示侧边栏的条件：docTree 存在且有内容
  return props.post.docTree && props.post.docTree.length > 0
})

// 初始状态在服务端就确定，避免客户端闪烁
const formData = reactive({
  sidebarVisible: shouldApplyDocTreeEffects.value
})
const isDocTreeAutoOpen = ref(isFromDocTree.value)

watch(shouldApplyDocTreeEffects, (enabled) => {
  if (enabled) {
    formData.sidebarVisible = true
    isDocTreeAutoOpen.value = true
    return
  }

  if (isMobileViewport.value && isFromDocTree.value && isDocTreeAutoOpen.value) {
    formData.sidebarVisible = false
  }
}, { immediate: true })

watch(isMobileViewport, (mobile) => {
  if (mobile && isFromDocTree.value && isDocTreeAutoOpen.value) {
    formData.sidebarVisible = false
  }
})

const sidebarClass = computed(() => {
  return {
    'aside-left': true,
    'sidebarOpen': formData.sidebarVisible,
    'sidebarClosed': !formData.sidebarVisible,
    'sidebarDocTreeAutoOpen': isFromDocTree.value && isDocTreeAutoOpen.value && formData.sidebarVisible
  }
})

const emitToggleSidebar = (state: boolean) => {
  isDocTreeAutoOpen.value = false
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
    <static-content-left-sidebar-button
      :visible="formData.sidebarVisible"
      :doc-tree-auto-open="isFromDocTree && isDocTreeAutoOpen"
      @toggle-sidebar="emitToggleSidebar"
    />
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
    // 使用 display 避免闪烁，同时禁用过渡
    transition: none

@media (max-width: 768px)
  .aside-left-empty
    width 0 !important
    min-width 0 !important
    flex 0 0 0 !important

  .aside-left
    width 0 !important
    min-width 0 !important
    flex 0 0 0 !important
    overflow visible !important

  .sidebarOpen
    width 0 !important
    min-width 0 !important
    overflow visible !important

  .sidebarClosed
    width 0 !important
    min-width 0 !important
    overflow visible !important

  .sidebarDocTreeAutoOpen
    width 0 !important
    min-width 0 !important
    overflow visible !important

    .aside-sidebar
      opacity 0
      pointer-events none

  .aside-sidebar
    width calc(100vw - 56px) !important
    max-width 460px !important
    min-width 0 !important
    background var(--b3-theme-background, var(--el-bg-color, #fff))
    z-index 4100

    :deep(.el-sub-menu__title)
      max-width none
</style>
