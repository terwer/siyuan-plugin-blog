#!/usr/bin/env pwsh
# Windows 对应实现：script/cloudflare.sh
# 只在 Windows 上由 `pnpm cloudflareBuild` 经 script/run-platform-script.mjs 自动调用。
# 与 .sh 逐条等价：备份配置 -> 切换 cloudflare 配置 -> nuxi build -> 恢复配置。
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
    Copy-Item -LiteralPath "./nuxt.cloudflare.config.ts" -Destination "./nuxt.config.ts" -Force

    Write-Host "Using Cloudflare build config as SSR build."
    & pnpm.cmd exec nuxi build
    Assert-ExitCode "pnpm exec nuxi build 失败"
    Write-Host "Nuxt build for cloudflare finished."
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
