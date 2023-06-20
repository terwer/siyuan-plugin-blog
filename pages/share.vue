<script setup lang="ts">
import { useSettingStore } from "~/stores/useSettingStore"
import { useRouteQuery } from "@vueuse/router"
import { createAppLogger } from "~/common/appLogger"
import { useShareOptionToggle } from "~/composables/useShareOptionToggle"
import copy from "copy-to-clipboard"

const logger = createAppLogger("share-page")
const { t } = useI18n()
const { getSetting } = useSettingStore()

const id = useRouteQuery("id", "")
const origin = useRouteQuery("origin", "")
const isSsr = useRouteQuery("isSsr", "")
const basePath = String(isSsr.value) === "true" ? "/plugins/siyuan-blog" : "/plugins/siyuan-blog/#"

// lifecycles
// onBeforeMount(() => {
//   const mainEl = document.querySelector(".el-main") as any
//   mainEl.style.margin = "0"
//   mainEl.style.padding = "0"
// })

const setting = await getSetting()
const title = `${t("blog.share")} - ${t("blog.share.options")}`
const seoMeta = {
  title: title,
  ogTitle: title,
} as any
useSeoMeta(seoMeta)

// datas
const formData = reactive({
  shareEnabled: false,
  shareLink: `${origin.value}${basePath}/s/${id.value}`,
  optionEnabled: false,
})
const { optionState, optionToggle } = useShareOptionToggle(formData.optionEnabled)

// methods
const goSetting = async () => {
  await navigateTo("/setting")
}

const goHelp = async () => {
  window.open("https://blog.terwer.space/docs")
}

const copyWebLink = () => {
  copy(formData.shareLink)
  ElMessage.success(t("main.opt.success"))
}
</script>

<template>
  <div id="share">
    <div class="share-item share-subject">
      <div class="item-left">
        {{ t("share.share") }}
        <el-icon style="vertical-align: middle">
          <el-icon-user-filled />
        </el-icon>
        {{ t("share.share") }}
      </div>
      <div class="item-right"></div>
    </div>
    <el-divider class="share-split" />

    <div class="el-page-header__content share-item">
      <div class="flex items-center">
        <span class="share-icon">
          <el-icon>
            <el-icon-chrome-filled />
          </el-icon>
        </span>
        <span class="text-large font-600 mr-3 share-title"> {{ t("share.to.web") }} </span>
        <span class="text-sm mr-2 share-description">
          {{ t("share.to.web.before.tip") }}
        </span>
        <span class="item-right">
          <el-switch v-model="formData.shareEnabled" />
        </span>
      </div>
    </div>
    <el-divider class="share-split" />

    <div v-if="formData.shareEnabled">
      <div class="share-item">
        <div class="item-left item-copy-link">
          <el-input v-model="formData.shareLink" />
        </div>
        <div class="item-right">
          <el-button type="default" @click="copyWebLink">{{ t("share.copy.web.link") }}</el-button>
        </div>
      </div>
      <el-divider class="share-split" />

      <div class="share-item" @click="optionToggle">
        <div class="item-left item-copy-link">
          <el-space direction="vertical">
            <el-text>
              {{ t("share.show.link.option") }}
              <el-icon>
                <el-icon-arrow-up v-if="optionState" />
                <el-icon-arrow-down v-else />
              </el-icon>
            </el-text>
          </el-space>
        </div>
        <div class="item-right"></div>
      </div>

      <div v-if="optionState" class="share-item">
        <div class="expires-link expires-link-label">
          {{ t("share.other.option.link.expires") }}
        </div>
        <div class="expires-link expires-link-input">
          <el-input :placeholder="t('share.link.expires.time.placeholder')" />
        </div>
        <div class="item-right">
          <el-switch />
        </div>
      </div>
      <el-divider class="share-split" />

      <div class="share-item">
        <div class="item-left">
          <el-icon>
            <el-icon-home-filled />
          </el-icon>
          {{ t("share.set.home") }}
        </div>
        <div class="item-right">
          <el-switch />
        </div>
      </div>
      <el-divider class="share-split" />

      <!--
      <div class="share-item text-center other-setting">
        <div class="item-middle" @click="goSetting">{{ t("share.other.option") }}</div>
      </div>
      -->
    </div>

    <div class="share-item">
      <div class="item-left">
        <el-space direction="vertical">
          <el-text @click="goHelp">
            <el-icon>
              <el-icon-help />
            </el-icon>
            {{ t("share.help") }}
          </el-text>
        </el-space>
      </div>
      <!--
      <div class="item-right">
        <el-button :icon="Share" type="text">{{ t("share.copy.link") }}</el-button>
      </div>
      -->
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.text-center
  text-align center
.share-split
  margin 2px 0

#share
  .share-item
    padding 6px 10px
    &:hover, &:focus
      cursor pointer
      //border-radius 5px
      //border-color var(--el-border-color)
      //background-color var(--b3-list-hover)
    .share-icon
      vertical-align middle
      font-size 26px
      fill rgba(55, 53, 47, 0.35)
    .share-title
      font-size 16px
    .share-description
      font-size 12px
    .item-left
      display inline-block
    .item-copy-link
      width 75%
      ::v-deep(.el-space__item)
        padding 0 !important
    .item-right
      display inline-block
      float right
    .item-middle
      display inline-block
      background-color transparent
    .expires-link
      display inline-block
    .expires-link-label
      margin-right 10px
    .expires-link-input
      width 60%
  .other-setting
    border-radius 4px
    background-color var(--b3-list-hover)
  .share-subject
    font-size 14px
    font-weight 600
</style>
