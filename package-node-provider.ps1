#!/usr/bin/env pwsh
# Windows 对应实现：package-node-provider.sh
# 只在 Windows 上由 `pnpm packageNodeProvider` 经 scripts/run-platform-script.mjs 自动调用。
#
# 用 .NET ZipArchive 手写条目，而不用 Compress-Archive：
#   - Windows PowerShell 5.1 的 Compress-Archive 会把条目名写成反斜杠（dist\node\...），
#     不符合 zip 规范，unzip 解压出来是错误路径；
#   - 手写条目可以精确生成 dist/node/... 前缀，与 `zip -r build/node-provider.zip dist/node` 完全一致，
#     install.sh / install.ps1 的解压结果不变。
$ErrorActionPreference = "Stop"

Set-Location -LiteralPath $PSScriptRoot

if (Test-Path -LiteralPath "./build") {
    Remove-Item -LiteralPath "./build" -Recurse -Force
}
New-Item -ItemType Directory -Force -Path "./build" | Out-Null

if (-not (Test-Path -LiteralPath "./dist/node")) {
    Write-Host "dist/node directory does not exist"
    exit 1
}

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$source = (Resolve-Path -LiteralPath "./dist/node").Path
$zipPath = Join-Path $PSScriptRoot "build/node-provider.zip"

$archive = [System.IO.Compression.ZipFile]::Open($zipPath, [System.IO.Compression.ZipArchiveMode]::Create)
try {
    # 与 zip -r 一致：先写入 dist/ 和 dist/node/ 两个目录条目
    $archive.CreateEntry("dist/") | Out-Null
    $archive.CreateEntry("dist/node/") | Out-Null

    Get-ChildItem -LiteralPath $source -Recurse -Force | ForEach-Object {
        # 条目名固定加 dist/node/ 前缀（与 zip -r build/node-provider.zip dist/node 一致），并统一用正斜杠
        $relative = "dist/node/" + $_.FullName.Substring($source.Length).TrimStart('\', '/').Replace('\', '/')
        if ($_.PSIsContainer) {
            $archive.CreateEntry("$relative/") | Out-Null
        }
        else {
            [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
                $archive,
                $_.FullName,
                $relative,
                [System.IO.Compression.CompressionLevel]::Optimal
            ) | Out-Null
        }
    }
}
finally {
    $archive.Dispose()
}
