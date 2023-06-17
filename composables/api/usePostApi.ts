import { createAppLogger } from "~/common/appLogger"
import { SiYuanApiAdaptor, SiyuanConfig } from "zhi-siyuan-api"

/**
 * 文档相关
 */
export const usePostApi = () => {
  const logger = createAppLogger("use-post")
  const env = useRuntimeConfig()

  const getPost = async (id: string) => {
    logger.info("Loading post from remote api...")

    logger.info("env=>", env)
    logger.info("defaultType=>", env.public.defaultType)
    logger.info("siyuanApiUrl=>", env.public.siyuanApiUrl)
    logger.info("siyuanAuthToken=>", env.siyuanAuthToken)

    const siyuanConfig = new SiyuanConfig(env.public.siyuanApiUrl, env.siyuanAuthToken)
    const blogApi = new SiYuanApiAdaptor(siyuanConfig)
    const postid = id.replace(/\.html$/, "")
    return await blogApi.getPost(postid)
  }

  return { getPost }
}
