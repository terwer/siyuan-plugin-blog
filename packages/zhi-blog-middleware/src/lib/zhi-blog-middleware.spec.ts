import { zhiBlogMiddleware } from "./zhi-blog-middleware"

describe("zhiBlogMiddleware", () => {
    it("should work", () => {
        expect(zhiBlogMiddleware()).toEqual("zhi-blog-middleware")
    })
})
