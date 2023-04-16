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

import JsonUtil from "./jsonUtil"
import { getNormalizedEnvDefines } from "../../../../packages/esbuild-config-custom/esmUtils"

describe("JsonUtil", () => {
  let jsonUtil: JsonUtil

  beforeEach(() => {
    jsonUtil = new JsonUtil()

    getNormalizedEnvDefines(["NODE", "VITE_"])
  })

  describe("validateJson", () => {
    it("should return true when validating valid JSON data against a valid JSON schema", () => {
      const jsonSchema = {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          age: {
            type: "number",
          },
        },
        required: ["name", "age"],
      }
      const jsonData = {
        name: "John Doe",
        age: 30,
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const result = jsonUtil.validateJson(jsonSchema, jsonData)
      expect(result).toBe(true)
    })

    it("should return false when validating invalid JSON data against a valid JSON schema", () => {
      const jsonSchema = {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          age: {
            type: "number",
          },
        },
        required: ["name", "age"],
      }
      const jsonData = {
        name: "John Doe",
        age: "30", // age should be a number, not a string
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const result = jsonUtil.validateJson(jsonSchema, jsonData)
      expect(result).toBe(false)
    })
  })

  describe("validateObjectSchema", () => {
    it("should return true when validating a valid data object against a valid schema object", () => {
      const schemaObject = {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          age: {
            type: "number",
          },
        },
        required: ["name", "age"],
      }
      const dataObject = {
        name: "John Doe",
        age: 30,
      }
      const result = jsonUtil.validateObjectSchema(schemaObject, dataObject)
      expect(result).toBe(true)
    })

    it("should return false when validating an invalid data object against a valid schema object", () => {
      const schemaObject = {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          age: {
            type: "number",
          },
        },
        required: ["name", "age"],
      }
      const dataObject = {
        name: "John Doe",
        age: "30", // age should be a number, not a string
      }
      const result = jsonUtil.validateObjectSchema(schemaObject, dataObject)
      expect(result).toBe(false)
    })
  })
})
