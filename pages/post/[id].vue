<template>
  <div>
    <div v-html="testPost.post.description"></div>
  </div>
</template>

<script lang="ts" setup>
import { SERVER_API_CONSTANTS } from "~/utils/lib-temp/constants/serverApiConstants"
import { Post } from "~/utils/lib-temp/common/post"
import Env from "zhi-env"
import ZhiUtil from "~/utils/zhiUtil"

const nuxtEnv = useRuntimeConfig()
const env = new Env(nuxtEnv)
const zhiSdk = ZhiUtil.zhiSdk(env)
const logger = zhiSdk.getLogger()

const route = useRoute()

const testPost = reactive({
  post: <Post>{},
})

try {
  const res = await useFetch(SERVER_API_CONSTANTS.SERVER_API_GET_POST, {
    method: "post",
    body: {
      id: route.params.id.includes(".html") ? route.params.id.toString().replace(".html", "") : route.params.id,
    },
  })
  testPost.post = <Post>(res?.data.value as any).data
} catch (e) {
  logger.error(SERVER_API_CONSTANTS.SERVER_API_GET_POST + "error", e)
}
</script>
