<template>
  <div>
    <!--
    <div v-html="testPost.post.description"></div>
    -->
    This post
  </div>
</template>

<script lang="ts" setup>
import Env from "zhi-env"

const nuxtEnv = useRuntimeConfig()
const env = new Env(nuxtEnv)
ZhiWebBlogUtil.initEnv(env)
const logger = ZhiWebBlogUtil.zhiLog("index-page")
const common = ZhiWebBlogUtil.zhiCommon()

const route = useRoute()

// const testPost = reactive({
//   post: <Post>{},
// })

// try {
//   const res = await useFetch(SERVER_API_CONSTANTS.SERVER_API_GET_POST, {
//     method: "post",
//     body: {
//       id: route.params.id.includes(".html") ? route.params.id.toString().replace(".html", "") : route.params.id,
//     },
//   })
//   testPost.post = <Post>(res?.data.value as any).data
// } catch (e) {
//   logger.error(common.strUtil.f("{0} request error", SERVER_API_CONSTANTS.SERVER_API_GET_RECENT_POSTS), e)
// }
</script>
