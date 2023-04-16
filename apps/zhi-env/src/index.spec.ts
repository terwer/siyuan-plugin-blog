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

import { describe, expect, it } from "vitest"
import Env, { EnvConstants } from "./index"

describe("zhiEnv", () => {
  const NOT_EXIST_KEY = "NOT_EXIST_KEY"

  it("test env", () => {
    const env = new Env(import.meta.env)
    expect(env.getEnv(EnvConstants.NODE_ENV_KEY)).toEqual("test")
  })

  it("test debug mode", () => {
    const env = new Env(import.meta.env)
    expect(env.getEnv(EnvConstants.VITE_DEBUG_MODE_KEY)).toEqual("true")
  })

  it("test getEnv undefined", function () {
    const env = new Env(import.meta.env)

    const val = env.getEnv(NOT_EXIST_KEY)
    console.log("val=>", val)
    expect(val).toBeUndefined()
  })

  it("test getEnv ok", function () {
    const env = new Env(import.meta.env)

    const val = env.getEnv(EnvConstants.VITE_DEBUG_MODE_KEY)
    console.log("val=>", val)
    // expect(val).toBeTruthy()
  })

  it("test getStringEnv", function () {
    const env = new Env(import.meta.env)

    const val = env.getStringEnv(EnvConstants.VITE_DEBUG_MODE_KEY)
    console.log("val=>", val)
    expect(typeof val).toBe("string")
  })

  it("test getBooleanEnv", function () {
    const env = new Env(import.meta.env)

    const val = env.getBooleanEnv(EnvConstants.VITE_DEBUG_MODE_KEY)
    console.log("val=>", val)
    expect(typeof val).toBe("boolean")
  })

  it("test getEnvOrDefault", function () {
    const env = new Env(import.meta.env)

    const val = env.getEnvOrDefault(NOT_EXIST_KEY, "hello")
    console.log("val=>", val)
    expect(typeof val).toBe("string")
  })

  it("test custom env", function () {
    const env = new Env({
      "mykey-a": "myvalue",
    })

    const val = env.getEnv("mykey-a")
    console.log("val=>", val)
    expect(typeof val).toBe("string")
  })
})
