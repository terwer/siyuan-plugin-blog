#!/usr/bin/env pwsh
# Windows 对应实现：build-node-provider.sh
# 只在 Windows 上由 `pnpm buildNodeProvider` 经 scripts/run-platform-script.mjs 自动调用。
# 与 .sh 逐条等价：rm -rf dist；mkdir -p dist/node；pnpm build -F @terwer/share-pro-app --force -- --from node
# 注意：原 .sh 没有 set -e，构建失败也不会中止、最终退出码来自末尾 echo；这里保持同样行为。
$ErrorActionPreference = "Continue"

Set-Location -LiteralPath $PSScriptRoot

if (Test-Path -LiteralPath "./dist") {
    Remove-Item -LiteralPath "./dist" -Recurse -Force
}
New-Item -ItemType Directory -Force -Path "./dist/node" | Out-Null

# 用 pnpm.cmd 而不是 pnpm：PowerShell 里 `pnpm` 会命中 pnpm.ps1，可能被 ExecutionPolicy 拦截。
# 参数用数组 splatting 传递，保证 `--` 和 `@terwer/...` 原样到达 pnpm，不被 PowerShell 改写。
$pnpmArgs = @("build", "-F", "@terwer/share-pro-app", "--force", "--", "--from", "node")
try {
    & pnpm.cmd @pnpmArgs
}
catch {
    Write-Host $_
}

Write-Host "Build node provider finished."
