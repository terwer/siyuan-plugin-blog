#!/usr/bin/env pwsh
# Windows 对应实现：script/dev.sh
# 只在 Windows 上由 `pnpm dev` 经 script/run-platform-script.mjs 自动调用。
# 与 .sh 逐条等价：备份配置 -> 切换 node 配置 -> nuxi dev --host -> 结束后恢复配置。
$ErrorActionPreference = "Stop"

$appDir = Split-Path -Parent $PSScriptRoot
$backupConfig = Join-Path $appDir "nuxt.config.ts.bak"
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

    Write-Host "Using Node build config as SSR serve."
    $env:PORT = "4000"
    & pnpm.cmd exec nuxi dev --host
    Assert-ExitCode "pnpm exec nuxi dev 失败"
}
catch {
    if ($exitCode -eq 0) {
        $exitCode = 1
    }
    Write-Host $_
}
finally {
    if (Test-Path -LiteralPath $backupConfig) {
        Move-Item -LiteralPath $backupConfig -Destination (Join-Path $appDir "nuxt.config.ts") -Force
    }
}

exit $exitCode
