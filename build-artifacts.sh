#!/bin/sh

pnpm build -F @terwer/share-pro-app --force -- --from node
pnpm build -F @terwer/share-pro-app --force -- --from siyuan
pnpm build -F siyuan-blog
echo "Build all finished."