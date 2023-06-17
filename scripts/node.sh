#!/usr/bin/sh

# 使用 Node 构建配置
echo "Using Node build config as SSR build."
cp nuxt.node.config.ts nuxt.config.ts
nuxt build