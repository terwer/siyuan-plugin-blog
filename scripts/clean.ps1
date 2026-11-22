#!/usr/bin/env pwsh
# Windows 对应实现：scripts/clean.sh
# 只在 Windows 上由 `pnpm clean` 经 scripts/run-platform-script.mjs 自动调用。
# 与 .sh 一致：set -e（任一步失败立即退出）。
$ErrorActionPreference = "Stop"

Set-Location -LiteralPath (Split-Path -Parent $PSScriptRoot)

if (Test-Path -LiteralPath "./dist") {
    Remove-Item -LiteralPath "./dist" -Recurse -Force
}
if (Test-Path -LiteralPath "./build") {
    Remove-Item -LiteralPath "./build" -Recurse -Force
}

# 等价 `turbo run clean`：pnpm exec 会把 node_modules/.bin 加入 PATH
& pnpm.cmd exec turbo run clean
if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
}

if (Test-Path -LiteralPath "./node_modules") {
    Remove-Item -LiteralPath "./node_modules" -Recurse -Force
}

# 等价 `find . -name ".turbo" -type d -exec rm -rf {} +`
# 先删深层目录，避免父目录被删后子目录路径失效
foreach ($dirName in @(".turbo", "__pycache__")) {
    Get-ChildItem -Path "." -Recurse -Directory -Force -Filter $dirName -ErrorAction SilentlyContinue |
        Sort-Object { $_.FullName.Length } -Descending |
        ForEach-Object {
            Remove-Item -LiteralPath $_.FullName -Recurse -Force -ErrorAction SilentlyContinue
        }
}

Write-Host "finished."
