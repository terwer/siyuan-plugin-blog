<template>
  <nav v-if="computes.userLinks.value.length || computes.repoLink.value" class="nav-links">
    <!-- user links -->
    <div v-for="item in computes.userLinks.value" :key="item.link" class="nav-item">
      <DropdownLink v-if="item.type === 'links'" :item="item" />
      <NavLink v-else :item="item" />
    </div>

    <!-- repo link -->
    <a
      v-if="computes.repoLink.value"
      :href="computes.repoLink.value"
      class="repo-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      {{ computes.repoLabel.value }}
      <OutboundLink />
    </a>
  </nav>
</template>

<script setup lang="ts">
import OutboundLink from "~/components/vdoing/OutboundLink.vue"
import VdoingUtil from "~/utils/vdoingUtil"
import NavLink from "~/components/vdoing/NavLink.vue"
import DropdownLink from "~/components/vdoing/DropdownLink.vue"
import { useAppConfig } from "~/composables/useAppConfig"
import { computed } from "vue"

// const logger = ZhiServerVue3SsrUtil.zhiLog("nav-links")

// uses
const appConfig = useAppConfig()

const computes = {
  nav: computed(() => {
    // const { locales } = this.$site
    // if (locales && Object.keys(locales).length > 1) {
    //   const currentLink = this.$page.path
    //   const routes = this.$router.options.routes
    //   const themeLocales = this.$site.themeConfig.locales || {}
    //   const languageDropdown = {
    //     text: this.$themeLocaleConfig.selectText || 'Languages',
    //     ariaLabel: this.$themeLocaleConfig.ariaLabel || 'Select language',
    //     items: Object.keys(locales).map(path => {
    //       const locale = locales[path]
    //       const text = themeLocales[path] && themeLocales[path].label || locale.lang
    //       let link
    //       // Stay on the current page
    //       if (locale.lang === this.$lang) {
    //         link = currentLink
    //       } else {
    //         // Try to stay on the same page
    //         link = currentLink.replace(this.$localeConfig.path, path)
    //         // fallback to homepage
    //         if (!routes.some(route => route.path === link)) {
    //           link = path
    //         }
    //       }
    //       return { text, link }
    //     })
    //   }
    //   return [...this.userNav, languageDropdown]
    // }
    // return this.userNav
    return appConfig.themeConfig.nav
  }),

  userLinks: computed(() => {
    const navs = computes.nav.value as []
    return (navs || []).map((link: any) => {
      return Object.assign(VdoingUtil.resolveNavLinkItem(link), {
        items: (link.items || []).map(VdoingUtil.resolveNavLinkItem),
      })
    })
  }),

  repoLink: computed(() => {
    const repo = appConfig.themeConfig.repo
    // logger.debug("repo=>", repo)
    if (repo) {
      return /^https?:/.test(repo) ? repo : `https://github.com/${repo}`
    }
    return null
  }),

  repoLabel: computed(() => {
    if (!computes.repoLink) return
    if (appConfig.themeConfig.repoLabel) {
      return appConfig.themeConfig.repoLabel
    }

    const repoHost = computes.repoLink?.value?.match(/^https?:\/\/[^/]+/) ?? [""]
    const platforms = ["GitHub", "GitLab", "Bitbucket", "Gitee"]
    for (let i = 0; i < platforms.length; i++) {
      const platform = platforms[i]
      if (new RegExp(platform, "i").test(repoHost[0] ?? "")) {
        return platform
      }
    }

    return "Source"
  }),
}
</script>

<style lang="stylus" scoped>
@require "../../assets/vdoing/styles/index"

.nav-links
  display inline-block
  a
    line-height 1.4rem
    color inherit
    &:hover, &.router-link-active
      color $accentColor
  .nav-item
    position relative
    display inline-block
    margin-left 1.5rem
    line-height 2rem
    &:first-child
      margin-left 0
  .repo-link
    margin-left 1.5rem
// 959
@media (max-width $MQNarrow)
  .nav-links
    .nav-item
      margin-left 1.2rem
@media (max-width $MQMobile)
  .nav-links
    .nav-item, .repo-link
      margin-left 0
@media (min-width $MQMobile)
  .nav-links a
    &:hover, &.router-link-active
      color var(--textColor)
  .nav-item > a:not(.external)
    &:hover, &.router-link-active
      margin-bottom -2px
      border-bottom 2px solid lighten($accentColor, 8%)
</style>
