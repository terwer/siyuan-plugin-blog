import { API_TYPE_CONSTANTS } from "~/utils/lib-temp/constants"
import { API } from "~/utils/lib-temp/api"
import { H3Event } from "h3"
import Env from "zhi-env";

export default defineEventHandler(async (event: H3Event) => {
  const nuxtEnv = useRuntimeConfig()
  const env = new Env(nuxtEnv)

  // https://nuxt.com/docs/guide/directory-structure/server#matching-route-parameters
  // event.context.params.id
  // const query = getQuery(event)
  // const id = event.context.params?.id
  const body = await readBody(event)

  const type = env.getEnv("VITE_DEFAULT_TYPE") ?? API_TYPE_CONSTANTS.API_TYPE_SIYUAN
  const postid = body.id ?? "20220822195304-l7nucpp"

  const api = new API(type, nuxtEnv)
  const result = await api.getPost(postid)

  return {
    code: 0,
    msg: "操作成功",
    data: result,
  }
})
