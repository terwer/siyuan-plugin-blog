#!/usr/bin/env pwsh
# Windows 对应实现：dev-prod.sh
# 手动入口（不经过 pnpm scripts），供 Windows 本地联调正式 provider。
$ErrorActionPreference = "Continue"

Set-Location -LiteralPath $PSScriptRoot

$env:NUXT_PUBLIC_DEFAULT_TYPE = "node"
$env:NUXT_PUBLIC_PROVIDER_MODE = "true"
$env:NUXT_PUBLIC_PROVIDER_URL = "https://api.terwergreen.com:8888"

& pnpm.cmd @("dev", "-F", "@terwer/share-pro-app", "--", "--host")
exit $LASTEXITCODE
