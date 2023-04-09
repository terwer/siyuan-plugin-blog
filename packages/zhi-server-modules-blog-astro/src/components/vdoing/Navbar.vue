<template>
    <header class="navbar blur">
        <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')" />

        <a href="/" class="home-link">
            <img
                class="logo"
                v-if="appConfig.themeConfig.logo"
                :src="appConfig.themeConfig.logo"
                :alt="appConfig.siteTitle"
            />
            <div class="site-info">
                <div ref="siteName" class="site-name" v-if="appConfig.siteTitle">
                    {{ appConfig.siteTitle }}
                </div>
                <div class="site-slogan">{{ appConfig.siteSlogan }}</div>
            </div>
        </a>

        <div class="links" :style="datas.linksWrapMaxWidth ? { 'max-width': datas.linksWrapMaxWidth + 'px' } : {}">
            <!--
      <MeiliSearchBox v-if="computes.isMeilisearch" />
      -->
            <NavLinks class="can-hide" />
        </div>
    </header>
</template>

<script setup lang="ts">
import SidebarButton from "@astroBlog/src/components/vdoing/SidebarButton.vue"
import appConfig from "@astroBlog/src/app.config"
import NavLinks from "@astroBlog/src/components/vdoing/NavLinks.vue"
import { reactive } from "vue"

// datas
const datas = reactive({
    linksWrapMaxWidth: null,
})
</script>

<style lang="stylus">
@require "../../assets/vdoing/styles/config"

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
