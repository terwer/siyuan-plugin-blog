#!/bin/sh

pnpm build -F @terwer/share-pro-app --force -- --from node
echo "Build node provider finished."