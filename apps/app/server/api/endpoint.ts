/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import { buildUrl } from "~/server/utils/urlUtils"

export default defineEventHandler(async (event) => {
  switch (event.method) {
    case "POST":
      const body = await readBody(event)
      const env = useRuntimeConfig()
      const url = body.url
      const apiUrl = buildUrl(env.public.siyuanApiUrl, url)
      return await $fetch(apiUrl)
    default:
      throw createError({
        message: "Method not allowed",
        statusCode: 405,
      })
  }
})
