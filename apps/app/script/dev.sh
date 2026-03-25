#!/bin/sh

#
#            GNU GENERAL PUBLIC LICENSE
#               Version 3, 29 June 2007
#
#  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
#  Everyone is permitted to copy and distribute verbatim copies
#  of this license document, but changing it is not allowed.
#

echo "Using Node build config as SSR serve."
cp nuxt.node.config.ts nuxt.config.ts
pnpm postinstall
NUXT_PUBLIC_DEFAULT_TYPE=node \
NUXT_PUBLIC_PROVIDER_MODE=true \
NUXT_PUBLIC_PROVIDER_URL=http://localhost:8086 \
NUXT_AI_BASE_URL=http://localhost:8317 \
NUXT_AI_API_KEY=sk-123456 \
NUXT_AI_MODEL=qwen3-max \
PORT=4000 \
nuxt dev --host