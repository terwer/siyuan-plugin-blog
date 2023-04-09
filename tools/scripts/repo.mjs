/*
 * Copyright (c) 2023, Terwer . All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Terwer designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Terwer in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Terwer, Shenzhen, Guangdong, China, youweics@163.com
 * or visit www.terwer.space if you need additional information or have any
 * questions.
 */

import pkg from "@nrwl/devkit"
import chalk from "chalk"
import { existsSync } from "fs"
import path from "path"
import { execSync } from "child_process"

// nx repo zhi-server-modules-blog-astro --to ../zhi-blog-astro

const { readCachedProjectGraph } = pkg

function invariant(condition, message) {
    if (!condition) {
        console.error(chalk.bold.red(message))
        process.exit(1)
    }
}

// Executing publish script: node path/to/repo.mjs {name} --to {to}
// Default "tag" to "next" so we won't publish the "latest" tag by accident.
const [, , name, to] = process.argv
const absTo = path.resolve(path.dirname("."), to)
console.log("asbTo=>", absTo)
invariant(
    to && existsSync(absTo),
    `To path is not found, expected: absolution path, got ${absTo}.`
)

const graph = readCachedProjectGraph()
const project = graph.nodes[name]

invariant(project, `Could not find project "${name}" in the workspace. Is the project.json configured correctly?`)

// 拷贝项目文件到临时目录
try {
    // 目录检测
    // const toPath = `./repo/projects/${name}`
    const toPath = absTo
    execSync(`mkdir -p ${toPath}`)
    execSync(`mkdir -p ${toPath}/packages/${name}`)

    // 拷贝文件
    execSync(`rsync -av --delete --exclude='package.json' --exclude='README_zh_CN.md' --exclude='README.md' --exclude='tools/venv' --exclude='.git' --exclude='tsconfig.base.json' --exclude='packages' --exclude='.github' --exclude-from='.gitignore' . ${toPath}`)
    execSync(`rsync -av --delete --exclude='package.json' --exclude='README_zh_CN.md' --exclude='README.md' --exclude='tools/venv' --exclude='.git' --exclude='tsconfig.base.json' --exclude='packages' --exclude='.github' --exclude-from='.gitignore' ./packages/${name} ${toPath}/packages`)

    // 切换到目标目录
    process.chdir(absTo)

    // 添加文件到git
    execSync(`git add -A`)

    console.log("make a single repo finished.")
} catch (e) {
    console.error(chalk.bold.red(`Error copying project file from nx workspace.`))
}
