<script lang="ts" setup>
import {onBeforeMount, reactive, toRaw} from "vue"
import copy from "copy-to-clipboard"
import {JsonUtil, StrUtil} from "zhi-common"
import {showMessage} from "siyuan"
import {createAppLogger} from "./utils/appLogger.ts"
import {useSiyuanApi} from "./composables/useSiyuanApi.ts"
import {getAllIps} from "./utils/urlUtil.ts"
import {useSettingStore} from "./stores/useSettingStore.ts"
import {useMethod} from "./composables/useMethod.ts"
import {useMethodAsync} from "./composables/useMethodAsync.ts"
import {useStaticShare} from "./composables/useStaticShare.ts"

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
  expiredTime: "",
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
            showMessage("blog.index.home.exists", 7000, "error")
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

const handleIpChange = () => {
  const url = new URL(formData.shareLink)
  url.hostname = formData.ip
  formData.shareLink = url.toString()
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
          showMessage("share.link.expires.error", 7000, "error")
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
  formData.expiredTime = attrs["custom-expires"] ?? "0"
  const {hostname, ips} = getIps()
  formData.ip = hostname
  formData.ipList = ips.map((ip: string) => {
    return {value: ip, label: ip}
  })
})
logger.debug("share inited", props)
</script>

<template>
  <Suspense>
    <div id="share">
      <div class="share-item share-subject">
        <div class="item-left">
          {{ pluginInstance.i18n.siyuanBlog }} -
          {{ formData.post.title }}
        </div>
        <div class="item-right"></div>
      </div>
      <div class="share-split"/>

      <div class="el-page-header__content share-item">
        <div class="flex items-center">
          <span class="text-large font-600 mr-3 share-title"> "share.to.web" </span>
          <span class="text-sm mr-2 share-description">
          "share.to.web.before.tip"
        </span>
          <span class="item-right">
          <input type="checkbox" v-model="formData.shared" @change="handleShare"/>
        </span>
        </div>
      </div>
      <div class="share-split"/>

      <div v-if="formData.shared">
        <div class="share-item">
          <div class="item-left item-copy-link">
            <input type="text" v-model="formData.shareLink"/>
          </div>
          <div class="item-right">
            <button @click="copyWebLink">{{ "share.copy.web.link" }}</button>
          </div>
        </div>
        <div class="share-item">
          <div class="item-left">
            <span class="change-ip-title">{{ "change.ip.title" }}</span>
            <select
                v-model="formData.ip"
                class="m-2"
                @change="handleIpChange"
            >
              <option v-for="item in formData.ipList" :key="item.value" :label="item.label" :value="item.value"/>
            </select>
          </div>
          <div class="change-ip-tip">
            {{ "share.static.tip" }}
          </div>
        </div>
        <div class="share-split"/>

        <div class="share-item">
          <div class="item-left item-copy-link">
            {{ "share.show.link.option" }}
          </div>
          <div class="item-right"></div>
        </div>

        <div class="share-item expires-link-item">
          <div class="expires-link expires-link-label">
            {{ "share.other.option.link.expires" }}
          </div>
          <div class="expires-link expires-link-input">
            <input type="text" v-model="formData.expiredTime" :placeholder="'share.link.expires.time.placeholder'"/>
          </div>
          <div class="item-right">
            <button @click="handleExpiresTime">{{ "main.opt.save" }}</button>
          </div>
        </div>
        <div class="share-split"/>

        <div class="share-item">
          <div class="item-left">
            {{ "share.set.home" }}
          </div>
          <div class="item-right">
            <input type="checkbox" v-model="formData.isHome" @change="handleSetHome"/>
          </div>
        </div>
        <div class="share-split"/>
      </div>
    </div>
  </Suspense>
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

.warn-text
  color #ea4aaa

.share-warn-tip
  padding-left 6px

.change-ip-tip
  color red
  font-size 13px
  padding-top 10px

.setting-btn
  padding-left 10px
  font-size 13px
</style>