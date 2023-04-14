# zhi-log

a simple logger for Node and Browser

## Usage

```ts
import LogFactory from "zhi-log"

const env = new Env(import.meta.env)
const logger = LogFactory.defaultLogger(env)
logger.debug("debug msg")
logger.info("info msg")
logger.error("error msg")
```

## Deps

```
├── zhi-env
├── loglevel
├── callsites
├── loglevel-plugin-prefix
```

## Dev

```bash
pnpm dev -F zhi-log
```

## Build

```bash
pnpm build -F zhi-log
```

## Api

```bash
pnpm doc -F zhi-log
pnpm md -F zhi-log
```

## Test

Execute the unit tests via [jest](https://jestjs.io/docs/getting-started#via-ts-jest)

```bash
pnpm test -F zhi-log
```

## Publish

```
pnpm publish -F zhi-log --ver=0.1.0 --tag=latest
```