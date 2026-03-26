# Development

## Product Split

This repo intentionally separates authoring and viewing responsibilities:

- `apps/siyuan`
  The free Siyuan plugin frontend.
  It is the authoring / sharing entry used inside Siyuan.
- `apps/app`
  The unified viewer app.
  It serves multiple deployment targets: `siyuan`, `node`, `vercel`, `cloudflare`.

The runtime chain is:

`authoring frontend (global + document config)` -> `share snapshot` -> `viewer`

### AI assistant contract

- AI is a server-dependent viewer capability.
- `siyuan` target is the free SPA viewer, so AI is disabled at build target level.
- Server-capable viewers (`node` / `vercel` / `cloudflare`) may render AI.
- The viewer only consumes the frozen share snapshot:
  `post.aiAssistantEnabled`
- Do not drive viewer AI visibility from `static.app.config.json`.

Current effective viewer rule:

`showAI = viewerCapability.aiAssistant && post.aiAssistantEnabled && hasMeaningfulContent`

## Prerequisites

```bash
pnpm install
```

## Using aliyun private image repo

```bash
docker pull node:18-alpine
docker images
docker tag a1f1d32cdee7 registry.cn-shenzhen.aliyuncs.com/terwer/dm:node-18-alpine
docker login --username=terwer@aliyun.com registry.cn-shenzhen.aliyuncs.com
docker push registry.cn-shenzhen.aliyuncs.com/terwer/dm:node-18-alpine
```

## Development

serve

```bash
pnpm dev -F siyuan-blog
# http://localhost:6808/plugins/siyuan-blog/app/#/share?id=20240408194841-jmgbco2&origin=http://192.168.3.3:6806&isSsr=false

pnpm dev -F @terwer/share-pro-app -- --host
# http://localhost:3000
# http://localhost:3000/s/20241217142133-o580ytq
# http://10.10.34.38:3000/s/20241217142133-o580ytq.html?lang=en_US
```

dev

```bash
# free Siyuan SPA viewer (AI disabled by design)
pnpm build -F @terwer/share-pro-app -- --from siyuan

# Siyuan plugin
pnpm build -F siyuan-blog
pnpm makeLink
pnpm build -F siyuan-blog -- --watch

# http://localhost:6806/plugins/siyuan-blog/app/#/s/20241217142133-o580ytq
# http://localhost:6806/plugins/siyuan-blog/app/#/s/20241217142133-o580ytq?lang=en_US
```

### Important build note for `siyuan`

- `apps/app/script/siyuan.sh` now calls `pnpm exec nuxi generate -c nuxt.siyuan.config.ts`.
- This target is a free SPA viewer, not a server-capable AI viewer.
- Do not use the `siyuan` target to validate AI APIs or server AI routes.
- AI verification should be done with `node`, `vercel`, or `cloudflare` viewer targets.

### Known limitation for `siyuan generate`

At the moment, `pnpm exec nuxi generate -c nuxt.siyuan.config.ts` may still fail during prerender with `/api/endpoint` errors.

This is an existing SPA/prerender data-fetch issue in the `siyuan` target, not an AI capability issue.

In other words:

- the AI capability split in this change is intentional
- the remaining `generate` failure is a separate follow-up task in the SPA data loading chain

## Build

### for siyuan-note

```bash
# free SPA viewer, AI assistant disabled
pnpm build -F @terwer/share-pro-app -- --from siyuan
pnpm build -F siyuan-blog
```

### for node

```bash
pnpm build -F @terwer/share-pro-app -- --from node
# for /
node ./dist/node/server/index.mjs
# custom prefix, eg:/blog
NUXT_APP_BASE_URL=blog node ./dist/node/server/index.mjs
```

for vercel

```bash
# root：apps/app
# build command
pnpm vercelBuild
```

for cloudflare

```bash
# root：apps/app
# build command
pnpm cloudflareBuild
```

## Script Notes

The viewer build scripts now use explicit Nuxt config files instead of overwriting `nuxt.config.ts`:

- `apps/app/script/siyuan.sh`
  `pnpm exec nuxi generate -c nuxt.siyuan.config.ts`
- `apps/app/script/node.sh`
  `pnpm exec nuxi build -c nuxt.node.config.ts`
- `apps/app/script/vercel.sh`
  `pnpm exec nuxi build -c nuxt.vercel.config.ts`
- `apps/app/script/cloudflare.sh`
  `pnpm exec nuxi build -c nuxt.cloudflare.config.ts`
- `apps/app/script/dev.sh`
  `pnpm exec nuxi dev -c nuxt.node.config.ts --host`

## Package

```bash
pnpm package
```

artifacts structure

```
├── build
  ├── package.zip
  ├── siyuan-plugin-blog-5.4.0.zip
```

## Node Provider Mode Maintenance

1. Build

```bash
pnpm buildNodeProvider
pnpm packageNodeProvider
```

2. FTP upload `build/node-provider.zip` and replace, then extract and install

```bash
mv dist dist_bak
./install.sh
```

3. Start command

```bash
pnpm start
```
