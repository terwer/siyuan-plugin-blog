import { H3Event } from "h3"
import Env from "zhi-env"
import ZhiUtil from "~/utils/zhiUtil"

export default defineEventHandler(async (event: H3Event) => {
  const nuxtEnv = useRuntimeConfig()
  const env = new Env(nuxtEnv)

  // https://nuxt.com/docs/guide/directory-structure/server#matching-route-parameters
  // event.context.params.id
  // const query = getQuery(event)
  // const id = event.context.params?.id
  const body = await readBody(event)
  const postid = body.id ?? "20220822195304-l7nucpp"

  const zhiSdk = ZhiUtil.zhiSdk(env)
  const blogApi = zhiSdk.blogApi
  const result = await blogApi.getPost(postid)

  return {
    code: 0,
    msg: "操作成功",
    data: result,
  }
})
