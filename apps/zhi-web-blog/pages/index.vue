<template>
  <div>
    <!--
    图标使用示例
    import IconAccessibility from "~icons/carbon/accessibility"
    import IconAccountBox from "~icons/mdi/account-box"
    <icon-accessibility />
    <icon-account-box style="font-size: 2em; color: red" />
    -->
    <div v-for="post in recentPosts.posts">
      <h1>
        <NuxtLink :to="'/post/' + post.postid"> {{ post.title }} </NuxtLink>
      </h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import Env from "zhi-env"
import ThemeFromEnum from "~/utils/enums/themeFromEnum"
import { Post } from "zhi-blog-api"
import { SiYuanApiAdaptor } from "zhi-siyuan-api"

// env
const nuxtEnv = useRuntimeConfig()
const env = new Env(nuxtEnv.public)
ZhiWebBlogUtil.initEnv(env)
const logger = ZhiWebBlogUtil.zhiLog("index-page")
const common = ZhiWebBlogUtil.zhiCommon()

// props
const recentPosts = reactive({
  posts: <Post[]>[],
})

function hello(from: string): void {
  logger.debug("Nuxt env is ok")
  logger.info(common.strUtil.f("Hello, {0} {1} v{2}! You are from {3}", "zhi", "theme", "v1.0.0", from))
}

const fetch_getRecentPosts = async () => {
  const num = 10
  const page = 1
  const keyword = ""

  const blogApi = new SiYuanApiAdaptor(env)
  recentPosts.posts = await blogApi.getRecentPosts(num, page, keyword)
}

onBeforeMount(async () => {
  hello(ThemeFromEnum.ThemeFrom_Blog)
  await fetch_getRecentPosts()
})
</script>
