#!/usr/bin/env node
/**
 * Python 脚本跨平台启动器。
 *
 * 仓库里的打包/版本脚本是 Python 实现，但不同平台的可执行文件名不同：
 *   - Windows：优先 `python`（与原命令一致），不可用时回退 `py -3`、`python3`
 *   - 其它平台：优先 `python`，不可用时回退 `python3`
 *
 * 用法：node scripts/run-python.mjs <script.py> [args...]
 * 例：  node scripts/run-python.mjs scripts/package.py
 */
import { spawnSync } from "node:child_process";

const scriptPath = process.argv[2];
const scriptArgs = process.argv.slice(3);
if (!scriptPath) {
  console.error("[run-python] 缺少 Python 脚本路径，例如：node scripts/run-python.mjs scripts/package.py");
  process.exit(1);
}

const isWindows = process.platform === "win32";

/**
 * 探测顺序说明：
 * 原来 pnpm 脚本直接写 `python`，所以优先保留 `python`，避免换到行为不同的解释器；
 * 只有在 `python` 不可用时才回退到 Windows 启动器 `py -3` 或 `python3`。
 *
 * @type {Array<[string, string[]]>}
 */
const candidates = isWindows
  ? [
      ["python", []],
      ["py", ["-3"]],
      ["python3", []],
    ]
  : [
      ["python", []],
      ["python3", []],
    ];

for (const [command, prefix] of candidates) {
  const probe = spawnSync(command, [...prefix, "--version"], { stdio: "ignore" });
  if (probe.error || probe.status !== 0) {
    continue;
  }

  const result = spawnSync(command, [...prefix, scriptPath, ...scriptArgs], {
    stdio: "inherit",
  });
  if (result.error) {
    console.error(`[run-python] 执行 ${scriptPath} 失败：${result.error.message}`);
    process.exit(1);
  }
  process.exit(result.status ?? 1);
}

console.error("[run-python] 未找到可用的 Python 3，请安装后再试");
process.exit(1);
