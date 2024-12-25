#!/bin/bash

# 使用 Vercel 构建配置
echo "Using Vercel build config as SSR build."
cp nuxt.vercel.config.ts nuxt.config.ts
echo "Nuxt build for vercel finished."

# 拷贝资源
# rsync -av --progress .output/public/ ./dist/
mkdir -p ../../dist/vercel
rsync -av .output/ ../../dist/vercel
rsync -av dist/ ../../dist/vercel
echo "Resources are copied."

nuxt build
echo "Vercel build finished."