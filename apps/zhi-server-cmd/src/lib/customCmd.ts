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

import ZhiServerCmdUtil from "./util/ZhiServerCmdUtil"
import { SiyuanDevice } from "zhi-device"

class CustomCmd {
  private readonly logger
  private readonly common

  constructor() {
    this.logger = ZhiServerCmdUtil.zhiLog("custom-cmd")
    this.common = ZhiServerCmdUtil.zhiCommon()
  }

  /**
   * 使用 Electron 自带的 node 运行命令
   *
   * 示例：
   * ```
   * await customCmd.executeCommandWithBundledNode("./node_modules/.bin/next", ["-v"], { cwd: "/Users/terwer/Downloads/n", silent: true })
   * ```
   *
   * @param command - 命令
   * @param args - 参数
   * @param options - 选项
   */
  async executeCommandWithBundledNode(
    command: string,
    args?: string[],
    options?: any
  ): Promise<{ output: string; error: string }> {
    const { fork } = SiyuanDevice.requireLib("child_process")

    return new Promise((resolve, reject) => {
      const child = fork(command, args ?? [], options)
      let output = "" // 保存输出结果的变量
      let error = "" // 保存错误信息的变量

      // 获取子进程的标准输出流
      child.stdout &&
        child.stdout.on("data", function (data: string) {
          output += data.toString()
        })

      // 获取子进程的标准错误流
      child.stderr &&
        child.stderr.on("data", function (data: string) {
          error += data.toString()
        })

      // 监听子进程的关闭事件，捕获结果并返回一个对象
      child.on("close", (code: number) => {
        if (code === 0) {
          resolve({ output: output.trim(), error: error.trim() }) // 去除字符串两侧的空白字符并返回
        } else {
          reject(new Error(`Child process closed with code ${code} => ${error}`))
        }
      })

      // 监听子进程的异常退出事件，并通过reject方法抛出错误对象
      child.on("exit", (code: number) => {
        reject(new Error(`Child process exited with code ${code} => ${error}`))
      })
    })
  }

  /**
   * 自定义执行系统命令
   *
   * 示例：
   * ```
   * await customCmd.executeCommand("./node_modules/.bin/nuxt", ["preview"], { shell: true, cwd: '/Users/terwer/Downloads/nu' })
   * await customCmd.executeCommand("node", ["./server/index.mjs"], { cwd: '/Users/terwer/Downloads/nu' })
   * ```
   *
   * @param command - 命令
   * @param args - 参数
   * @param options - 选项
   */
  public async executeCommand(command: string, args: string[], options = {}) {
    const { exec } = SiyuanDevice.requireLib("child_process")
    const fullCommand = `${command} ${args.join(" ")}`
    return new Promise((resolve, reject) => {
      exec(fullCommand, options, (err: any, stdout: any) => {
        if (err) {
          reject(err)
        } else {
          resolve(stdout.trim())
        }
      })
    })
  }

  /**
   * 自定义执行系统命令
   *
   * 示例：
   * ```
   * await customCmd.executeCommand("./node_modules/.bin/nuxt", ["preview"], { shell: true, cwd: '/Users/terwer/Downloads/nu' })
   * await customCmd.executeCommand("node", ["./server/index.mjs"], { cwd: '/Users/terwer/Downloads/nu' })
   * ```
   *
   * @param command - 命令
   * @param args - 参数
   * @param options - 选项
   */
  public async executeCommandWithSpawn(command: string, args?: string[], options = {}) {
    const { spawn } = SiyuanDevice.requireLib("child_process")
    return new Promise((resolve, reject) => {
      const child = spawn(command, args, options)
      let output = "" // 保存输出结果的变量
      let error = "" // 保存错误信息的变量

      // 监听子进程的 stdout、stderr 输出
      child.stdout.on("data", (data: any) => {
        output += data.toString()
      })
      child.stderr.on("data", (data: any) => {
        error += data.toString()
      })

      // 监听子进程的退出事件
      child.on("close", (code: number) => {
        if (code === 0) {
          resolve(output)
        } else {
          const errorMsg = `Command "${command}" failed with exit code ${code}. ${error}`
          reject(new Error(errorMsg))
        }
      })
    })
  }

  /**
   * 获取系统的 Node 版本
   */
  public async getSystemNodeVersion() {
    return await this.executeCommand("node", ["-v"], { shell: true })
  }

  /**
   * 获取 Electron 的 Node 版本
   */
  public async getElectronNodeVersion() {
    return SiyuanDevice.siyuanWindow().process.versions.node
  }
}

export default CustomCmd
