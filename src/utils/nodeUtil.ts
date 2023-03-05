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

// 警告⚠️：请勿在非Node环境调用此文件中的任何方法

import cjsUtil from "~/src/utils/cjsUtil"

const fs = cjsUtil.safeRequire("fs")
const path = cjsUtil.safeRequire("path")

/**
 * 可以使用Node.js内置的fs模块中的`copyFileSync`或者`copyFile`方法来复制文件夹。不过需要注意，这两个方法只能复制单个文件，如果想要复制整个文件夹，需要自己编写递归函数实现。
 * 本方法用于复制一个文件夹以及其中所有子文件和子文件夹
 *
 * @param source 源文件
 * @param target 目标文件
 * @author terwer
 * @since 1.0.0
 */
const copyFolderSync = (source: string, target: string): void => {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target)
  }

  if (fs.lstatSync(source).isDirectory()) {
    const files: any[] = fs.readdirSync(source)
    files.forEach(function (file: any) {
      const curSource = path.join(source, file)
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderSync(curSource, path.join(target, file))
      } else {
        fs.copyFileSync(curSource, path.join(target, file))
      }
    })
  }
}

/**
 * 删除文件夹
 *
 * @param folder 文件夹
 */
const rmFolder = (folder: string) => {
  if (fs.existsSync(folder)) {
    // fs.rm(folder, { recursive: true, force: true })
    fs.rmdirSync(folder, { recursive: true })
  }
}

const nodeUtil = {
  copyFolderSync,
  rmFolder,
}

export default nodeUtil
