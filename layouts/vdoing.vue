<template>
  <div
    class="theme-container"
    :class="computes.pageClasses"
    @touchstart="methods.onTouchStart"
    @touchend="methods.onTouchEnd"
  >
    <!-- 页眉 -->
    <Navbar v-if="computes.shouldShowNavbar" @toggle-sidebar="methods.toggleSidebar" />

    <div class="sidebar-mask" @click="methods.toggleSidebar(false)"></div>

    <!--
    <div v-if="appConfig?.themeConfig?.sidebarHoverTriggerOpen !== false" class="sidebar-hover-trigger"></div>
    -->

    <!--
    <Sidebar :items="sidebarItems" @toggle-sidebar="methods.toggleSidebar" v-show="showSidebar">
      <template #top v-if="sidebarSlotTop">
        <div class="sidebar-slot sidebar-slot-top" v-html="sidebarSlotTop"></div>
      </template>
      <template #bottom v-if="sidebarSlotBottom">
        <div class="sidebar-slot sidebar-slot-bottom" v-html="sidebarSlotBottom"></div>
      </template>
      <slot name="sidebar-top" #top />
      <slot name="sidebar-bottom" #bottom /> 
    </Sidebar>
    -->

    <slot />

    <!-- 页脚 -->
    <Footer />

    <!-- 主题切换、返回顶部 -->
    <Buttons ref="buttons" @toggle-theme-mode="methods.toggleThemeMode" />

    <!-- 自定义背景图 -->
    <BodyBgImg v-if="appConfig.themeConfig.bodyBgImg" />

    <!-- 自定义html插入左右下角的小窗口 -->
    <div class="custom-html-window custom-html-window-lb" v-if="methods.windowLB" v-show="datas.showWindowLB">
      <div class="custom-wrapper">
        <span class="close-but" @click="datas.showWindowLB = false">×</span>
        <div v-html="methods.windowLB()" />
      </div>
    </div>
    <div class="custom-html-window custom-html-window-rb" v-if="methods.windowRB" v-show="datas.showWindowRB">
      <div class="custom-wrapper">
        <span class="close-but" @click="datas.showWindowRB = false">×</span>
        <div v-html="methods.windowRB()" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from "~/components/vdoing/Navbar.vue"
import Footer from "~/components/vdoing/Footer.vue"
import BodyBgImg from "~/components/vdoing/BodyBgImg.vue"
import Buttons from "~/components/vdoing/Buttons.vue"
import storage from "good-storage"

const appConfig = useAppConfig()

// seo
useHead({
  title: appConfig.siteTitle + " - " + appConfig.siteSlogan,
  meta: [{ name: "description", content: appConfig.siteDescription }],
  // bodyAttrs: {
  //   class: "theme-mode-light theme-style-card",
  // },
  // htmlAttrs: {},
})

// datas
const datas = reactive({
  isSidebarOpen: false,
  showSidebar: false,
  themeMode: "auto",
  showWindowLB: true,
  showWindowRB: true,
})

// computes
const computes = {
  pageClasses: computed(() => {
    // const userPageClass = this.$page.frontmatter.pageClass
    // return [
    //   {
    //     'no-navbar': !this.shouldShowNavbar,
    //     'hide-navbar': this.hideNavbar, // 向下滚动隐藏导航栏
    //     'sidebar-open': this.isSidebarOpen,
    //     'no-sidebar': !this.shouldShowSidebar,
    //     'have-rightmenu': this.showRightMenu,
    //     'have-body-img': this.$themeConfig.bodyBgImg,
    //     'only-sidebarItem': this.sidebarItems.length === 1 && this.sidebarItems[0].type === 'page', // 左侧边栏只有一项时
    //   },
    //   userPageClass
    // ]
    return []
  }),
  shouldShowNavbar: computed(() => {
    // const { themeConfig } = this.$site
    // const { frontmatter } = this.$page
    // if (
    //     frontmatter.navbar === false
    //     || themeConfig.navbar === false) {
    //   return false
    // }
    // return (
    //     this.$title
    //     || themeConfig.logo
    //     || themeConfig.repo
    //     || themeConfig.nav
    //     || this.$themeLocaleConfig.nav
    // )
    return true
  }),
}

