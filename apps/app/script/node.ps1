#!/usr/bin/env pwsh
# Windows 对应实现：script/node.sh
# 只在 Windows 上由 `pnpm build ... -- --from node` 经 script/build.ps1 分派调用。
# 与 .sh 逐条等价：备份 nuxt.config.ts -> 切换 node 配置 -> nuxi build -> 处理 popperjs -> 复制产物 -> 恢复配置。
$ErrorActionPreference = "Stop"

$appDir = Split-Path -Parent $PSScriptRoot
$backupConfig = Join-Path $appDir "nuxt.config.ts.codex.bak"
$exitCode = 0

function Assert-ExitCode([string]$message) {
    if ($LASTEXITCODE -ne 0) {
        $script:exitCode = $LASTEXITCODE
        throw "$message（退出码 $LASTEXITCODE）"
    }
}

try {
    Set-Location -LiteralPath $appDir
    Copy-Item -LiteralPath "./nuxt.config.ts" -Destination $backupConfig -Force
    Copy-Item -LiteralPath "./nuxt.node.config.ts" -Destination "./nuxt.config.ts" -Force

    Write-Host "Using Node build config as SSR build."
    $env:NODE_OPTIONS = "--max_old_space_size=8192"
    & pnpm.cmd exec nuxi build
    Assert-ExitCode "pnpm exec nuxi build 失败"
    Write-Host "Nuxt build for node finished."

    New-Item -ItemType Directory -Force -Path "./.output/server/node_modules/@popperjs" | Out-Null
    if (Test-Path -LiteralPath "./.output/server/node_modules/@sxzz/popperjs-es") {
        Move-Item -LiteralPath "./.output/server/node_modules/@sxzz/popperjs-es" `
            -Destination "./.output/server/node_modules/@popperjs/core" -Force
    }

    # 产物目录必须等于 .output 的内容（启动入口是 ../../dist/node/server/index.mjs）。
    # 先清空再复制：目标已存在时 cp/Copy-Item 会把 .output 复制成 ../../dist/node/.output，与启动路径不符。
    if (Test-Path -LiteralPath "../../dist/node") {
        Remove-Item -LiteralPath "../../dist/node" -Recurse -Force
    }
    Copy-Item -LiteralPath "./.output" -Destination "../../dist/node" -Recurse -Force
    # apps/app/dist 是 Nuxt 2 时期的额外静置资源；Nuxt 4 下不存在，存在时才复制，避免构建必然失败。
    if (Test-Path -LiteralPath "./dist") {
        Copy-Item -LiteralPath "./dist" -Destination "../../dist/node" -Recurse -Force
    }

    Write-Host "Resources are copied."
    Write-Host "Node build finished."
}
catch {
    if ($exitCode -eq 0) {
        $exitCode = 1
    }
    Write-Host $_
}
finally {
    # 等价 trap cleanup EXIT：无论成功失败都恢复 nuxt.config.ts
    if (Test-Path -LiteralPath $backupConfig) {
        Move-Item -LiteralPath $backupConfig -Destination (Join-Path $appDir "nuxt.config.ts") -Force
    }
}

exit $exitCode
