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

import { describe, expect } from "vitest"
import SiyuanKernelApi from "./siyuanKernelApi"
import Env from "zhi-env"
import SiyuanConfig from "./siyuanConfig"

describe("SiyuanKernelApi", () => {
  it("constructor", function () {
    const env = new Env(import.meta.env)
    const kernelApi = new SiyuanKernelApi(env)
    expect(kernelApi).toBeTruthy()
  })

  it("sql using .env", async () => {
    const env = new Env(import.meta.env)
    const kernelApi = new SiyuanKernelApi(env)
    const result = await kernelApi.sql("select 1 from blocks limit 1")
    console.log("result=>", result)
  })

  it("sql using siyuanConfig", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const kernelApi = new SiyuanKernelApi(siyuanConfig)
    const result = await kernelApi.sql("select 1 from blocks limit 1")
    console.log("result=>", result)
  })

  it("getRootBlocksCount", async () => {
    const env = new Env(import.meta.env)
    const kernelApi = new SiyuanKernelApi(env)
    const result = await kernelApi.getRootBlocksCount("")
    console.log("result=>", result)
  })

  it("lsNotebooks", async () => {
    const env = new Env(import.meta.env)
    const kernelApi = new SiyuanKernelApi(env)
    const result = await kernelApi.lsNotebooks()
    console.log("result=>", result)
  })

  it("openNotebook", async () => {
    const env = new Env(import.meta.env)
    const kernelApi = new SiyuanKernelApi(env)
    const result = await kernelApi.openNotebook("20220718062546-2nbmy21")
    console.log("result=>", result)
  })

  it("closeNotebook", async () => {
    const env = new Env(import.meta.env)
    const kernelApi = new SiyuanKernelApi(env)
    const result = await kernelApi.closeNotebook("20220718062546-2nbmy21")
    console.log("result=>", result)
  })

  it("renameNotebook", async () => {
    const env = new Env(import.meta.env)
    const kernelApi = new SiyuanKernelApi(env)
    const result = await kernelApi.renameNotebook("20220621105123-dlyn6nl", "临时文档")
    console.log("result=>", result)
  })

  it("createNotebook", async () => {
    const env = new Env(import.meta.env)
    const kernelApi = new SiyuanKernelApi(env)
    const result = await kernelApi.createNotebook("临时文档3")
    console.log("result=>", result)
  })

  it("removeNotebook", async () => {
    const env = new Env(import.meta.env)
    const kernelApi = new SiyuanKernelApi(env)
    const result = await kernelApi.removeNotebook("20230401225851-4zgh677")
    console.log("result=>", result)
  })

  it("getNotebookConf", async () => {
    const env = new Env(import.meta.env)
    const kernelApi = new SiyuanKernelApi(env)
    const result = await kernelApi.getNotebookConf("20220621105123-dlyn6nl")
    console.log("result=>", result)
  })

  it("setNotebookConf", async () => {
    const env = new Env(import.meta.env)
    const kernelApi = new SiyuanKernelApi(env)
    const result = await kernelApi.setNotebookConf({
      notebook: "20220621105123-dlyn6nl",
      conf: {
        name: "测试笔记本",
        closed: false,
        refCreateSavePath: "",
        createDocNameTemplate: "",
        dailyNoteSavePath: '/daily note/{{now | date "2006/01"}}/{{now | date "2006-01-02"}}',
        dailyNoteTemplatePath: "",
      },
    })
    console.log("result=>", result)
  })

  it("pushMsg", async () => {
    const env = new Env(import.meta.env)
    const kernelApi = new SiyuanKernelApi(env)
    const result = await kernelApi.pushMsg({
      msg: "测试消息",
    })
    console.log("result=>", result)
  })

  it("pushErrMsg", async () => {
    const env = new Env(import.meta.env)
    const kernelApi = new SiyuanKernelApi(env)
    const result = await kernelApi.pushErrMsg({
      msg: "测试错误消息",
    })
    console.log("result=>", result)
  })

  it("getRootBlocks", async () => {
    const env = new Env(import.meta.env)
    const kernelApi = new SiyuanKernelApi(env)
    const result = await kernelApi.getRootBlocks(0, 10, "")
    console.log("result=>", result)
  })
})
