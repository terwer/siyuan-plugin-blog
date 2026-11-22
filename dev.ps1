#!/usr/bin/env pwsh
# Windows 对应实现：dev.sh
# 手动入口（不经过 pnpm scripts），供 Windows 本地联调带 server 能力的查看页。
$ErrorActionPreference = "Continue"

Set-Location -LiteralPath $PSScriptRoot

$env:NUXT_PUBLIC_DEFAULT_TYPE = "node"
$env:NUXT_PUBLIC_PROVIDER_MODE = "true"
$env:NUXT_PUBLIC_PROVIDER_URL = "http://localhost:8086"

& pnpm.cmd @("dev", "-F", "@terwer/share-pro-app", "--", "--host")
exit $LASTEXITCODE
