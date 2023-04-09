# zhi-siyuan-api

a siyuan-note api including both kernel and client

## Usage

```ts
import { SiYuanApiAdaptor, SiyuanConfig } from "zhi-siyuan-api"

const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
const apiAdaptor = new SiYuanApiAdaptor(siyuanConfig)
// const posts = await apiAdaptor.getRecentPosts(10)
expect(apiAdaptor).toBeTruthy()
```

## Deps

```
├── zhi-env
├── zhi-log
├── zhi-common
├── zhi-blog-api
```

## Building

This library was generated with [Nx](https://nx.dev).

Run `nx build zhi-siyuan-api` to build the library.

## Running unit tests

Run `nx test zhi-siyuan-api` to execute the unit tests via [Vitest](https://vitest.dev).

## Publish

```
nx publish zhi-siyuan-api --ver=0.0.1 --tag=latest
```
