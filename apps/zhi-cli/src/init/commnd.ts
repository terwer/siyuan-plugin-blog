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

import { Command } from "commander"
import { printVerboseHook } from "../utils"
import LogFactory, { crossChalk, LogLevelEnum } from "zhi-log"
import fs from "fs-extra"
import path from "path"
import { downloadTemplate } from "./download"
import modifyFiles from "./modify"
import { prompt } from "enquirer"
import Select from "enquirer/lib/prompts/select"

const logger = LogFactory.customLogFactory(LogLevelEnum.LOG_LEVEL_INFO, "zhi-cli").getLogger("init")
const templateGitUrl = "https://github.com/terwer/zhi-ts-template"

export const initCommand = () => {
  const command = new Command("init")

  command
    .description("init a zhi project")
    .argument("<name>", "the name for your new project")
    .argument("[branch]", "the branch for template repo, current support ts-cli")
    .option("--verbose", "output debug logs", false)
    .option("--target <name>", "the target name", "node")
    .hook("preAction", printVerboseHook)
    .action(async (name, branch, options) => {
      // 没有指定仓库才去选择
      if (!branch) {
        const templatePrompt = new Select({
          name: "template",
          message: "What template you want to use?",
          choices: ["ts-esbuild-lib", "ts-vite-lib"],
        })
        branch = await templatePrompt.run()
      }

      logger.info(`zhi-cli is running at ${options.target}`)
      logger.info("start init zhi project:", name)
      logger.info("using template:", branch)

      const description = "please input project description"
      const author = "please input author"
      const projectOptions = await prompt([
        {
          type: "input",
          name: "description",
          message: description,
        },
        {
          type: "input",
          name: "author",
          message: author,
        },
      ])

      logger.info("projectOptions=>", projectOptions)

      try {
        const downloadPath = `./${name}`

        // 如果存在需要先删除，否则无法检出
        if (fs.existsSync(downloadPath)) {
          fs.removeSync(downloadPath)
        }

        // 下载仓库并替换参数
        await downloadTemplate(templateGitUrl, downloadPath, branch)
        modifyFiles(downloadPath, ["package.json", "README.md", "src/index.spec.ts"], { name, ...projectOptions })

        // 删除git信息
        fs.removeSync(path.join(downloadPath, ".git"))
        logger.info(".git cleaned.")

        logger.info("project created.")
        const cdText = crossChalk.yellow(`cd ${downloadPath}`)
        const installText = crossChalk.green(`pnpm install`)
        logger.info(`Now you can do ${cdText} and run ${installText}`)
      } catch (error) {
        console.error(error)
      }

      logger.info("done")
    })
  return command
}
