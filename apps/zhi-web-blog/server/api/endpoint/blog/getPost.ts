import { H3Event } from "h3"
import Env from "zhi-env"
import { SiYuanApiAdaptor } from "zhi-siyuan-api"

export default defineEventHandler(async (event: H3Event) => {
  const nuxtEnv = useRuntimeConfig()
  const env = new Env(nuxtEnv)
  ZhiWebBlogUtil.initEnv(env)

  // https://nuxt.com/docs/guide/directory-structure/server#matching-route-parameters
  // event.context.params.id
  // const query = getQuery(event)
  // const id = event.context.params?.id
  const body = await readBody(event)
  const postid = body.id ?? "20220822195304-l7nucpp"

  const blogApi = new SiYuanApiAdaptor(env)
  const result = await blogApi.getPost(postid)

  return {
    code: 0,
    msg: "操作成功",
    data: result,
  }
})
