<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2023-2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup lang="ts">
import { useI18n } from "vue-i18n"
import { StrUtil } from "zhi-common"
import AppConfig from "~/app.config"

// props
const props = defineProps<{ setting: typeof AppConfig }>()

// uses
const { t } = useI18n()

// datas
const header = props.setting?.header ?? ""

const VNode = () =>
  h("div", {
    class: "",
    innerHTML: header,
  })
</script>

<template>
  <div class="header navbar blur">
    <nuxt-link to="/" class="home-link">
      <img
        v-if="!StrUtil.isEmptyString(props.setting?.themeConfig?.logo)"
        class="logo"
        :src="ThemeUtils.withBase(props.setting?.themeConfig?.logo, props.setting)"
        :alt="props.setting.siteTitle"
      >
      <span
        v-if="props.setting.siteTitle"
        ref="siteName"
        class="site-name"
        :class="{ 'can-hide': props.setting?.themeConfig?.logo }"
      >{{ props.setting.siteTitle }}</span>
    </nuxt-link>

    <div class="links">
      <!--      <NavLinks class="can-hide"/>-->
    </div>
    <VNode />
  </div>
</template>

<style lang="stylus" scoped>
@import "../../assets/css/theme/index.styl"

$navbar-vertical-padding = 0.7rem
$navbar-horizontal-padding = 1.5rem

.navbar
  position fixed
  z-index 20
  top 0
  left 0
  right 0
  height $navbarHeight
  background-color var(--blurBg)
  box-sizing border-box
  box-shadow 0 2px 5px rgba(0,0,0,.06)

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
