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

import dotenv from "dotenv"

const loadDotenv = () => {
  // try to use dotenv to load in custom local env vars to existing node runtime env vars:
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env.production"
  console.log(`loading env variables from ${envFile}`)
  dotenv.config({ path: envFile })
}

/**
 * 获取环境变量，仅构建工具使用
 *
 * @author terwer
 * @version 0.1.0
 * @since 0.1.0
 */
export const getNormalizedEnvDefines = (prefixes?: string[]): any => {
  // load dotenv
  loadDotenv()

  // collect env
  const envs = {
    ...import.meta.env,
  } as any
  for (let k in process.env) {
    k = k.replace(/ /g, "") // hack for now.

    // Bypass Windows errors
    if (k === "CommonProgramFiles(x86)" || k === "ProgramFiles(x86)") {
      continue
    }

    if (k.includes("NODE_PATH")) {
      continue
    }

    if (prefixes && !prefixes.some((prefix) => k.startsWith(prefix))) {
      continue
    }

    envs[`${k}`] = `${process.env[k]}`
  }

  return envs
}
