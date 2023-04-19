# zhi-server-legacy
a ssr solution using electron bundled node

## How to use

```js
// siyuan console
const server = zhiRequire("/server/legacy/server.cjs")
server.start(3333)

const server = await zhiImport("/server/legacy/server.js")
server
```

## TODO

```
1 write express log to file
2 port check
```