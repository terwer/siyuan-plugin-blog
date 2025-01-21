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
      try {
        return await $fetch(apiUrl)
      } catch (e:any) {
        if (e.response?.status === 404) {
          throw createError({
            message: "Resource not found",
            statusCode: 404,
          })
        }
        throw createError({
          message: e.message || "An unexpected error occurred",
          statusCode: e.response?.status || 500,
        })
      }
    default:
      throw createError({
        message: "Method not allowed",
        statusCode: 405,
      })
  }
})
