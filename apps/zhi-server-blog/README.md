# zhi-server-blog

a performance first, ssr first blog

## Build

```bash
pnpm siyuanBuild -F zhi-server-blog
````

## Start

inside siyuan console

```js
// entry file path
// http://127.0.0.1:6806/appearance/themes/zhi/server/blog/dist/server/entry.mjs
// Not work
// await import("/appearance/themes/zhi/server/blog/dist/server/entry.mjs")

// This works, but need system environment for node.js
const basePath = SiyuanDevice.zhiThemePath()
await zhiCmd.executeCommand("PORT=3333 node", ["./dist/server/entry.mjs"], {
    cwd: "/Users/terwer/Documents/mydocs/SiYuanWorkspace/public/conf/appearance/themes/zhi/server/blog",
})

const basePath = SiyuanDevice.zhiThemePath()
await zhiCmd.executeCommandWithBundledNode("./dist/server/entry.mjs", [], {
  cwd: `${basePath}/server/blog`,
  silent: true
})
```

for dev

```bash
cd apps/zhi-server-blog
node ./dist/server/entry.mjs

## or
## node ./apps/zhi-server-blog/dist/server/entry.mjs
```

## Stop

```js

```