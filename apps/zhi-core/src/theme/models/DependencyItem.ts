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

import { BasePathTypeEnum, DeviceTypeEnum } from "zhi-device"

/**
 * 依赖项类型定义
 *
 * @public
 * @author terwer
 * @version 0.1.0
 * @since 0.1.0
 */
class DependencyItem {
  /**
   * 依赖库相对路径
   */
  libpath: string
  baseType: BasePathTypeEnum
  /**
   * 格式
   */
  format: "cjs" | "esm" | "js"
  /**
   * 引入方式
   */
  importType: "require" | "import"
  /**
   * 支持的设备列表
   */
  runAs: DeviceTypeEnum[]
  /**
   * 加载属性，数组越越靠前
   */
  order: number

  constructor() {
    this.libpath = ""
    this.baseType = BasePathTypeEnum.BasePathType_ZhiTheme
    this.format = "cjs"
    this.importType = "require"
    this.runAs = [DeviceTypeEnum.DeviceType_Siyuan_MainWin, DeviceTypeEnum.DeviceType_Node]
    this.order = 0
  }

  /**
   * 将 json 转换为 DependencyItem
   * @param jsonObj
   */
  public fromJson(jsonObj: any) {
    // 从一个 JSON 对象中读取 libpath 属性并赋值给实例的 libpath 属性
    this.libpath = jsonObj.libpath

    // 读取并赋值 baseType 属性
    if ("baseType" in jsonObj) {
      this.baseType = jsonObj.baseType
    }

    // 读取并赋值 format 属性
    if ("format" in jsonObj) {
      this.format = jsonObj.format
    }

    // 读取并赋值 importType 属性
    if ("importType" in jsonObj) {
      this.importType = jsonObj.importType
    }

    // 读取并赋值 runAs 属性
    if ("runAs" in jsonObj) {
      if (Array.isArray(jsonObj.runAs)) {
        // 将字符串数组转换为 DeviceTypeEnum[] 类型
        this.runAs = jsonObj.runAs.map((item: string): DeviceTypeEnum => {
          // 使用类型断言和类型检查，将字符串转换为 DeviceTypeEnum 类型
          if (Object.values(DeviceTypeEnum).includes(item as DeviceTypeEnum)) {
            return item as DeviceTypeEnum
          } else {
            throw new Error(`fromJson: "${item}" is not a valid 'DeviceTypeEnum' value.`)
          }
        })
      } else {
        throw new Error(`fromJson: "runAs" is not an array.`)
      }
    }

    // 读取并赋值 order 属性
    if ("order" in jsonObj) {
      this.order = jsonObj.order
    }
  }
}

export default DependencyItem
