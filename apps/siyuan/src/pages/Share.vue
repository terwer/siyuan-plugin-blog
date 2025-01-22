<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script lang="ts" setup>
import {onBeforeMount, reactive, toRaw} from "vue"
import copy from "copy-to-clipboard"
import {JsonUtil, StrUtil} from "zhi-common"
import {showMessage} from "siyuan"
import {createAppLogger} from "../utils/appLogger.ts"
import {useSiyuanApi} from "../composables/useSiyuanApi.ts"
import {getAllIps} from "../utils/urlUtil.ts"
import {useSettingStore} from "../stores/useSettingStore.ts"
import {useMethod} from "../composables/useMethod.ts"
import {useMethodAsync} from "../composables/useMethodAsync.ts"
import {useStaticShare} from "../composables/useStaticShare.ts"

const props = defineProps({
  pluginInstance: Object,
  id: String,
  origin: String
})

const logger = createAppLogger("share-page")
const {getSetting, updateSetting} = useSettingStore()
const {blogApi, kernelApi} = useSiyuanApi()
const {handleMethod} = useMethod(props.pluginInstance)
const {handleMethodAsync} = useMethodAsync(props.pluginInstance)
const {openStaticShare, closeStaticShare, updateStaticShare} = useStaticShare()

const basePath = "/plugins/siyuan-blog/app/#"
// datas
const formData = reactive({
  setting: {} as any,
  post: {} as any,

  shared: false,
  isHome: false,
  expiredTime: 0,
  shareLink: "",
  ip: "",
  ipList: []
})

const getIps = () => {
  // 初始化 ip
  const url = new URL(props.origin)
  const hostname = url.hostname
  const ips = getAllIps()
// 确保不会重复
  if (!ips.includes(hostname)) {
    ips.push(hostname)
  }
  return {hostname, ips}
}

const viewDoc = () => {
  window.open(formData.shareLink)
}

const handleShare = () => {
  // eslint-disable-next-line no-new
  new Promise<void>((resolve, reject) => {
    handleMethodAsync(
        async () => {
          if (formData.shared) {
            // 分享
            await kernelApi.setBlockAttrs(props.id, {
              "custom-publish-status": "publish",
              "custom-publish-time": new Date().getTime().toString(),
            })

            // 保存文档分享数据到 public 解决授权码问题
            await openStaticShare(props.id, formData.post)
            logger.info("save shared md to public")
          } else {
            // 取消分享
            await kernelApi.setBlockAttrs(props.id, {
              "custom-publish-status": "draft",
              "custom-publish-time": "",
            })

            // 删除 MD
            await closeStaticShare(props.id)
            logger.info("removed md due to disable sharing")
            // confirm("温馨提示", "确认取消分享吗？", async () => {
            //   // 取消分享
            //   await kernelApi.setBlockAttrs(props.id, {
            //     "custom-publish-status": "draft",
            //     "custom-publish-time": "",
            //   })
            //
            //   // 删除 MD
            //   await closeStaticShare(props.id)
            //   logger.info("removed md due to disable sharing")
            // }, () => {
            //   formData.shared = true
            // })
          }
          resolve()
        },
        () => {
          if (formData.isHome) {
            formData.shared = true
            showMessage(props.pluginInstance.i18n["blog.index.home.exists"], 7000, "error")
            return false
          }
          return true
        }
    ).catch((error) => {
      reject(error)
    })
  })
}

const copyWebLink = () => {
  handleMethod(() => {
    const shareTemplate =
        (StrUtil.isEmptyString(formData.setting.shareTemplate) ? formData.shareLink : formData.setting.shareTemplate) ?? formData.shareLink
    const copyText = shareTemplate
        .replace(
            /\[expired]/g,
            StrUtil.isEmptyString(formData.expiredTime) || formData.expiredTime.toString().trim() === "0"
                ? "永久"
                : formData.expiredTime
        )
        .replace(/\[title]/g, formData.post.title)
        .replace(/\[url]/g, formData.shareLink)

    copy(copyText)
  })
}

const getSiteIp = (): string => {
  let siteIp: string = ""
  try {
    siteIp = new URL(formData.setting.siteUrl).hostname
  } catch (e) {
    logger.warn("getSiteURL error", e)
  }
  return siteIp
}

