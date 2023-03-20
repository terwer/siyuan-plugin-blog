<template>
  <div>
    <icon-accessibility />
    <icon-account-box style="font-size: 2em; color: red" />

    <div v-for="post in testPosts.posts">
      <h1>
        <NuxtLink :to="'/post/' + post.postid"> {{ post.title }} </NuxtLink>
      </h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import ZhiUtil from "~/utils/zhiUtil"
import { version } from "~/package.json"
import Env from "zhi-env"
import ThemeFromEnum from "~/utils/enums/themeFromEnum"
import IconAccessibility from "~icons/carbon/accessibility"
import IconAccountBox from "~icons/mdi/account-box"
import { SERVER_API_CONSTANTS } from "~/utils/lib-temp/constants/serverApiConstants"
import { Post } from "~/utils/lib-temp/common/post"

const nuxtEnv = useRuntimeConfig()
const env = new Env(nuxtEnv)
const zhiSdk = ZhiUtil.zhiSdk(env)
const logger = zhiSdk.getLogger()
const common = zhiSdk.common

const testPosts = reactive({
  posts: <Post[]>[],
})

function hello(from: string): void {
  logger.debug("Nuxt env is ok")
  logger.info(common.strUtil.f("Hello, {0} {1} v{2}! You are from {3}", "zhi", "theme", version, from))
}

hello(ThemeFromEnum.ThemeFrom_Blog)

try {
  const { data } = await useFetch(SERVER_API_CONSTANTS.SERVER_API_GET_RECENT_POSTS)
  testPosts.posts = <Post[]>(data.value as any).data
} catch (e) {
  logger.error(SERVER_API_CONSTANTS.SERVER_API_GET_RECENT_POSTS + "error", e)
}
</script>
