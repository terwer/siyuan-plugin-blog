# zhi-server-blog

a performance first, ssr first blog

## Build

```bash
pnpm siyuanBuild -F zhi-server-blog
````

## Start

inside siyuan console

```js
await customCmd.executeCommand("PORT=3333 node", ["./dist/server/entry.mjs"], {
    cwd: "/Users/terwer/Documents/mydocs/SiYuanWorkspace/public/conf/appearance/themes/zhi/server/blog",
})
```

dev

```bash
cd apps/zhi-server-blog
node ./dist/server/entry.mjs

## or
## node ./apps/zhi-server-blog/dist/server/entry.mjs
```

## Stop

```js

```