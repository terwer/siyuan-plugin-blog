<template>
  <div
    class="theme-container"
    :class="computes.pageClasses.value"
    @touchstart="methods.onTouchStart"
    @touchend="methods.onTouchEnd"
  >
    <!-- 页眉 -->
    <Navbar v-if="computes.shouldShowNavbar" @toggle-sidebar="methods.toggleSidebar" />

    <div class="sidebar-mask" @click="methods.toggleSidebar(false)" />

    <div v-if="appConfig?.themeConfig?.sidebarHoverTriggerOpen !== false" class="sidebar-hover-trigger" />

    <Sidebar v-show="datas.showSidebar" :items="computes.sidebarItems" @toggle-sidebar="methods.toggleSidebar">
      <!--
      <template #top v-if="sidebarSlotTop">
        <div class="sidebar-slot sidebar-slot-top" v-html="sidebarSlotTop"></div>
      </template>
      <template #bottom v-if="sidebarSlotBottom">
        <div class="sidebar-slot sidebar-slot-bottom" v-html="sidebarSlotBottom"></div>
      </template>
      -->
      <!--
      <slot name="sidebar-top" #top />
      <slot name="sidebar-bottom" #bottom />
      -->
    </Sidebar>

    <!-- 正文 -->
    <div class="content-main">
      <slot />
    </div>

    <!-- 页脚 -->
    <Footer />

    <!-- 主题切换、返回顶部 -->
    <Buttons ref="buttons" @toggle-theme-mode="methods.toggleThemeMode" />

    <!-- 自定义背景图 -->
    <BodyBgImg v-if="appConfig.themeConfig.bodyBgImg" />

    <!-- 自定义html插入左右下角的小窗口 -->
    <div v-if="methods.windowLB" v-show="datas.showWindowLB" class="custom-html-window custom-html-window-lb">
      <div class="custom-wrapper">
        <span class="close-but" @click="datas.showWindowLB = false">×</span>
        <div v-html="methods.windowLB()" />
      </div>
    </div>
    <div v-if="methods.windowRB" v-show="datas.showWindowRB" class="custom-html-window custom-html-window-rb">
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
import Sidebar from "~/components/vdoing/Sidebar.vue"
import Env from "zhi-env"
import ZhiWebBlogUtil from "~/utils/ZhiWebBlogUtil"

// zhi-util
const nuxtEnv = useRuntimeConfig()
const env = new Env(nuxtEnv.public)
ZhiWebBlogUtil.initEnv(env)
const logger = ZhiWebBlogUtil.zhiLog("vdoing-layout")

// uses
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
  hideNavbar: false,
  isSidebarOpen: false,
  showSidebar: false,
  themeMode: "auto",
  showWindowLB: true,
  showWindowRB: true,
})

// computes
const computes = {
  sidebarItems: computed(() => {
    return []
    // return resolveSidebarItems(
    //     this.$page,
    //     this.$page.regularPath,
    //     this.$site,
    //     this.$localePath
    // )
  }),
  pageClasses: computed(() => {
    // const userPageClass = this.$page.frontmatter.pageClass
    const userPageClass = {}
    const pc = [
      {
        // 'no-navbar': !methods.shouldShowNavbar(),
        "hide-navbar": datas.hideNavbar, // 向下滚动隐藏导航栏
        "sidebar-open": datas.isSidebarOpen,
        "no-sidebar": !methods.shouldShowSidebar(),
        // 'have-rightmenu': this.showRightMenu,
        // 'have-body-img': this.$themeConfig.bodyBgImg,
        // 'only-sidebarItem': this.sidebarItems.length === 1 && this.sidebarItems[0].type === 'page', // 左侧边栏只有一项时
      },
      userPageClass,
    ]

    // logger.debug("pageClasses=>", pc)
    return pc
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

// emits
const emit = defineEmits(["toggle-sidebar"])

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
    emit("toggle-sidebar", datas.isSidebarOpen)
    logger.debug("toggleSidebar triggered=>", datas.isSidebarOpen)
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

  shouldShowNavbar: () => {
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
    return false
  },

  shouldShowSidebar: () => {
    // const { frontmatter } = this.$page
    // return (
    //     !frontmatter.home
    //     && frontmatter.sidebar !== false
    //     && this.sidebarItems.length
    //     && frontmatter.showSidebar !== false
    // )
    return true
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
    const linkElm = document.createElement("link")
    linkElm.setAttribute("rel", "stylesheet")
    linkElm.setAttribute("type", "text/css")
    linkElm.setAttribute("href", social.iconfontCssFile)
    document.head.appendChild(linkElm)
  }
})

onMounted(() => {
  // 解决移动端初始化页面时侧边栏闪现的问题
  datas.showSidebar = true
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

.content-main
  margin-top 80px

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
