#!/usr/bin/env pwsh
# Windows 对应实现：install.sh
# 把 build/node-provider.zip 解压到当前目录（zip 内是 dist/node/...）。
$ErrorActionPreference = "Stop"

Set-Location -LiteralPath $PSScriptRoot

if (-not (Test-Path -LiteralPath "./build/node-provider.zip")) {
    Write-Host "build/node-provider.zip not found"
    exit 1
}

Expand-Archive -LiteralPath "./build/node-provider.zip" -DestinationPath "." -Force

if ($?) {
    Write-Host "Packaging successful: build/node-provider.zip"
}
else {
    Write-Host "Packaging failed"
    exit 1
}
