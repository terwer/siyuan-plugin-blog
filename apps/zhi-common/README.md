# zhi-common

the library base for zhi related projects

Note: This library is compatible with node, browser, electron and browser extension these all platforms

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
├── ajv
```

## Dev

```bash
pnpm dev -F zhi-common
```

## Build

```bash
pnpm build -F zhi-common
```

## Api

```bash
pnpm doc -F zhi-common
pnpm md -F zhi-common
```

## Test

Execute the unit tests via [jest](https://jestjs.io/docs/getting-started#via-ts-jest)

```bash
pnpm test -F zhi-common
```

## Publish

```
pnpm publish -F zhi-common --tag=latest
```