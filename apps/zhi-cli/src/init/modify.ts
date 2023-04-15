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

import fs from "fs-extra"
import path from "path"
import handlebars from "handlebars"
import LogFactory, { LogLevelEnum } from "zhi-log"

const logger = LogFactory.customLogFactory(LogLevelEnum.LOG_LEVEL_INFO, "zhi-cli").getLogger("init:modify")

const modifyTemplate = function (downloadPath: string, file: string, options: any) {
  const templatePath = path.join(downloadPath, file)
  logger.info(`start modifying ${file} ...`)
  if (fs.existsSync(templatePath)) {
    const content = fs.readFileSync(templatePath).toString()
    const template = handlebars.compile(content)

    const result = template(options)
    fs.writeFileSync(templatePath, result)
    logger.info(`modify ${file} complete`)
  } else {
    logger.error(`modify ${file} fail`)
    throw new Error(`no ${file}`)
  }
}

/**
 * 模板字符串替换
 *
 * @param downloadPath - 项目根路径
 * @param fileList - 文件路径列表，注意：相对于项目根路径，例如：["package.json", "README.md"]
 * @param options - 字符串Object
 */
const modifyFiles = (downloadPath: string, fileList: string[], options: any) => {
  for (const file of fileList) {
    modifyTemplate(downloadPath, file, options)
  }
}

export default modifyFiles
