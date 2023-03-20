import { API_TYPE_CONSTANTS } from "~/utils/lib-temp/constants"
import { API } from "~/utils/lib-temp/api"
import Env from "zhi-env"

export default defineEventHandler(async (event) => {
  const nuxtEnv = useRuntimeConfig()
  const env = new Env(nuxtEnv)

  const num = 10
  const page = 1
  const keyword = ""

  const type = env.getEnv("VITE_DEFAULT_TYPE") ?? API_TYPE_CONSTANTS.API_TYPE_SIYUAN
  const api = new API(type, nuxtEnv)

  const result = await api.getRecentPosts(num, page, keyword)

  return {
    code: 0,
    msg: "操作成功",
    data: result,
  }
})
