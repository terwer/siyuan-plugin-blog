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

## Building

This library was generated with [Nx](https://nx.dev).

Run `nx build zhi-log` to build the library.

## Running unit tests

Run `nx test zhi-log` to execute the unit tests via [Vitest](https://vitest.dev).

## Publish

```
nx publish zhi-log --ver=0.0.1 --tag=latest
```
