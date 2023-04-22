import { describe, expect, it } from "vitest"
import init from "./index"

describe("zhi-server-vue3-ssr", () => {
  it("index", () => {
    expect(init()).toBe("ok")
  })
})
