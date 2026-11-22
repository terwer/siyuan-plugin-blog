#!/usr/bin/env pwsh
# Windows 对应实现：script/siyuan.sh
# 只在 Windows 上由 `pnpm build ... -- --from siyuan` 经 script/build.ps1 分派调用。
# 与 .sh 逐条等价：备份配置 -> 切换 siyuan 配置 -> nuxi generate -> rsync --delete 同步 public -> 恢复配置。
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

# 等价 `rsync -av --delete <src>/ <dest>`：先清空目标，再复制源内容（含空目录与隐藏文件）
function Sync-Directory([string]$Source, [string]$Destination) {
    if (Test-Path -LiteralPath $Destination) {
        Get-ChildItem -LiteralPath $Destination -Force | Remove-Item -Recurse -Force
    }
    else {
        New-Item -ItemType Directory -Force -Path $Destination | Out-Null
    }
    Get-ChildItem -LiteralPath $Source -Force | Copy-Item -Destination $Destination -Recurse -Force
}

try {
    Set-Location -LiteralPath $appDir
    Copy-Item -LiteralPath "./nuxt.config.ts" -Destination $backupConfig -Force
    Copy-Item -LiteralPath "./nuxt.siyuan.config.ts" -Destination "./nuxt.config.ts" -Force

    Write-Host "Using Siyuan build config as free SPA build. AI assistant is disabled in this target."
    & pnpm.cmd exec nuxi generate
    Assert-ExitCode "pnpm exec nuxi generate 失败"
    Write-Host "Nuxt build for siyuan finished."

    New-Item -ItemType Directory -Force -Path "../../dist/siyuan/app" | Out-Null
    Sync-Directory -Source "./.output/public" -Destination "../../dist/siyuan/app"

    Write-Host "Resources are copied."
    Write-Host "Siyuan build finished."
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
