# Development

## Product Split

This repo intentionally separates authoring and viewing responsibilities, but it is not the whole product family.

Inside this repo:

- `apps/siyuan`
  The free edition authoring frontend.
  It is implemented as a Siyuan plugin and is the authoring / sharing entry used inside the host Siyuan app.
- `apps/app`
  The unified viewer app.
  It serves multiple deployment targets: `siyuan`, `node`, `vercel`, `cloudflare`.

Outside this repo:

- `share-pro`
  The paid/professional authoring frontend.
- `siyuan-note-service`
  The paid/professional backend service.

So the real architecture has two paths:

- Free path:
  `apps/siyuan` -> host Siyuan kernel / local public storage -> `apps/app` viewer
- Pro path:
  `share-pro` -> `siyuan-note-service` -> `apps/app` viewer

This is the key product boundary:

- The free authoring frontend talks directly to the host Siyuan APIs.
- There is no application backend owned by this repo in the free authoring path.
- Backend participation only exists in the separate pro product line.

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
pnpm dev
# same as: pnpm dev:app

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

### Local dev with production provider

When running local `pnpm dev` / `./dev.sh` while pointing `NUXT_PUBLIC_PROVIDER_URL` to the production provider, keep these caveats in mind:

- Local `localhost` / LAN IP origins are different from the production domain, so homepage settings may follow a different domain whitelist branch.
- This can directly affect `homePageId`, share snapshots, and the SSR first-render branch, which may look like a hydration bug.
- Therefore, **do not treat hydration mismatch in local-dev-with-production-provider as a pure rendering issue by default**. First verify whether the current origin matches the production configuration.
- To validate the final production behavior, prefer using the production domain. If a local address must be used, prepare matching domain whitelist entries and settings for that origin.

### Important build note for `siyuan`

- `apps/app/script/siyuan.sh` now performs a safe temporary switch to `nuxt.siyuan.config.ts`, runs the build, and restores `nuxt.config.ts` automatically.
- This target is a free SPA viewer, not a server-capable AI viewer.
- Do not use the `siyuan` target to validate AI APIs or server AI routes.
- AI verification should be done with `node`, `vercel`, or `cloudflare` viewer targets.
- The free SPA generation path has been adjusted so that prerender no longer blocks distribution.

### Root shortcuts

- `pnpm dev`
  Start `apps/app` from the monorepo root.
- `pnpm dev:app`
  Same as `pnpm dev`.
- `pnpm dev:siyuan`
  Start the `apps/siyuan` watcher from the monorepo root.
- `pnpm dev:all`
  Run all workspace `dev` tasks through turbo.

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

The viewer build scripts now perform a temporary config switch and automatically restore `nuxt.config.ts` after the command exits:

- `apps/app/script/siyuan.sh`
  temporary switch to `nuxt.siyuan.config.ts`, then `pnpm exec nuxi generate`, then restore
- `apps/app/script/node.sh`
  temporary switch to `nuxt.node.config.ts`, then `pnpm exec nuxi build`, then restore
- `apps/app/script/vercel.sh`
  temporary switch to `nuxt.vercel.config.ts`, then `pnpm exec nuxi build`, then restore
- `apps/app/script/cloudflare.sh`
  temporary switch to `nuxt.cloudflare.config.ts`, then `pnpm exec nuxi build`, then restore
- `apps/app/script/dev.sh`
  temporary switch to `nuxt.node.config.ts`, then `pnpm exec nuxi dev --host`, then restore on exit

Do not use `nuxi -c <config>` directly as the default multi-target build entry in this repo.

In practice, this project's multi-config setup is only reliably reproduced by the provided scripts, because they switch the active `nuxt.config.ts`, run the command, and restore it afterward.

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
