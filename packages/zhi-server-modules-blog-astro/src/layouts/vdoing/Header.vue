<template>
  <!-- 页眉 -->
  <Navbar v-if="computes.shouldShowNavbar.value" @toggle-sidebar="methods.toggleSidebar" />

  <!-- 侧边栏 -->
  <div class="sidebar-mask" @click="methods.toggleSidebar(false)"></div>
  <div v-if="appConfig.themeConfig.sidebarHoverTriggerOpen !== false" class="sidebar-hover-trigger"></div>
  <Sidebar :items="computes.sidebarItems" @toggle-sidebar="methods.toggleSidebar" v-show="datas.showSidebar" />
</template>

<script lang="ts" setup>
import Navbar from "@components/vdoing/Navbar.vue"
import ZhiUtil from "@utils/zhiUtil"
import { computed, reactive, onMounted } from "vue"
import appConfig from "@src/app.config"
import Sidebar from "@components/vdoing/Sidebar.vue"

const zhiSdk = ZhiUtil.zhiSdk()
const logger = zhiSdk.getLogger()

// datas
const datas = reactive({
  isSidebarOpen: false,
  showSidebar: false,
})

// computes
const computes = {
  sidebarItems: computed(() => {
    return []
  }),
  shouldShowNavbar: computed(() => {
    return true
  }),
}

// methods
const methods = {
  toggleSidebar: (to: any) => {
    datas.isSidebarOpen = typeof to === "boolean" ? to : !datas.isSidebarOpen

    const container = document.querySelector(".theme-container")
    if (container) {
      container.classList.toggle("sidebar-open")
      container.classList.toggle("no-sidebar")
    }

    logger.debug("toggleSidebar triggered=>", datas.isSidebarOpen)
  },
}

// lifecycle
onMounted(() => {
  // 解决移动端初始化页面时侧边栏闪现的问题
  datas.showSidebar = true
})
</script>

<style lang="stylus">
@require "../../assets/vdoing/styles/index"
</style>
