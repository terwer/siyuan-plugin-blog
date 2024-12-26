#!/bin/sh

#
#            GNU GENERAL PUBLIC LICENSE
#               Version 3, 29 June 2007
#
#  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
#  Everyone is permitted to copy and distribute verbatim copies
#  of this license document, but changing it is not allowed.
#

# 使用 Node 构建配置
echo "Using Node build config as SSR build."
cp nuxt.node.config.ts nuxt.config.ts
nuxt build
echo "Nuxt build for node finished."

# 拷贝资源
# rsync -av --progress .output/public/ ./dist/
mkdir -p ../../dist/node
#rsync -av .output/ ../../dist/node
#rsync -av dist/ ../../dist/node
cp -r .output/ ../../dist/node
cp -r dist/ ../../dist/node
echo "Resources are copied."

echo "Node build finished."