const handleIpChange = () => {
  const siteIp = getSiteIp()
  if (!StrUtil.isEmptyString(siteIp) && siteIp === formData.ip) {
    const url = new URL(formData.shareLink)
    const siteUrl = new URL(formData.setting.siteUrl)
    url.hostname = siteUrl.hostname
    url.port = siteUrl.port
    formData.shareLink = url.toString()
  } else {
    const url = new URL(formData.shareLink)
    const originUrl = new URL(window.location.origin)
    url.hostname = formData.ip
    url.port = originUrl.port
    formData.shareLink = url.toString()
  }
}

const handleSetHome = () => {
  // eslint-disable-next-line no-new
  new Promise<void>((resolve, reject) => {
    handleMethodAsync(async () => {
      if (formData.isHome) {
        formData.setting.homePageId = props.id
      } else {
        formData.setting.homePageId = undefined
      }
      await updateSetting(toRaw(formData.setting))
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
        await kernelApi.setBlockAttrs(props.id, {
          "custom-expires": expiredTime.toString(),
        })

        await updateStaticShare(props.id)
        logger.info("updated static share in auth mode")
      },
      () => {
        if (isNaN(expiredTime) || expiredTime < 0 || expiredTime > 7 * 24 * 60 * 60) {
          showMessage(props.pluginInstance.i18n["share.link.expires.error"], 7000, "error")
          return false
        }
        return true
      }
  )
}

onBeforeMount(async () => {
  formData.setting = await getSetting()
  formData.post = await blogApi.getPost(props.id, false, false)
  const attrs = JsonUtil.safeParse<any>(formData.post?.attrs ?? "{}", {})
  const shareOrigin = StrUtil.isEmptyString(formData.setting?.siteUrl) ? origin : formData.setting.siteUrl

  formData.shared = attrs["custom-publish-status"] === "publish"
  formData.isHome = formData.setting.homePageId === props.id
  formData.shareLink = `${shareOrigin}${basePath}/s/${props.id}`
  formData.expiredTime = attrs["custom-expires"] ?? 0
  const {hostname, ips} = getIps()
  formData.ip = hostname
  formData.ipList = ips.map((ip: string) => {
    return {value: ip, label: ip}
  })
  // 自定义的也加进去
  const siteIp = getSiteIp()
  if (!StrUtil.isEmptyString(siteIp) && !ips.includes(siteIp)) {
    formData.ip = siteIp
    formData.ipList.push({
      value: siteIp,
      label: siteIp,
    })
  }
})
logger.debug("share inited", props)
</script>

<template>
  <div id="share">
    <div class="share-header">
      <div class="share-title">
        {{ formData.post.title }}
      </div>
    </div>
    <div class="divider"/>

    <div class="share-settings">
      <div class="setting-row">
        <span class="setting-label">
          {{ pluginInstance.i18n["share.to.web"] }} - {{ pluginInstance.i18n["share.to.web.before.tip"] }}
        </span>
        <input class="b3-switch fn__flex-center" type="checkbox" v-model="formData.shared" @change="handleShare">
      </div>
    </div>

    <div v-if="formData.shared" class="share-content">
      <div class="setting-row">
        <span class="setting-label">{{ pluginInstance.i18n["share.copy.title"] }}</span>
        <div class="input-group">
          <input type="text" v-model="formData.shareLink" readonly class="share-link-input" @click="viewDoc"
                 :title="pluginInstance.i18n['share.click.view']"/>
          <button @click="copyWebLink">{{ pluginInstance.i18n["share.copy.web.link"] }}</button>
        </div>
      </div>

      <div class="setting-row">
        <span class="setting-label">{{ pluginInstance.i18n["change.ip.title"] }}</span>
        <div class="input-group">
          <select v-model="formData.ip" @change="handleIpChange">
            <option v-for="item in formData.ipList" :key="item.value" :value="item.value">
              {{ item.label }}
            </option>
          </select>
        </div>
      </div>

      <div class="info-text">{{ pluginInstance.i18n["share.static.tip"] }}</div>

      <div class="setting-row">
        <span class="setting-label">{{ pluginInstance.i18n["share.other.option.link.expires"] }}</span>
        <div class="input-group">
          <input v-model="formData.expiredTime" class="share-expired-input" type="number" min="0" step="1"
                 :placeholder='pluginInstance.i18n["share.link.expires.time.placeholder"]'/>
          <button @click="handleExpiresTime">{{ pluginInstance.i18n["main.opt.save"] }}</button>
        </div>
      </div>

      <div class="setting-row">
        <span class="setting-label">{{ pluginInstance.i18n["share.set.home"] }}</span>
        <input class="b3-switch fn__flex-center" type="checkbox" v-model="formData.isHome" @change="handleSetHome">
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
#share
  font-family "Open Sans", "LXGW WenKai", "JetBrains Mono", "-apple-system", "Microsoft YaHei", "Times New Roman",
  "方正北魏楷书_GBK", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans",
  "Droid Sans", "Helvetica Neue", sans-serif
  max-width 600px
  min-width 475px
  margin auto
  padding 8px
  padding-top 10px
  padding-bottom 0
  padding-left 14px
  padding-right 14px

.share-header
  font-size 14px
  font-weight 600

.divider
  height 1px
  margin 8px 0

.share-content
  margin-top 14px

.setting-row
  display flex
  align-items center
  justify-content space-between
  margin-bottom 10px
  gap 8px

.setting-label
  font-size 14px
  white-space nowrap /* 防止换行，字段宽度自适应 */
  margin-right 8px

/* 与输入框保持适当间距 */

.input-group
  display flex
  align-items center
  gap 8px
  flex-grow 1 /* 输入框占据剩余空间 */
  width 100%

.input-group input,
.input-group select
  flex-grow 1
  height 28px
  padding 4px 8px
  border 1px solid #cccccc
  border-radius 4px
  font-size 14px
  background-color #f9f9f9
  color #333333
  box-sizing border-box
  min-width 0

/* 防止 flex 布局导致超出容器 */

.input-group input:focus,
.input-group select:focus
  outline none
  border-color #0073e6
  box-shadow 0 0 4px rgba(0, 115, 230, 0.5)

.share-link-input
  height 28px
  padding 4px 8px
  border 1px solid #cccccc
  border-radius 4px
  font-size 14px
  background-color #f0f0f0 /* 禁用时的背景色 */
  color #aaaaaa /* 禁用时的文字颜色 */
  box-sizing border-box
  cursor not-allowed

/* 表明是不可交互的 */

button
  padding 4px 12px
  font-size 14px
  color #ffffff
  border none
  border-radius 4px
  cursor pointer
  background-color #0073e6
  transition all 0.2s ease
  white-space nowrap /* 防止按钮内容换行 */
  flex-shrink 0

/* 按钮保持固定大小 */

button:hover
  background-color #005bb5
  transform scale(1.05)

.info-text
  font-size 12px
  margin-top 8px
  margin-bottom 8px
  color #ff4d4f

html[data-theme-mode="light"]
  .divider
    background-color #e3e3e3

  .input-group input,
  .input-group select
    border-color #cccccc
    background-color #f9f9f9

  .share-link-input
    border-color #cccccc
    background-color #f0f0f0
    color #aaaaaa

  button
    background-color #0073e6

  button:hover
    background-color #005bb5

  .info-text
    color #ff4d4f

html[data-theme-mode="dark"]
  .divider
    background-color #333333

  .input-group input
    border-color #444444
    background-color #2c2c2c

  .input-group input:not([readonly])
    color var(--b3-theme-on-background)
    background-color #2c2c2c
    border-color #444444

  .input-group input:not([readonly]):focus
    border-color #0073e6
    background-color #3a3a3a
    box-shadow 0 0 4px rgba(0, 115, 230, 0.5)

  .input-group select
    border-color #444444
    color var(--b3-theme-on-background)
    background-color #2c2c2c

  .input-group select option
    color var(--b3-theme-on-background)
    background-color #444444

    &:hover, &:focus
      background-color #555555
      color #ffffff

  .share-link-input
    border-color #444444
    background-color #3a3a3a
    color #666666

  button
    background-color #0073e6

  button:hover
    background-color #005bb5

  .info-text
    color #ff7875
</style>
