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

const path = require("path")
const minimist = require("minimist")
const { dtsPlugin } = require("esbuild-plugin-d.ts")
const { copy } = require("esbuild-plugin-copy")

const args = minimist(process.argv.slice(2))
const isWatch = args.watch || args.w

// for outer custom output for dev
const baseDir = isWatch
  ? "/Users/terwer/Documents/mydocs/SiYuanWorkspace/public/conf/appearance/themes/zhi/server/cmd"
  : "./"
const distDir = isWatch ? baseDir : path.join(baseDir, "dist")

/**
 * 构建配置
 */
module.exports = {
  esbuildConfig: {
    entryPoints: ["src/index.ts"],
    outfile: path.join(distDir, "index.js"),
    format: "esm",
    plugins: [
      dtsPlugin(),
      copy({
        // this is equal to process.cwd(), which means we use cwd path as base path to resolve `to` path
        // if not specified, this plugin uses ESBuild.build outdir/outfile options as base path.
        resolveFrom: "cwd",
        assets: [
          // copy folder
          {
            from: "./public/**/*",
            to: [distDir],
          },
          // copy one file
          {
            from: ["./README.md"],
            to: [path.join(distDir, "/README.md")],
          },
        ],
        watch: true,
      }),
    ],
  },
}
