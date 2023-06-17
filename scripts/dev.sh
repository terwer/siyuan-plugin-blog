#!/usr/bin/sh

# 使用 Siyuan 构建配置
echo "Using Siyuan build config as SSE and SPA build."
cp nuxt.siyuan.config.ts nuxt.config.ts
nuxt generate