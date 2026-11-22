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
cp nuxt.node.config.ts nuxt.config.ts

echo "Using Node build config as SSR build."
NODE_OPTIONS=--max_old_space_size=8192 pnpm exec nuxi build
echo "Nuxt build for node finished."

mkdir -p .output/server/node_modules/@popperjs
if [ -d .output/server/node_modules/@sxzz/popperjs-es ]; then
  mv .output/server/node_modules/@sxzz/popperjs-es .output/server/node_modules/@popperjs/core
fi
# 产物目录必须等于 .output 的内容（启动入口是 ../../dist/node/server/index.mjs）。
# 先清空再复制：cp -r 在目标已存在时会把 .output 复制成 ../../dist/node/.output，与启动路径不符。
rm -rf ../../dist/node
cp -r .output ../../dist/node
# apps/app/dist 是 Nuxt 2 时期的额外静置资源；Nuxt 4 下不存在，存在时才复制，避免构建必然失败。
if [ -d dist ]; then
  cp -r dist ../../dist/node
fi
echo "Resources are copied."

echo "Node build finished."
