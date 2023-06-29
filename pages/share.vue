<script setup lang="ts">
import { useSettingStore } from "~/stores/useSettingStore"
import { useRouteQuery } from "@vueuse/router"
import { createAppLogger } from "~/common/appLogger"
import { useShareOptionToggle } from "~/composables/useShareOptionToggle"
import copy from "copy-to-clipboard"
import { useSiyuanApi } from "~/composables/api/useSiyuanApi"
import { PostStatusEnum } from "zhi-blog-api"
import { JsonUtil, StrUtil } from "zhi-common"
import { useMethodAsync } from "~/composables/useMethodAsync"
import { useMethod } from "~/composables/useMethod"
import { sendMessageToParent } from "~/utils/innerIframeEvent"
import { getAllIps } from "~/utils/urlUtil"

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
onMounted(() => {
  // const mainEl = document.querySelector(".el-main") as any
  // mainEl.style.margin = "0"
  // mainEl.style.padding = "0"

  // const win = SiyuanDevice.siyuanWindow()
  const win = window.parent as any
  formData.accessCodeEnabled = win?.siyuan?.config?.accessAuthCode !== ""
  if (formData.accessCodeEnabled) {
    formData.shareLink = `${shareOrigin}${basePath}/static/${id.value}`
    logger.warn("accessAuthCode is enabled, share is in limited stated.")
  }
})

const setting = await getSetting()
const post = await blogApi.getPost(id.value, false, false)
const title = `${t("blog.share")} - ${t("blog.share.options")}`
const seoMeta = {
  title: title,
  ogTitle: title,
} as any
useSeoMeta(seoMeta)

// 初始化 ip
const url = new URL(origin.value)
const hostname = url.hostname
const ips = getAllIps()
ips.push(hostname)

// datas
const attrs = JsonUtil.safeParse<any>(post?.attrs ?? "{}", {})
const shareOrigin = StrUtil.isEmptyString(setting?.siteUrl) ? origin.value : setting.siteUrl
const formData = reactive({
  accessCodeEnabled: false,
  shareEnabled: attrs["custom-publish-status"] === PostStatusEnum.PostStatusEnum_Publish,
  shareLink: `${shareOrigin}${basePath}/s/${id.value}`,
  optionEnabled: false,
  expiredTime: attrs["custom-expires"] ?? "0",
  isHome: setting.homePageId === id.value,
  ip: hostname,
  ipList: ips.map((ip: string) => {
    return { value: ip, label: ip }
  }),
})
const { optionState, optionToggle } = useShareOptionToggle(formData.optionEnabled)

// methods
// const goSetting = async () => {
//   await navigateTo("/setting")
// }

const goHelp = async () => {
  window.open("https://blog.terwer.space/s/20230621001422-xsimx5v")
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

        if (val) {
          // 分享
          await kernelApi.setBlockAttrs(id.value, {
            "custom-publish-status": PostStatusEnum.PostStatusEnum_Publish,
            "custom-publish-time": new Date().getTime().toString(),
          })

          // 保存一份 MD 文档到 public 解决授权码问题
          if (formData.accessCodeEnabled) {
            const sDom = post.editorDom ?? "<h1>404 Not Found</h1>"
            await kernelApi.saveTextData(`/data/public/s/${id.value}.html`, sDom)
            logger.info("save shared md to public")
          } else {
            logger.info("shared in public mode")
          }
        } else {
          // 取消分享
          await kernelApi.setBlockAttrs(id.value, {
            "custom-publish-status": PostStatusEnum.PostStatusEnum_Draft,
            "custom-publish-time": "",
          })

          // 删除 MD
          if (formData.accessCodeEnabled) {
            await kernelApi.removeFile(`/data/public/s/${id.value}.html`)
            logger.info("removed md due to disable sharing")
          } else {
            logger.info("disable share in public mode")
          }
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
      if (isNaN(expiredTime) || expiredTime < 0 || expiredTime > 7 * 24 * 60 * 60) {
        ElMessage.error(t("share.link.expires.error"))
        return false
      }
      return true
    }
  )
}

const handleIpChange = (val: string) => {
  const url = new URL(formData.shareLink)
  url.hostname = val
  formData.shareLink = url.toString()
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

      <div v-if="optionState" class="share-item">
        <div class="item-left">
          <span class="change-ip-title">{{ t("change.ip.title") }}</span>
          <el-select
            v-model="formData.ip"
            class="m-2"
            :placeholder="t('form.select')"
            no-data-text="t('form.nodata')"
            @change="handleIpChange"
          >
            <el-option v-for="item in formData.ipList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
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

    <div v-if="formData.accessCodeEnabled" class="share-item">
      <div class="el-alert el-alert--error is-light" role="alert">
        <div class="el-alert__content">
          <div class="el-alert__title">
            <div>{{ t("share.accessCodeEnabled.tip0") }}</div>
            <div>{{ t("share.accessCodeEnabled.tip1") }}</div>
            <div>{{ t("share.accessCodeEnabled.tip2") }}</div>
            <div>{{ t("share.accessCodeEnabled.tip3") }}</div>
            <div>{{ t("share.accessCodeEnabled.tip4") }}</div>
            <div>{{ t("share.accessCodeEnabled.tip5") }}</div>
            <div>{{ t("share.accessCodeEnabled.tip6") }}</div>
            <div>{{ t("share.accessCodeEnabled.tip7") }}</div>
          </div>
        </div>
      </div>
      <el-alert type="error" style="display: none"></el-alert>
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
.change-ip-title
  margin-right 10px
</style>
