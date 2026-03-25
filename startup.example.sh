#!/bin/sh

pnpm build -F @terwer/share-pro-app -- --from node
# for /
NUXT_PUBLIC_DEFAULT_TYPE=node \
NUXT_PUBLIC_PROVIDER_MODE=true \
NUXT_PUBLIC_PROVIDER_URL=http://localhost:8086 \
NUXT_AI_BASE_URL=http://localhost:8317 \
NUXT_AI_API_KEY=sk-123456 \
NUXT_AI_MODEL=qwen3-max \
PORT=4000 \
node ./dist/node/server/index.mjs
# custom prefix, eg:/blog
# NUXT_APP_BASE_URL=/blog node ./dist/node/server/index.mjs