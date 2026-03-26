# Viewer App

`apps/app` is the unified viewer application used by multiple targets.

## Targets

- `siyuan`
  Free SPA viewer embedded in Siyuan.
  AI assistant is disabled in this target.
- `node`
  SSR/server-capable viewer.
  AI assistant is supported.
- `vercel`
  Server-capable deployment.
  AI assistant is supported.
- `cloudflare`
  Server-capable deployment.
  AI assistant is supported.

## AI Visibility Contract

The viewer does not use global `setting.aiAssistantEnabled` to decide whether AI should render.

The final decision is:

`viewer capability` + `post.aiAssistantEnabled` + `meaningful content`

`post.aiAssistantEnabled` must be treated as the already-merged, post-share snapshot from upstream sharing logic.

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
