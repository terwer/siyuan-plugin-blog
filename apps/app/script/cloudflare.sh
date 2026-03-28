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
BACKUP_CONFIG="$APP_DIR/nuxt.config.ts.codex.bak"

cleanup() {
  if [ -f "$BACKUP_CONFIG" ]; then
    mv "$BACKUP_CONFIG" "$APP_DIR/nuxt.config.ts"
  fi
}

trap cleanup EXIT

cd "$APP_DIR"
cp nuxt.config.ts "$BACKUP_CONFIG"
cp nuxt.cloudflare.config.ts nuxt.config.ts

echo "Using Cloudflare build config as SSR build."
pnpm exec nuxi build
echo "Nuxt build for cloudflare finished."
