<template>
  <header class="navbar blur">
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')" />

    <NuxtLink to="/" class="home-link">
      <img
        class="logo"
        v-if="appConfig.themeConfig.logo"
        :src="appConfig.themeConfig.logo"
        :alt="appConfig.siteTitle"
      />
      <span
        ref="siteName"
        class="site-name"
        v-if="appConfig.siteTitle"
        :class="{ 'can-hide': appConfig.themeConfig.logo }"
        >{{ appConfig.siteTitle }}</span
      >
    </NuxtLink>

    <div class="links" :style="datas.linksWrapMaxWidth ? { 'max-width': datas.linksWrapMaxWidth + 'px' } : {}">
      <!--
      <AlgoliaSearchBox v-if="computes.isAlgoliaSearch" :options="computes.algolia" />
      -->
      <!--
      <SearchBox v-else-if="appConfig.themeConfig.search !== false" />
      -->
      <NavLinks class="can-hide" />
    </div>
  </header>
</template>

<script setup lang="ts">
import SidebarButton from "~/components/vdoing/SidebarButton.vue"
import NavLinks from "~/components/vdoing/NavLinks.vue"

const appConfig = useAppConfig()

const datas = reactive({
  linksWrapMaxWidth: null,
})

const computes = {
  algolia: computed(() => {
    return {}
    // return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
  }),
  isAlgoliaSearch: computed(() => {
    return false
    // return this.algolia && this.algolia.apiKey && this.algolia.indexName
  }),
}
</script>

<style lang="stylus">
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
  .site-name
    font-size 1.3rem
    font-weight 600
    color var(--textColor)
    position relative
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
      display none
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
