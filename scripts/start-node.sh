#!/bin/sh
set -eu

# Nuxt 4 / undici 需要 Node 20.19+ 或 22.12+；Node 18 会出现 File is not defined 等运行时错误
node -e 'const [major, minor] = process.versions.node.split(".").map(Number); if (!((major === 20 && minor >= 19) || major >= 22)) { console.error(`Node.js >= 20.19 or >= 22 is required, current: ${process.version}`); process.exit(1) }'

pnpm buildNodeProvider

NUXT_PUBLIC_DEFAULT_TYPE=node \
NUXT_PUBLIC_PROVIDER_MODE=true \
NUXT_PUBLIC_PROVIDER_URL=http://localhost:8086 \
PORT=4000 \
exec node ./dist/node/server/index.mjs
