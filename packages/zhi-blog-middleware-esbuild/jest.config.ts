/* eslint-disable */
export default {
    displayName: "zhi-blog-middleware-esbuild",
    preset: "../../jest.preset.js",
    transform: {
        "^.+\\.[tj]s$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.spec.json" }],
    },
    moduleFileExtensions: ["ts", "js", "html"],
    coverageDirectory: "../../coverage/packages/zhi-blog-middleware-esbuild",
}
