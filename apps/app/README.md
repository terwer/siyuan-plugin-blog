[中文](README_zh_CN.md)

# Viewer App

`apps/app` is the unified viewer application used by multiple targets.
It is shared by both the free path and the pro path.

Those paths are:

- Free path:
  `apps/siyuan` -> host Siyuan kernel / local public files -> `apps/app`
- Pro path:
  `share-pro` -> `siyuan-note-service` -> `apps/app`

## Targets

- `siyuan`
  Free SPA viewer embedded in Siyuan.
- `node`
  SSR/server-capable viewer.
- `vercel`
  Server-capable deployment.
- `cloudflare`
  Server-capable deployment.

## Setup

Make sure to install dependencies:

```bash
pnpm install
```

## Development

Run the server-capable viewer locally:

```bash
cd apps/app
bash script/dev.sh
```

## Build

Build the free Siyuan SPA viewer:

```bash
cd apps/app
bash script/siyuan.sh
```

This script temporarily switches to `nuxt.siyuan.config.ts`, builds the free SPA viewer, and restores `nuxt.config.ts` automatically.

Build the Node viewer:

```bash
cd apps/app
bash script/node.sh
```

Build the Vercel viewer:

```bash
cd apps/app
bash script/vercel.sh
```

Build the Cloudflare viewer:

```bash
cd apps/app
bash script/cloudflare.sh
```