// methods
const methods = {
  // side swipe
  onTouchStart: (e: any) => {
    //   this.touchStart = {
    //     x: e.changedTouches[0].clientX,
    //     y: e.changedTouches[0].clientY
    //   }
  },
  onTouchEnd: (e: any) => {
    //   const dx = e.changedTouches[0].clientX - this.touchStart.x
    //   const dy = e.changedTouches[0].clientY - this.touchStart.y
    //   if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
    //     if (dx > 0 && this.touchStart.x <= 80) {
    //       this.toggleSidebar(true)
    //     } else {
    //       this.toggleSidebar(false)
    //     }
  },
  toggleSidebar: (to: any) => {
    datas.isSidebarOpen = typeof to === "boolean" ? to : !datas.isSidebarOpen
    console.log(datas.isSidebarOpen)
    // this.$emit('toggle-sidebar', this.isSidebarOpen)
  },

  _autoMode: () => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      // 系统处于深色模式
      datas.themeMode = "dark"
    } else {
      datas.themeMode = "light"
    }
  },
  toggleThemeMode: (key: string) => {
    if (key === "auto") {
      methods._autoMode()
    } else {
      datas.themeMode = key
    }
    storage.set("mode", key)
  },

  windowLB: () => {
    return "<p>test1</p>"
    // return this.getHtmlStr('windowLB')
  },
  windowRB: () => {
    return "<p>test2</p>"
    // return this.getHtmlStr('windowRB')
  },

  setBodyClass: () => {
    const bodyBgImg = appConfig.themeConfig.bodyBgImg
    let pageStyle = appConfig.themeConfig.pageStyle ?? "card"
    if ((pageStyle !== "card" && pageStyle !== "line") || bodyBgImg) {
      pageStyle = "card"
    }
    document.body.className = `theme-mode-${datas.themeMode} theme-style-${pageStyle}`
  },
}

// lifecycles
onBeforeMount(() => {
  // this.isSidebarOpenOfclientWidth()
  const mode = storage.get("mode") // 不放在created是因为vuepress不能在created访问浏览器api，如window
  const { defaultMode } = appConfig.themeConfig

  if (defaultMode && defaultMode !== "auto" && !mode) {
    datas.themeMode = defaultMode
  } else if (!mode || mode === "auto" || (!mode && defaultMode === "auto")) {
    // 当未切换过模式，或模式处于'跟随系统'时
    methods._autoMode()
  } else {
    datas.themeMode = mode
  }
  methods.setBodyClass()

  // 引入图标库
  const social = appConfig.themeConfig.social
  if (social && social.iconfontCssFile) {
    let linkElm = document.createElement("link")
    linkElm.setAttribute("rel", "stylesheet")
    linkElm.setAttribute("type", "text/css")
    linkElm.setAttribute("href", social.iconfontCssFile)
    document.head.appendChild(linkElm)
  }
})

watch(
  () => datas.themeMode,
  () => {
    methods.setBodyClass()
  }
)
</script>

<style lang="stylus">
@require "../assets/vdoing/styles/index"

.custom-html-window
  position fixed
  bottom 0
  display flex
  overflow hidden
  font-weight 350
  @media (max-width 960px)
    display none
  .custom-wrapper
    position relative
    max-width 200px
    max-height 400px
    .close-but
      cursor pointer
      position absolute
      right 0
      top 0
      font-size 1.5rem
      line-height 1.5rem
      width 1.5rem
      height 1.5rem
      opacity 0
      transition all 0.2s
      &:hover
        opacity 0.9
    &:hover
      .close-but
        opacity 0.7
  &.custom-html-window-lb
    left 0
    z-index 99
    &>*
      align-self flex-end
  &.custom-html-window-rb
    right 80px
    z-index 10
    justify-content flex-end
    &>*
      align-self flex-end
</style>
