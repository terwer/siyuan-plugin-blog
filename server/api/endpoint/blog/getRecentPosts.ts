import Env from "zhi-env"
import ZhiUtil from "~/utils/zhiUtil"

export default defineEventHandler(async (event) => {
  const nuxtEnv = useRuntimeConfig()
  const env = new Env(nuxtEnv)

  const num = 10
  const page = 1
  const keyword = ""

  const zhiSdk = ZhiUtil.zhiSdk(env)
  const blogApi = zhiSdk.blogApi

  const result = await blogApi.getRecentPosts(num, page, keyword)

  return {
    code: 0,
    msg: "操作成功",
    data: result,
  }
})
