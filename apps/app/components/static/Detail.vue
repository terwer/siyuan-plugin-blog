<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2023-2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script lang="ts" setup>
import { JsonUtil, ObjectUtil } from "zhi-common"
import { checkExpires } from "~/utils/utils"
import { useStaticSettingStore } from "~/stores/useStaticSettingStore"
import AppConfig from "~/app.config"
import { useServerAssets } from "~/plugins/libs/renderer/useServerAssets"
import {BrowserUtil} from "zhi-device";

const logger = createAppLogger("static-share-page")
const { docId } = useDocId()
const { t } = useI18n()
const { providerMode } = useProviderMode()
const { fetchPostMeta, validatePassword } = useAuthModeFetch()
const { getStaticSetting } = useStaticSettingStore()
const { getFirstImageSrc } = useServerAssets()

// props
const props = defineProps<{
  showTitleSign?: boolean
  overrideSeo?: boolean
  pageId?: string
  setting?: typeof AppConfig
}>()

// datas
const id = props.pageId ?? docId
const formData = reactive({
  post: {} as any,
  setting: {} as any,

  isShared: true,
  isExpires: false,

  // 密码授权
  shareOptions: {
    passwordEnabled: false,
    password: "",
  }
})
const getPostData = async () => {
  try {
    const resText = await fetchPostMeta(id, providerMode)
    if(providerMode){
      const dataJson = JsonUtil.safeParse<any>(resText, {} as any)
      logger.debug("dataJson in providerMode=>", dataJson)
      const currentPost = JsonUtil.safeParse<any>(dataJson.post, {} as any)
      currentPost.postid = id
      formData.post = currentPost
      logger.debug("currentPost in providerMode=>", currentPost)
      // 分享信息
      formData.shareOptions.passwordEnabled = dataJson.passwordEnabled ?? false
      formData.shareOptions.password = dataJson.password ?? ""
    }else{
      const currentPost = JsonUtil.safeParse<any>(resText, {} as any)
      currentPost.postid = id
      formData.post = currentPost
      logger.debug("currentPost=>", currentPost)
    }

    formData.isShared = !ObjectUtil.isEmptyObject(formData.post)
    const attrs = JsonUtil.safeParse<any>(formData.post?.attrs ?? "{}", {})
    formData.isExpires = checkExpires(attrs)
  } catch (e) {
    formData.isShared = false
  }
}
const getSetting = async () => {
  let currentSetting = props.setting
  // 防止重复请求
  if (!props.setting) {
    currentSetting = await getStaticSetting()
  }
  formData.setting = currentSetting
  logger.debug("currentSetting=>", currentSetting)
}
await getPostData()
await getSetting()

// SEO
if (!props.overrideSeo) {
  const titleSign = " - " + t("blog.share")
  const title = `${formData.post?.title ?? t("blog.index.no.title") + " - " + docId}${props.showTitleSign ? titleSign : ""}`
  const desc = getSummery(formData?.post?.description ?? "")
  const headImage = getFirstImageSrc(formData?.post?.description ?? "")
  const seoMeta = {
    title,
    ogTitle: title,
    description: desc,
    ogDescription: desc,
  } as any
  if (headImage) {
    logger.debug("get a head image from doc=>", headImage)
    seoMeta.ogImage = headImage
  }
  useSeoMeta(seoMeta)
}

// functions
const handlePasswordSubmit = async (password:string) => {
  logger.debug("get password:", password)
  logger.debug("db password:",  formData.shareOptions.password)
  // 调用API验证密码
  const valid = await validatePassword(formData.post.postid, password, formData.shareOptions.password)
  if (valid.flag) {
    // 当前 url 参数还是 ?key
    BrowserUtil.setUrlParameter(window.location.href,"key", valid.data)
  } else {
    ElMessage.error(t('share.password.confirm.password.rule.not.match'))
  }
}
</script>

<template>
  <div v-if="!formData.isShared">
    <el-empty :description=" t('blog.index.no.shared') " />
  </div>
  <div v-else-if="formData.isExpires">
    <el-empty :description="t('blog.index.no.expires') " />
  </div>
  <div v-else-if="formData.shareOptions.passwordEnabled">
    <common-confirm-password
        :title="t('share.password.confirm.password.title')"
        :description="t('share.password.confirm.password.description')"
        :placeholder="t('share.password.confirm.password.placeholder')"
        :submitText="t('share.password.confirm.password.submitText')"
        :hint="t('share.password.confirm.password.hint')"
        @submit="handlePasswordSubmit"
    />
  </div>
  <div v-else>
    <el-container>
      <el-header :class="{'headed':formData.setting?.showHeader, 'plain':!formData.setting?.showHeader}">
        <lazy-static-header :setting="formData.setting" />
      </el-header>
      <el-main class="main">
        <lazy-static-content :post="formData.post" :setting="formData.setting" />
      </el-main>
      <el-footer>
        <lazy-static-footer :setting="formData.setting" />
      </el-footer>
    </el-container>
  </div>
</template>

<style lang="stylus" scoped>
.plain
  height 0
  display none

.main
  padding 0
  margin 0
</style>
