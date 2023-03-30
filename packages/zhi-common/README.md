# zhi-common

the library base for zhi related projects

Note: ⚠️This library must be compatible with node, browser, electron and browser extension these all platforms

## Usage

```ts
import zhiUtil from "zhi-common"

const dateUtil = zhiUtil.dateUtil
const now = dateUtil.nowDateZh()
console.log("now=>", now)
```

## Deps

```
├── zhi-env
├── zhi-log
```

## Building

This library was generated with [Nx](https://nx.dev).

Run `nx build zhi-common` to build the library.

## Running unit tests

Run `nx test zhi-common` to execute the unit tests via [Jest](https://jestjs.io).

## Publish

```
nx publish zhi-common --ver=1.3.0 --tag=latest
```
