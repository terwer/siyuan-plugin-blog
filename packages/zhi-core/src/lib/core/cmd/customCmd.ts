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

// import child_process from "child_process";
//
// const { exec } = require('child_process');
//
// function runCommand(command) {
//     return new Promise((resolve, reject) => {
//         exec(command, (error, stdout, stderr) => {
//             if (error) {
//                 reject(error);
//             } else {
//                 resolve(stdout.trim());
//             }
//         });
//     });
// }
//
// // 调用示例：执行 ls 命令，并输出其结果
// runCommand('/Users/terwer/Downloads/n/node_modules/.bin/next -v').then((result) => {
//     console.log(result);
// }).catch((error) => {
//     console.error(error);
// });
//
// class CustomCmd {
//  init(){
//      const { spawn } = require('child_process');
//      const path = require('path');
//
//      async function executeCommand(command, args = [], options = {}) {
//          return new Promise((resolve, reject) => {
//              const childProcess = spawn(command, args, options);
//
//              let stdout = '';
//              let stderr = '';
//
//              childProcess.stdout.on('data', (data) => {
//                  stdout += data.toString();
//              });
//
//              childProcess.stderr.on('data', (data) => {
//                  stderr += data.toString();
//              });
//
//              childProcess.on('close', (code) => {
//                  if (code === 0) {
//                      resolve(stdout);
//                  } else {
//                      reject(new Error(stderr));
//                  }
//              });
//
//              childProcess.on('error', (error) => {
//                  reject(error);
//              });
//          });
//      }
//
//      const baseDir = "/Users/terwer/Downloads/n"
//      const pathToBinary = path.join(baseDir, "node_modules", ".bin", "next")
//      const args = ['-v'];
//      const options = {
//          env: {
//              ELECTRON_RUN_AS_NODE: 1,
//          },
//      };
//
//      executeCommand(pathToBinary, args, options)
//          .then((stdout) => {
//              console.log(`Command output: ${stdout}`);
//          })
//          .catch((error) => {
//              console.error(`Command failed: ${error.message}`);
//          });
//  }
// }


