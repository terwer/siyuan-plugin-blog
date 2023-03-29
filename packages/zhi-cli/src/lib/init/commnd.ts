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

import * as fs from "fs"
import { Command } from "commander"
import { printVerboseHook, rootDebug } from "../utils"
import * as process from "process"

// remember to name the folder of this file as the command name

const debug = rootDebug.extend("init")
const debugError = rootDebug.extend("init:error")

export const initCommand = () => {
  const command = new Command("init")
  command
    .argument("[path]", "directory to do something with")
    .option("--verbose", "output debug logs", false)
    .option("--target <name>", "the target name", "node")
    // .requiredOption('--includeDirectories', 'copy directories')
    .hook("preAction", printVerboseHook)
    .action(async (path, options) => {
      if (path && !fs.existsSync(path)) {
        debugError("invalid path provided")
        process.exit(1)
      }

      debug(`Zhi-cli is executing now....`)
    })
  return command
}
