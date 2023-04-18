# zhi-blog-api

a common blog interface

Note: BlogApi should be implemented as a specific BlogApi, it cannot be used directly

## Deps

```
├── zhi-env
├── zhi-log
````

## Dev

```bash
pnpm dev -F zhi-blog-api
```

## Build

```bash
pnpm build -F zhi-blog-api
```

## Api

```bash
pnpm doc -F zhi-blog-api
pnpm md -F zhi-blog-api
```

## Test

Execute the unit tests via [jest](https://jestjs.io/docs/getting-started#via-ts-jest)

```bash
pnpm test -F zhi-blog-api
```

## Publish

```
pnpm publish -F zhi-blog-api --tag=latest
```