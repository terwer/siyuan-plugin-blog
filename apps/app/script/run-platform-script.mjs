#!/usr/bin/env node
/**
 * 跨平台脚本分派器（apps/app 专用）。
 *
 * 与仓库根的 scripts/run-platform-script.mjs 逻辑相同，但必须放在 apps/app 内部：
 * apps/app 可能被单独部署（有自己的 pnpm-lock.yaml / Dockerfile），不能依赖仓库根目录。
 *
 * pnpm 是唯一入口，例如 `pnpm --filter @terwer/share-pro-app build`。
 * 参数原样透传：
 *   - Windows：执行 `<name>.ps1`，优先 pwsh（PowerShell 7+），退回 powershell.exe（5.1）
 *   - 其它平台：执行 `<name>.sh`，优先 bash，退回 sh
 *
 * 用法：node script/run-platform-script.mjs <name> [args...]
 * 例：  node script/run-platform-script.mjs build --from node
 */
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

const scriptName = process.argv[2];
const scriptArgs = process.argv.slice(3);
if (!scriptName) {
  console.error(
    "[run-platform-script] 缺少脚本名参数，例如：node script/run-platform-script.mjs build --from node"
  );
  process.exit(1);
}

// pnpm 执行 npm script 时的工作目录就是 package.json 所在目录（apps/app）
const cwd = process.cwd();
const scriptBase = path.resolve(cwd, "script", scriptName);
const isWindows = process.platform === "win32";

/**
 * 输出错误并以失败状态退出。
 * @param {string} message
 */
function fail(message) {
  console.error(`[run-platform-script] ${message}`);
  process.exit(1);
}

if (isWindows) {
  const ps1Path = `${scriptBase}.ps1`;
  if (!existsSync(ps1Path)) {
    fail(`未找到 PowerShell 脚本：${ps1Path}`);
  }

  for (const command of ["pwsh.exe", "powershell.exe"]) {
    const probe = spawnSync(
      command,
      ["-NoLogo", "-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", "exit 0"],
      { stdio: "ignore", cwd }
    );
    if (probe.error) {
      continue;
    }

    const result = spawnSync(
      command,
      ["-NoLogo", "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", ps1Path, ...scriptArgs],
      { stdio: "inherit", cwd }
    );
    if (result.error) {
      fail(`执行 ${path.basename(ps1Path)} 失败：${result.error.message}`);
    }
    process.exit(result.status ?? 1);
  }

  fail("未找到可用的 PowerShell，请安装 PowerShell 7+（https://aka.ms/powershell）");
} else {
  const shPath = `${scriptBase}.sh`;
  if (!existsSync(shPath)) {
    fail(`未找到 shell 脚本：${shPath}`);
  }

  for (const shell of ["bash", "sh"]) {
    const probe = spawnSync(shell, ["-c", "exit 0"], { stdio: "ignore", cwd });
    if (probe.error) {
      continue;
    }

    const result = spawnSync(shell, [shPath, ...scriptArgs], { stdio: "inherit", cwd });
    if (result.error) {
      fail(`执行 ${path.basename(shPath)} 失败：${result.error.message}`);
    }
    process.exit(result.status ?? 1);
  }

  fail("未找到可用的 shell（bash/sh）");
}
