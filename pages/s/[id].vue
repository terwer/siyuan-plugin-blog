<script setup lang="ts">
import { Post } from "zhi-blog-api"
import { SiYuanApiAdaptor, SiyuanConfig } from "zhi-siyuan-api"
import { ObjectUtil } from "zhi-common"
import { createAppLogger } from "~/common/appLogger"

const logger = createAppLogger("share-detail-page")
const route = useRoute()
const env = useRuntimeConfig()

// datas
const currentPost = reactive({
  post: {} as Post,
})
const getPost = async () => {
  logger.info("Loading post from remote api...")

  logger.info("env=>", env)
  logger.info("defaultType=>", env.public.defaultType)
  logger.info("siyuanApiUrl=>", env.public.siyuanApiUrl)
  logger.info("siyuanAuthToken=>", env.siyuanAuthToken)

  const siyuanConfig = new SiyuanConfig(env.public.siyuanApiUrl, env.siyuanAuthToken)
  const blogApi = new SiYuanApiAdaptor(siyuanConfig)
  const id = (route.params.id ?? "") as string
  const postid = id.replace(/\.html$/, "")
  const post = await blogApi.getPost(postid)

  currentPost.post = post
}

// lifecycles
// https://vuejs.org/api/composition-api-lifecycle.html#onserverprefetch
onServerPrefetch(async () => {
  await getPost()
})
onBeforeMount(async () => {
  if (ObjectUtil.isEmptyObject(currentPost.post)) {
    await getPost()
  } else {
    logger.info("Post already cached, skip fetch")
  }
})
</script>

<template>
  <div>{{ currentPost.post.description }}</div>
</template>

<style scoped></style>
