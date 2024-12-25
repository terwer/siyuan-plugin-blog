#!/bin/bash

# 使用 Docker 构建配置
echo "Starting with docker..."

# 兼容 node 的构建
cp .env.docker .env
pnpm nodeBuild
docker compose up -d --build