#!/usr/bin/env pwsh
# Windows 对应实现：script/build.sh
# 只在 Windows 上由 `pnpm build ... -- --from node` 经 script/run-platform-script.mjs 自动调用。
# 与 .sh 逐条等价：解析 -f/--from，再转交对应的目标脚本。
# 注意：原 .sh 没有 set -e，但 case 分支是最后一条语句，失败退出码会自然传递。
$ErrorActionPreference = "Continue"

function Show-Usage {
    Write-Host "Usage: script/build.sh -f|--from [vercel|node|cloudflare|siyuan]"
    exit 1
}

$fromValue = ""
$index = 0
while ($index -lt $args.Count) {
    $arg = [string]$args[$index]
    if ($arg -eq "-f" -or $arg -eq "--from") {
        if ($index + 1 -lt $args.Count) {
            $fromValue = [string]$args[$index + 1]
        }
        $index += 2
        continue
    }
    if ($arg.StartsWith("-")) {
        Write-Host "Unknown option: $arg"
        Show-Usage
    }
    Write-Host "Unexpected argument: $arg"
    Show-Usage
}

if ([string]::IsNullOrEmpty($fromValue)) {
    Write-Host "Error: -f|--from parameter is required."
    Show-Usage
}

$targetScript = switch ($fromValue) {
    "vercel" { "vercel.ps1" }
    "node" { "node.ps1" }
    "cloudflare" { "cloudflare.ps1" }
    "siyuan" { "siyuan.ps1" }
    default { $null }
}

if ($null -eq $targetScript) {
    Write-Host "Error: Invalid value for -f|--from: $fromValue"
    Show-Usage
}

& (Join-Path $PSScriptRoot $targetScript)
exit $LASTEXITCODE
