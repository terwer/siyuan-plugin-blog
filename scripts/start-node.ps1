#!/usr/bin/env pwsh
# Windows 对应实现：scripts/start-node.sh
# 只在 Windows 上由平台分派器调用。
# 与 .sh 一致：set -eu（任一步失败立即退出）。
$ErrorActionPreference = "Stop"

Set-Location -LiteralPath (Split-Path -Parent $PSScriptRoot)

# Nuxt 4 / undici 需要 Node 20.19+ 或 22.12+；Node 18 会出现 File is not defined 等运行时错误
$nodeVersion = (& node -v).TrimStart("v")
$versionParts = $nodeVersion.Split(".") | ForEach-Object { [int]$_ }
$major = $versionParts[0]
$minor = $versionParts[1]
if (-not (($major -eq 20 -and $minor -ge 19) -or $major -ge 22)) {
    Write-Host "Node.js >= 20.19 or >= 22 is required, current: v$nodeVersion"
    exit 1
}

& pnpm.cmd buildNodeProvider
if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
}

$env:NUXT_PUBLIC_DEFAULT_TYPE = "node"
$env:NUXT_PUBLIC_PROVIDER_MODE = "true"
$env:NUXT_PUBLIC_PROVIDER_URL = "http://localhost:8086"
$env:PORT = "4000"

& node ./dist/node/server/index.mjs
exit $LASTEXITCODE
