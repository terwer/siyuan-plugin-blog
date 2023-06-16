<script setup lang="ts">
import { Post } from "zhi-blog-api"
import { SiYuanApiAdaptor, SiyuanConfig } from "zhi-siyuan-api"
import { ObjectUtil } from "zhi-common"
import { createAppLogger } from "~/common/appLogger"

const logger = createAppLogger("share-detail-page")
const route = useRoute()
const postid = route.params.id

// datas
const currentPost = reactive({
  post: {} as Post,
})
const getPost = async () => {
  logger.info("Loading post from remote api...")

  const env = useRuntimeConfig()
  const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
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
