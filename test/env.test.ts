import { describe, expect, it } from "vitest"
import { setup } from "@nuxt/test-utils"

describe("My test", async () => {
  await setup({
    // test context options
  })

  it("my test", async () => {
    const html = await $fetch("/")
    console.log(html)
    expect(html).toContain("html")

    // const res = await fetch("/")
    // const { body, headers } = res

    // const config = useRuntimeConfig()
    // console.log(config)
  })
})
