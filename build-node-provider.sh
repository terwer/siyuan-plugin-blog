#!/bin/sh

rm -rf dist
mkdir -p dist/node
pnpm build -F @terwer/share-pro-app --force -- --from node
echo "Build node provider finished."