# zhi-env

a cross-platform env config lib

## Usage

For simple use

```ts
import Env from "zhi-env"

const env = new Env({
  "some-key": "some-value",
})
const val = env.getEnv("some-key")
console.log("val=>", val)
```

For `vite`

```ts
import Env from "zhi-env"

const env = new Env(import.meta.env)
const val = env.getEnv("some-key")
console.log("val=>", val)
```

For `Nuxt` framework

```ts
import Env from "zhi-env"

const nuxtEnv = useRuntimeConfig()
const env = new Env(nuxtEnv)

const val = env.getEnv("some-key")
console.log("val=>", val)
```

For `Astro` framework or other libs

```ts
import Env from "zhi-env"

// https://github.com/vitejs/vite/issues/9539#issuecomment-1206301266
// 1 add modules:esnext tsconfig.app.json
// 2 add custom.d.ts
const envMeta = import.meta.env

const customEnv = {
    [EnvConstants.NODE_ENV_KEY]: EnvConstants.NODE_ENV_DEVELOPMENT,
    [EnvConstants.VITE_DEBUG_MODE_KEY]: false,
    [LogConstants.LOG_LEVEL_KEY]: LogLevelEnum.LOG_LEVEL_DEBUG,
    [LogConstants.LOG_PREFIX_KEY]: "zhi-common",
    ...envMeta,
}

const env = new Env(customEnv)

const val = env.getEnv("some-key")
console.log("val=>", val)
```

## Deps

```
## Congregations! zhi-env need no deps, it is just pure js code 🎉
```

## Building

This library was generated with [Nx](https://nx.dev).

Run `nx build zhi-env` to build the library.

## Running unit tests

Run `nx test zhi-env` to execute the unit tests via [Vitest](https://vitest.dev).

## Publish

```
nx publish zhi-env --ver=0.0.1 --tag=latest
```
