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

import gitclone from "git-clone/promise"
import LogFactory, { LogLevelEnum } from "zhi-log"

const logger = LogFactory.customLogFactory(LogLevelEnum.LOG_LEVEL_INFO, "zhi-cli").getLogger("init:download")

export const downloadTemplate = (templateGitUrl: string, downloadPath: string, branch: string) => {
  logger.info("download template")
  return new Promise((resolve, reject) => {
    logger.info("prepare to checkout templateGitUrl=>", templateGitUrl)
    logger.info("prepare to checkout downloadPath=>", downloadPath)
    logger.info("prepare to checkout branch=>", branch)
    logger.info("start download template ...")

    gitclone(templateGitUrl, downloadPath, {
      checkout: branch,
      shallow: false,
    })
      .then((r: any) => {
        logger.info("download success")
        resolve("download success")
      })
      .catch((error: any) => {
        logger.error("download fail")
        reject(error)
      })
  })
}
