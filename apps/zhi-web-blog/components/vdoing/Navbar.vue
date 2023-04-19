<template>
  <header class="navbar blur">
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')" />

    <NuxtLink to="/" class="home-link">
      <img
        v-if="appConfig.themeConfig.logo"
        class="logo"
        :src="datas.appBase + appConfig.themeConfig.logo"
        :alt="appConfig.siteTitle"
      />
      <div class="site-info">
        <div v-if="appConfig.siteTitle" ref="siteName" class="site-name">
          {{ appConfig.siteTitle }}
        </div>
        <div class="site-slogan">
          {{ appConfig.siteSlogan }}
        </div>
      </div>
    </NuxtLink>

    <div class="links" :style="datas.linksWrapMaxWidth ? { 'max-width': datas.linksWrapMaxWidth + 'px' } : {}">
      <MeiliSearchBox v-if="computes.isMeilisearch" />
      <client-only v-if="!datas.isMobile">
        <NavLinks class="can-hide" />
      </client-only>
    </div>
  </header>
</template>

<script setup lang="ts">
import SidebarButton from "~/components/vdoing/SidebarButton.vue"
import NavLinks from "~/components/vdoing/NavLinks.vue"
import MeiliSearchBox from "~/components/vdoing/MeiliSearchBox.vue"
import Env from "zhi-env"

const appConfig = useAppConfig()
const nuxtEnv = useRuntimeConfig()
const env = new Env(nuxtEnv.public)
ZhiWebBlogUtil.initEnv(env)

// datas
const datas = reactive({
  appBase: window.location.origin + env.getStringEnv("VITE_APP_BASE"),
  isMobile: true,
  linksWrapMaxWidth: null,
})

// computes
const computes = {
  meilisearch: computed(() => {
    return {}
    // return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
  }),
  isMeilisearch: computed(() => {
    return true
    // return this.algolia && this.algolia.apiKey && this.algolia.indexName
  }),
}

// lifecycle
onBeforeMount(async () => {
  // const deviceDetector = await import("next-vue-device-detector")
  // const d = deviceDetector.createDeviceDetector()
  // datas.isMobile = d.mobile
  datas.isMobile = false
})

onMounted(() => {
  // const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl
  // const NAVBAR_VERTICAL_PADDING = parseInt(css(this.$el, 'paddingLeft')) + parseInt(css(this.$el, 'paddingRight'))
  // const handleLinksWrapWidth = () => {
  //   if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
  //     this.linksWrapMaxWidth = null
  //   } else {
  //     this.linksWrapMaxWidth = this.$el.offsetWidth - NAVBAR_VERTICAL_PADDING
  //         - (this.$refs.siteName && this.$refs.siteName.offsetWidth || 0)
  //   }
  // }
  // handleLinksWrapWidth()
  // window.addEventListener('resize', handleLinksWrapWidth, false)
})
</script>

<style lang="stylus" scoped>
@require "../../assets/vdoing/styles/index"

$navbar-vertical-padding = 0.7rem
$navbar-horizontal-padding = 1.5rem
.navbar
  padding $navbar-vertical-padding $navbar-horizontal-padding
  line-height $navbarHeight - 1.4rem
  transition transform 0.3s
  a, span, img
    display inline-block
  .logo
    height $navbarHeight - 1.4rem
    min-width $navbarHeight - 1.4rem
    margin-right 0.8rem
    vertical-align top
  .site-info
    display inline-block
    .site-name
      font-size 1.2rem
      height 0.6rem
      margin-top -0.4rem
      font-weight 600
      color var(--textColor)
      position relative
    .site-slogan
      margin-top 0.6rem
      font-size 12px
  .links
    padding-left 1.5rem
    box-sizing border-box
    white-space nowrap
    font-size 0.9rem
    position absolute
    right $navbar-horizontal-padding
    top $navbar-vertical-padding
    display flex
    .search-box
      flex 0 0 auto
      vertical-align top
.hide-navbar
  .navbar
    transform translateY(-100%)
// 959
@media (max-width $MQNarrow)
  .navbar
    .site-name
      height 1.6rem !important
    .site-slogan
      margin-top -0.4rem !important

// display none
@media (max-width $MQMobile)
  .navbar
    padding-left 4rem
    .can-hide
      display none
    .links
      padding-left 1.5rem
    .site-name
      width calc(100vw - 9.4rem)
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
</style>
