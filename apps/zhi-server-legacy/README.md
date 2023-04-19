# zhi-server-legacy
a ssr solution using electron bundled node

## How to use

```js
// siyuan console
// not work
const app=require("/appearance/themes/zhi/server/legacy/index.cjs");app
// work
const app=require("/Users/terwer/Documents/mydocs/SiYuanWorkspace/public/conf/appearance/themes/zhi/server/legacy/index.cjs");app
// work
const app=zhiRequire("/server/legacy/index.cjs");app
```