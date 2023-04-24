# zhi-server-vue3-ssr
a ssr blog using vue3 and esbuild

## How to use

### Dev

```bash
pnpm dev -F zhi-server-vue3-ssr
```

### Node

1 build

```bash
pnpm nodeBuild -F zhi-server-vue3-ssr
```

2 run

```bash
pnpm nodeDev -F zhi-server-vue3-ssr
```

### Siyuan console

1 build

```bash
pnpm localBuild -F zhi-server-vue3-ssr
```

2 run

```ts
const server = await zhiImport("/dynamic/blog/server.mjs")
server()
```

### Docker

1 build

```bash
pnpm nodeBuild -F zhi-server-vue3-ssr
```

2 run

```bash
pnpm dockerBuild -F zhi-server-vue3-ssr
```

### Vercel

```bash
pnpm vercelBuild -F zhi-server-vue3-ssr
````