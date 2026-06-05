#!/bin/bash
set -e

#
#            GNU GENERAL PUBLIC LICENSE
#               Version 3, 29 June 2007
#
#  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
#  Everyone is permitted to copy and distribute verbatim copies
#  of this license document, but changing it is not allowed.
#

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
APP_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
BACKUP_CONFIG="$APP_DIR/nuxt.config.ts.bak"

cleanup() {
  if [ -f "$BACKUP_CONFIG" ]; then
    mv "$BACKUP_CONFIG" "$APP_DIR/nuxt.config.ts"
  fi
}

trap cleanup EXIT

cd "$APP_DIR"
cp nuxt.config.ts "$BACKUP_CONFIG"
cp nuxt.node.config.ts nuxt.config.ts

echo "Using Node build config as SSR serve."
# 不写死
#NUXT_PUBLIC_DEFAULT_TYPE=node \
#NUXT_PUBLIC_PROVIDER_MODE=true \
#NUXT_PUBLIC_PROVIDER_URL=http://localhost:8086 \
#NUXT_AI_BASE_URL=http://localhost:8317 \
#NUXT_AI_API_KEY=sk-123456 \
#NUXT_AI_MODEL=qwen3-max \
PORT=4000 \
pnpm exec nuxi dev --host
