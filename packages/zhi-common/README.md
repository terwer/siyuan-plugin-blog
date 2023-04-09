# zhi-common

the library base for zhi related projects

Note: ⚠️This library is compatible with node, browser, electron and browser extension these all platforms

## Usage

```ts
import zhiCommon from "zhi-common"

const dateUtil = zhiCommon.dateUtil
const now = dateUtil.nowDateZh()
console.log("now=>", now)
```

## Deps


```
├── zhi-env
├── zhi-log
├── lute
├── showdown
├── compare-versions
```

## Building

This library was generated with [Nx](https://nx.dev).

Run `nx build zhi-common` to build the library.

## Running unit tests

Run `nx test zhi-common` to execute the unit tests via [Vitest](https://vitest.dev).

## Publish

```
nx publish zhi-common --ver=0.0.1 --tag=latest
```
