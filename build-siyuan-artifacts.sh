#!/bin/sh

pnpm build -F @terwer/share-pro-app --force -- --from siyuan
pnpm build -F siyuan-blog --force
echo "Build all finished."