<template>
  <div>
    <!--
    图标使用示例
    import IconAccessibility from "~icons/carbon/accessibility"
    import IconAccountBox from "~icons/mdi/account-box"
    <icon-accessibility />
    <icon-account-box style="font-size: 2em; color: red" />
    -->
    <div v-for="post in recentPosts.posts" :key="post.postid">
      <h1>
        <NuxtLink :to="'/post/' + post.postid">
          {{ post.title }}
        </NuxtLink>
      </h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import Env from "zhi-env"
import { Post } from "zhi-blog-api"
import { SiYuanApiAdaptor } from "zhi-siyuan-api"
import ZhiWebBlogUtil from "~/utils/ZhiWebBlogUtil"

// env
const nuxtEnv = useRuntimeConfig()
const env = new Env(nuxtEnv.public)
ZhiWebBlogUtil.initEnv(env)
// const logger = ZhiWebBlogUtil.zhiLog("index-page")
// const common = ZhiWebBlogUtil.zhiCommon()

// use
const route = useRoute()

// props
const recentPosts = reactive({
  posts: [] as Post[],
})

const fetch_getRecentPosts = async () => {
  const num = 10
  const page = route.query.p ?? 0
  const keyword = ""

  const blogApi = new SiYuanApiAdaptor(env)
  recentPosts.posts = await blogApi.getRecentPosts(num, page, keyword)
}

onBeforeMount(async () => {
  await fetch_getRecentPosts()
})
</script>
