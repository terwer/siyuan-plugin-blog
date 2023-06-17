#!/usr/bin/sh

# 使用 Siyuan 构建配置
echo "Using Siyuan build config as SSE and SPA build."
mv nuxt.siyuan.config.ts nuxt.config.ts
pnpm generate