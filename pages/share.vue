<script setup lang="ts">
import { useSettingStore } from "~/stores/useSettingStore"
import { useRouteQuery } from "@vueuse/router"
import { createAppLogger } from "~/common/appLogger"
import { useShareOptionToggle } from "~/composables/useShareOptionToggle"
import copy from "copy-to-clipboard"
import { useSiyuanApi } from "~/composables/api/useSiyuanApi"
import { PostStatusEnum } from "zhi-blog-api"
import { DateUtil, JsonUtil, StrUtil } from "zhi-common"
import { useMethodAsync } from "~/composables/useMethodAsync"
import { useMethod } from "~/composables/useMethod"

const logger = createAppLogger("share-page")
const { t } = useI18n()
const { handleMethod } = useMethod()
const { handleMethodAsync } = useMethodAsync()

const { getSetting, updateSetting } = useSettingStore()
const { blogApi, kernelApi } = useSiyuanApi()

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
const post = await blogApi.getPost(id.value, false, true)
const title = `${t("blog.share")} - ${t("blog.share.options")}`
const seoMeta = {
  title: title,
  ogTitle: title,
} as any
useSeoMeta(seoMeta)

// datas
const attrs = JsonUtil.safeParse<any>(post?.attrs ?? "{}", {})
const formData = reactive({
  shareEnabled: attrs["custom-publish-status"] === PostStatusEnum.PostStatusEnum_Publish,
  shareLink: `${origin.value}${basePath}/s/${id.value}`,
  optionEnabled: false,
  expiredTime: attrs["custom-expires"] ?? "0",
  isHome: setting.homePageId === id.value,
})
const { optionState, optionToggle } = useShareOptionToggle(formData.optionEnabled)

// methods
// const goSetting = async () => {
//   await navigateTo("/setting")
// }

const goHelp = async () => {
  window.open("https://blog.terwer.space/docs")
}

const copyWebLink = () => {
  handleMethod(() => {
    copy(formData.shareLink)
  })
}

const handleShare = (val: any) => {
  new Promise<void>((resolve, reject) => {
    handleMethodAsync(
      async () => {
        // 自适应高度
        sendMessageToParent("updateHeight")

        // 分享
        if (val) {
          await kernelApi.setBlockAttrs(id.value, {
            "custom-publish-status": PostStatusEnum.PostStatusEnum_Publish,
            "custom-publish-time": new Date().getTime().toString(),
          })
        } else {
          // 取消分享
          await kernelApi.setBlockAttrs(id.value, {
            "custom-publish-status": PostStatusEnum.PostStatusEnum_Draft,
            "custom-publish-time": "",
          })
        }
        resolve()
      },
      () => {
        if (formData.isHome) {
          formData.shareEnabled = true
          ElMessage.error(t("blog.index.home.exists"))
          return false
        }
        return true
      }
    ).catch((error) => {
      reject(error)
    })
  })
}

const handleSetHome = (val: any) => {
  new Promise<void>((resolve, reject) => {
    handleMethodAsync(async () => {
      if (val) {
        setting.homePageId = id.value
      } else {
        setting.homePageId = undefined
      }
      await updateSetting(setting)
      resolve()
    }).catch((error) => {
      reject(error)
    })
  })
}

const handleExpiresTime = async () => {
  const expiredTime = Number(toRaw(formData.expiredTime))
  await handleMethodAsync(
    async () => {
      await kernelApi.setBlockAttrs(id.value, {
        "custom-expires": expiredTime.toString(),
      })
    },
    () => {
      if (isNaN(expiredTime) || expiredTime <= 0 || expiredTime > 7 * 24 * 60 * 60) {
        ElMessage.error(t("share.link.expires.error"))
        return false
      }
      return true
    }
  )
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
        {{ post.title }}
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
          <el-switch v-model="formData.shareEnabled" @change="handleShare" />
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

      <div v-if="optionState" class="share-item expires-link-item">
        <div class="expires-link expires-link-label">
          {{ t("share.other.option.link.expires") }}
        </div>
        <div class="expires-link expires-link-input">
          <el-input v-model="formData.expiredTime" :placeholder="t('share.link.expires.time.placeholder')" />
        </div>
        <div class="item-right">
          <el-button type="primary" @click="handleExpiresTime">{{ t("main.opt.save") }}</el-button>
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
          <el-switch v-model="formData.isHome" @change="handleSetHome" />
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
  ::v-deep(.el-switch)
    display inline-block
  .expires-link-item
    ::v-deep(.el-switch)
      display inline-flex
  .el-page-header__content
    ::v-deep(.el-switch)
      display inline-flex
</style>
