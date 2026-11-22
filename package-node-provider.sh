#!/bin/sh

# 把 dist/node 目录打包成 build/node-provider.zip（zip 内路径为 dist/node/...）
rm -rf build
mkdir -p build
if [ ! -d "dist/node" ]; then
  echo "dist/node directory does not exist"
  exit 1
fi

# 打包前校验入口，避免把 .output 结构或构建残留打成包，部署后才报找不到 server/index.mjs
if [ ! -f "dist/node/server/index.mjs" ]; then
  echo "dist/node/server/index.mjs does not exist; run pnpm buildNodeProvider first"
  exit 1
fi

# 排除构建残留：dist/node/dist 是 siyuan SPA 产物，不属于 node provider
zip -r build/node-provider.zip dist/node -x "dist/node/dist/*"
