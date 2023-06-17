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

  /**
   * 如果缓存已有直接返回，否则去远程抓取数据
   */
  const setCurrentPost = async () => {
    if (ObjectUtil.isEmptyObject(currentPost.post)) {
      const route = useRoute()
      const id = (route.params.id ?? "") as string
      currentPost.post = await getPost(id)
    } else {
      logger.info("Post already cached, skip fetch")
    }
  }

  // lifecycles
  // https://vuejs.org/api/composition-api-lifecycle.html#onserverprefetch
  onServerPrefetch(async () => {
    await setCurrentPost()
  })
  onBeforeMount(async () => {
    await setCurrentPost()
  })

  return { currentPost, setCurrentPost }
}
