<template>
  <div>
    <h1>{{ currentPost.post.title }}</h1>
    <div v-html="currentPost.post.description"></div>
  </div>
</template>

<script lang="ts" setup>
import Env from "zhi-env"
import { SiYuanApiAdaptor } from "zhi-siyuan-api"

// env
const nuxtEnv = useRuntimeConfig()
const env = new Env(nuxtEnv)
ZhiWebBlogUtil.initEnv(env)
const logger = ZhiWebBlogUtil.zhiLog("index-page")

// use
const route = useRoute()

// props
const currentPost = reactive({
  post: <Post>{},
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
