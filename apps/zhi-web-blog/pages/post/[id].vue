<template>
  <div>
    <h1>{{ currentPost.post.title }}</h1>
    <div v-html="currentPost.post.description" />
  </div>
</template>

<script lang="ts" setup>
import Env from "zhi-env"
import { SiYuanApiAdaptor } from "zhi-siyuan-api"
import ZhiWebBlogUtil from "~/utils/ZhiWebBlogUtil"

// env
const nuxtEnv = useRuntimeConfig()
const env = new Env(nuxtEnv.public)
ZhiWebBlogUtil.initEnv(env)
// const logger = ZhiWebBlogUtil.zhiLog("detail-page")
await ZhiWebBlogUtil.importLute(env.getStringEnv("VITE_APP_BASE"), env.getStringEnv("VITE_STATIC_VERSION"))

// use
const route = useRoute()

// props
const currentPost = reactive({
  post: {} as Post,
})

const fetch_getPost = async () => {
  const blogApi = new SiYuanApiAdaptor(env)
  const postid = route.params.id.includes(".html") ? route.params.id.toString().replace(".html", "") : route.params.id
  currentPost.post = await blogApi.getPost(postid)
}

onBeforeMount(async () => {
  await fetch_getPost()
})
</script>
