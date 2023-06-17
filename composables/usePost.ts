import { createAppLogger } from "~/common/appLogger"
import { Post } from "zhi-blog-api"
import { ObjectUtil } from "zhi-common"
import { usePostApi } from "~/composables/api/usePostApi"

/**
 * 文档相关
 */
export const usePost = () => {
  const logger = createAppLogger("use-post")
  const { getPost } = usePostApi()

  // datas
  const currentPost = reactive({
    post: {} as Post,
  })

  // lifecycles
  // https://vuejs.org/api/composition-api-lifecycle.html#onserverprefetch
  onServerPrefetch(async () => {
    const route = useRoute()
    const id = (route.params.id ?? "") as string
    currentPost.post = await getPost(id)
  })
  onBeforeMount(async () => {
    const route = useRoute()
    const id = (route.params.id ?? "") as string
    if (ObjectUtil.isEmptyObject(currentPost.post)) {
      currentPost.post = await getPost(id)
    } else {
      logger.info("Post already cached, skip fetch")
    }
  })

  return { currentPost }
}
