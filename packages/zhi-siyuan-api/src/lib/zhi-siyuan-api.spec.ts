import SiyuanApi from "./zhi-siyuan-api"
import { expect } from "vitest"

describe("zhiSiyuanApi", () => {
  it("siyuanApi", () => {
    const siyuanApi = new SiyuanApi()
    expect(siyuanApi).toBeTruthy()
  })
})
