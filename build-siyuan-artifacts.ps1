#!/usr/bin/env pwsh
# Windows 对应实现：build-siyuan-artifacts.sh
# 只在 Windows 上由 `pnpm buildSiyuanArtifacts` 经 scripts/run-platform-script.mjs 自动调用。
# 与 .sh 一致：没有 set -e，逐条执行，最终退出码取最后一条命令。
$ErrorActionPreference = "Continue"

Set-Location -LiteralPath $PSScriptRoot

$exitCode = 0
try {
    & pnpm.cmd @("build", "-F", "@terwer/share-pro-app", "--force", "--", "--from", "siyuan")
    $exitCode = $LASTEXITCODE
    & pnpm.cmd @("build", "-F", "siyuan-blog", "--force")
    $exitCode = $LASTEXITCODE
}
catch {
    Write-Host $_
    if ($exitCode -eq 0) {
        $exitCode = 1
    }
}

Write-Host "Build all finished."
exit $exitCode
