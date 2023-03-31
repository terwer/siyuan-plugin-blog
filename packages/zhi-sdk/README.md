# zhi-sdk

a simple sdk for siyuan-note, blog, and more

## Usage

```bash
pnpm add zhi-sdk
```

```ts
import ZhiSdk from "zhi-sdk"
import Env from "zhi-env"

// init zhiSdk
const zhiSdk = new ZhiSdk()

// init zhiSdk with env
const env = new Env(import.meta.env)
const zhiSdk = new ZhiSdk(env)

// siyuanAPI
const siyuanApi = zhiSdk.siyuanApi
console.log(siyuanApi.serverApi.VERSION)
console.log(siyuanApi.clientApi.VERSION)

// blogApi
const blogApi = zhiSdk.blogApi
console.log(blogApi.VERSION)

// common
const msg = "message"
const fmsg = zhiSdk.common.strUtil.f("This a {0}", msg)
console.log(fmsg)
```

## Deps

```
├── zhi-log
├── zhi-common
├── zhi-blog-api
├── zhi-siyuan-api
```

## Architecture

`zhi-sdk` consist a set of component apis, each component will have their own dependency trees

- zhi-sdk
  - zhi-env
  - zhi-log
  - zhi-common
    - browserUtil
    - dateUtil
    - deviceUtil
    - electronUtil
    - strUtil
    - versionUtil
  - zhi-core
  - zhi-ui
  - zhi-middleware
  - zhi-siyuan-api
    - zhi-siyuan-server-api
    - zhi-siyuan-client-api
    - zhi-siyuan-util
  - zhi-blog-api
    - zhi-metaweblog-api
      - zhi-wordpress
      - zhi-cnblogs
    - zhi-common-blog-api
      - zhi-yuque
    - zhi-http-custom-api
      - zhi-blog-zhihu
      - zhi-blog-csdn

## Building

This library was generated with [Nx](https://nx.dev).

Run `nx build zhi-sdk` to build the library.

## Running unit tests

Run `nx test zhi-sdk` to execute the unit tests via [Jest](https://jestjs.io).
