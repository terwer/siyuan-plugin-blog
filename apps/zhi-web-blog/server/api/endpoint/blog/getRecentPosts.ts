import Env from "zhi-env"
import { SiYuanApiAdaptor } from "zhi-siyuan-api"

export default defineEventHandler(async (event) => {
  const nuxtEnv = useRuntimeConfig()
  const env = new Env(nuxtEnv)
  ZhiWebBlogUtil.initEnv(env)

  const num = 10
  const page = 1
  const keyword = ""

  const blogApi = new SiYuanApiAdaptor(env)
  const result = await blogApi.getRecentPosts(num, page, keyword)

  return {
    code: 0,
    msg: "操作成功",
    data: result,
  }
})
