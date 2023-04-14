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

For Astro framework or other libs

```ts
import Env from "zhi-env"

// https://github.com/vitejs/vite/issues/9539#issuecomment-1206301266
// 1 add modules:esnext to tsconfig.json
// 2 add env.d.ts
//   ```
//  interface ImportMeta {
//    readonly env: ImportMetaEnv
//  }
//  ```
// 3 add define to esbuild, vite etc.
//    ```
//    "import.meta.env": JSON.stringify({
//      NODE_ENV: isWatch ? "development" : "production",
//      ...getNormalizedEnvDefines(["NODE", "VITE_"]),
//    })
//    ```

const envMeta = import.meta.env
const env = new Env(import.meta.env)

const val = env.getEnv("some-key")
console.log("val=>", val)
```

## Deps

```
## Congregations! zhi-env need no deps, it is just pure js code 🎉
```

## Dev

```bash
pnpm dev -F zhi-env
```

## Build

```bash
pnpm build -F zhi-env
```

## Api

```bash
pnpm doc -F zhi-env
pnpm md -F zhi-env
```

## Test

Execute the unit tests via [jest](https://jestjs.io/docs/getting-started#via-ts-jest)

```bash
pnpm test -F zhi-env
```

## Publish

```
pnpm publish -F zhi-env --ver=0.1.0 --tag=latest
```