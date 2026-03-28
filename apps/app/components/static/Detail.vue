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
import { computed, reactive, ref, watch } from "vue"
import { checkExpires } from "~/utils/utils"
import { useStaticSettingStore } from "~/stores/useStaticSettingStore"
import AppConfig from "~/app.config"
import { useServerAssets } from "~/plugins/libs/renderer/useServerAssets"

const logger = createAppLogger("static-share-page")
const requestURL = useRequestURL()
const route = useRoute()
const { t } = useI18n()
const { providerMode } = useProviderMode()
const { fetchPostMeta, validatePassword } = useAuthModeFetch()
const { getStaticSetting } = useStaticSettingStore(requestURL)
const { getFirstImageSrc } = useServerAssets()

// props
const props = defineProps<{
  showTitleSign?: boolean
  overrideSeo?: boolean
  pageId?: string
  setting?: typeof AppConfig
}>()

// datas
const currentDocId = computed(() => {
  if (props.pageId) {
    return props.pageId
  }

  const routeId = (route.params.id ?? "") as string
  if (routeId.endsWith(".html")) {
    return routeId.replace(".html", "")
  }
  if (routeId.endsWith(".htm")) {
    return routeId.replace(".htm", "")
  }
  return routeId
})

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
const isLoading = ref(__SIYUAN_SPA_TARGET__)

const getPostData = async (id: string) => {
  try {
    const resText = await fetchPostMeta(id, providerMode)
    const dataJson = JsonUtil.safeParse<any>(resText, {} as any)
    logger.debug("dataJson in providerMode=>", dataJson)
    if(providerMode){
      // 分享信息
      formData.shareOptions.passwordEnabled = dataJson.passwordEnabled ?? false
      formData.shareOptions.password = dataJson.password ?? ""
      formData.isShared = dataJson.isShared === true
      // 文档信息
      if(dataJson.post){
        const currentPost = JsonUtil.safeParse<any>(dataJson.post, {} as any)
        currentPost.postid = id
        formData.post = currentPost
        logger.debug("currentPost in providerMode=>", currentPost)
        const attrs = JsonUtil.safeParse<any>(formData.post?.attrs ?? "{}", {})
        formData.isExpires = checkExpires(attrs)
      }
    }else{
      // 文档信息
      const currentPost = JsonUtil.safeParse<any>(resText, {} as any)
      currentPost.postid = id
      formData.post = currentPost
      logger.debug("currentPost=>", currentPost)
      // 分享信息
      formData.isShared = !ObjectUtil.isEmptyObject(formData.post)
      const attrs = JsonUtil.safeParse<any>(formData.post?.attrs ?? "{}", {})
      formData.isExpires = checkExpires(attrs)
    }
  } catch (e) {
    formData.isShared = false
    logger.error("getPostData error=>", e)
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

const seoTitle = computed(() => {
  const titleSign = " - " + t("blog.share")
  return `${formData.post?.title ?? t("blog.index.no.title") + " - " + currentDocId.value}${props.showTitleSign ? titleSign : ""}`
})
const seoSource = computed(() => formData?.post?.description ?? formData?.post?.editorDom ?? "")
const seoDescription = computed(() => getSummery(seoSource.value))
const seoImage = computed(() => getFirstImageSrc(seoSource.value))

if (!props.overrideSeo) {
  useSeoMeta(() => {
    const seoMeta = {
      title: seoTitle.value,
      ogTitle: seoTitle.value,
      description: seoDescription.value,
      ogDescription: seoDescription.value,
    } as any

    if (seoImage.value) {
      seoMeta.ogImage = seoImage.value
    }

    return seoMeta
  })
}

const loadPageData = async () => {
  isLoading.value = true
  try {
    await getPostData(currentDocId.value)
    await getSetting()
  } finally {
    isLoading.value = false
  }
}

if (!__SIYUAN_SPA_TARGET__) {
  await loadPageData()
} else {
  onMounted(async () => {
    await loadPageData()
  })
}

watch(currentDocId, async (newId, oldId) => {
  if (!__SIYUAN_SPA_TARGET__) {
    return
  }
  if (!newId || newId === oldId) {
    return
  }
  await loadPageData()
})

if (!props.overrideSeo && seoImage.value) {
  logger.debug("get a head image from doc=>", seoImage.value)
}

// functions
const handlePasswordSubmit = async (password:string) => {
  logger.debug("get password:", password)
  logger.debug("db password:",  formData.shareOptions.password)
  // 调用API验证密码
  const valid = await validatePassword(currentDocId.value, password, formData.shareOptions.password)
  if (valid.flag) {
    // 当前 url 参数还是 ?key
    const url = new URL(window.location.href);
    url.searchParams.set("key", valid.data);
    window.location.href = url.toString();
  } else {
    ElMessage.error(t('share.password.confirm.password.rule.not.match'))
  }
}
</script>

<template>
  <div v-if="isLoading" class="detail-loading">
    <el-skeleton :rows="12" animated />
  </div>
  <div v-else-if="!formData.isShared">
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
