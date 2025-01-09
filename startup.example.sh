#!/bin/sh

pnpm build -F @terwer/share-pro-app -- --from node
# for /
NUXT_PUBLIC_DEFAULT_TYPE=node NUXT_PUBLIC_PROVIDER_MODE=true NUXT_PUBLIC_PROVIDER_URL=http://localhost:8086 node ./dist/node/server/index.mjs
# custom prefix, eg:/blog
# NUXT_APP_BASE_URL=/blog node ./dist/node/server/index.mjs