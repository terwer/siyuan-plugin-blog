<template>
  <div class="footer">
    <div v-if="computes.social.value && computes.social.value.icons" class="icons">
      <a
        v-for="(item, index) in computes.social.value.icons"
        :key="index"
        :href="item.link"
        :title="item.title"
        :class="['iconfont', item.iconClass]"
        target="_blank"
      />
    </div>

    <!--Vdoing主题遵循MIT协议，完全开源且免费。如果您对主题的修改并不大，希望您保留主题的链接。-->
    Theme by
    <a href="https://github.com/terwer/zhi-blog/" target="_blank" title="本站主题">Zhi</a>. | Inspired by
    <a href="https://github.com/xugaoyi/vuepress-theme-vdoing" target="_blank">Vdoing</a>
    <template v-if="computes.footer.value">
      | Copyright © {{ computes.footer.value.createYear }}-{{ new Date().getFullYear() }}
      <span v-html="computes.footer.value.copyrightInfo" />
    </template>
  </div>
</template>

<script lang="ts" setup>
const appConfig = useAppConfig()

// computes
const computes = {
  social: computed(() => {
    return appConfig.themeConfig.social
  }),
  footer: computed(() => {
    return appConfig.themeConfig.footer
  }),
}
</script>

<style lang="stylus" scoped>
// $mobileSidebarWidth = $sidebarWidth * 0.82
.footer
  padding 5rem 1.5rem 2.5rem
  text-align center
  color #666
  box-sizing border-box
  font-size 0.85rem
  transition all 0.2s ease
  > span
    line-height 1.5rem
  .icons
    margin-bottom 12px
    .iconfont
      padding 0 10px
      font-size 1.3rem
  a
    color #11a8cd
    &:hover
      color $accentColor
@media (min-width ($MQMobile + 1px))
  .sidebar-open .footer
    width auto
    padding-left: ($sidebarWidth + 1.5rem)
@media (min-width 1520px)
  .have-rightmenu .footer
    padding-right: ($rightMenuWidth + 1.5rem)
.no-sidebar .footer
  width auto
  padding-left 1.5rem
</style>
