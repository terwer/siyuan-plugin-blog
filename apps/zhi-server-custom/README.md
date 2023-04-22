# zhi-server-custom
a ssr solution using electron bundled node

Note: this project is moved to [zhi-app-blog](https://github.com/terwer/zhi/tree/main/apps/zhi-app-blog)

## How to use

only static

http://127.0.0.1:6806/appearance/themes/zhi/static/blog/

ssr for siyuan console

```js
// siyuan console
const server = await zhiImport("/server/custom/server.js")
server()
```

http://127.0.0.1:3333/

## Dev

```bash
pnpm dev -F zhi-server-custom
```

http://127.0.0.1:3232/

## Build

```bash
pnpm localBuild -F zhi-server-custom
```

## TODO

```
1 write express log to file
2 port check
```