[中文](README_zh_CN.md)

# Share to web

Your self-hosted notion alternative

## Architecture

This repository now has two clearly separated roles:

- `apps/siyuan`: the free Siyuan plugin frontend used to author and trigger sharing.
- `apps/app`: the unified viewer application used by different deployment targets.

The end-to-end flow is:

`Siyuan authoring frontend (global + document config)` -> `share backend / persisted share snapshot` -> `viewer app`

For AI specifically:

- The viewer no longer reads AI visibility from global `app.config`.
- The final viewer decision is based on:
  `viewer capability` + `post.aiAssistantEnabled` + `meaningful document content`
- `post.aiAssistantEnabled` is treated as the frozen, post-share result after upstream config merge.

## Startup Via Node provider as debug

```bash
# cp .env .env
# change NUXT_PUBLIC_PROVIDER_URL or use default
pnpm devApp
```

## Startup Via Node provider

```bash
# cp ./startup.example.sh ./startup.sh
# change NUXT_PUBLIC_PROVIDER_URL or use default
./startup.sh
```

## Build Via Node provider

```bash
pnpm buildNodeProvider
pnpm packageNodeProvider
```

## Viewer Targets

### `siyuan`

- Build command: `pnpm build -F @terwer/share-pro-app -- --from siyuan`
- Output type: free SPA viewer
- AI assistant: disabled by design
- This target must not be used to verify server-dependent AI capability

### `node` / `vercel` / `cloudflare`

- These are server-capable viewer targets
- AI assistant is available only on these targets
- The shared document must already provide `post.aiAssistantEnabled: true`

## More

[Click here](https://siyuan.wiki/s/20250111132959-xvao9ll)
