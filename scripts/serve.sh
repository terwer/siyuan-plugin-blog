#!/bin/bash

# 使用 Node 构建配置
echo "Using Node build config as SSR serve"
cp nuxt.node.config.ts nuxt.config.ts
export PORT=4000
nuxt dev