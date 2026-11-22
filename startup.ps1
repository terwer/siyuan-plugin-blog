#!/usr/bin/env pwsh
# Windows 对应实现：startup.sh（生产启动脚本，由 startup.example.sh 复制而来）
# 只在 Windows 上由 `pnpm start` 经 scripts/run-platform-script.mjs 自动调用。
$ErrorActionPreference = "Continue"

Set-Location -LiteralPath $PSScriptRoot

# & pnpm.cmd @("build", "-F", "@terwer/share-pro-app", "--", "--from", "node")

$env:NUXT_PUBLIC_DEFAULT_TYPE = "node"
$env:NUXT_PUBLIC_PROVIDER_MODE = "true"
$env:NUXT_PUBLIC_PROVIDER_URL = "http://localhost:8086"
$env:NUXT_AI_BASE_URL = "http://localhost:8317"
$env:NUXT_AI_API_KEY = "sk-123456"
$env:NUXT_AI_MODEL = "qwen3-max"
$env:PORT = "4000"

& node ./dist/node/server/index.mjs
exit $LASTEXITCODE
