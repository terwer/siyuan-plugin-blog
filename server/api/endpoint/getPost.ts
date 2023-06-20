import { createAppLogger } from "../../../common/appLogger"
import { usePostApi } from "../../../composables/api/usePostApi"

export default defineEventHandler(async (event) => {
  const logger = createAppLogger("get-post-api")
  const query = getQuery(event)
  if (query.id instanceof Array) {
    throw new Error("参数类型错误")
  }
  const id = (query.id ?? "") as string
  logger.info("id=>", id)

  const { getPost } = usePostApi()
  return await getPost(id)
})
