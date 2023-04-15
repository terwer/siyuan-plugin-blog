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

/**
 * 设备类型枚举
 *
 * @public
 * @author terwer
 * @since 1.0.8
 */
enum DeviceTypeEnum {
  /**
   * 移动端
   */
  DeviceType_Mobile_Device = "Mobile",

  /**
   * 思源笔记挂件
   */
  DeviceType_Siyuan_Widget = "Siyuan_Widget",

  /**
   * 思源笔记新窗口
   */
  DeviceType_Siyuan_NewWin = "Siyuan_NewWindow",

  /**
   * 思源笔记主窗口
   */
  DeviceType_Siyuan_MainWin = "Siyuan_MainWindow",

  /**
   * 思源打开的浏览器
   */
  DeviceType_Siyuan_Browser = "Siyuan_Browser",

  /**
   * Google Chrome浏览器插件
   */
  DeviceType_Chrome_Extension = "Chrome_Extension",

  /**
   * Google Chrome浏览器（Docker浏览器共用）
   */
  DeviceType_Chrome_Browser = "Chrome_Browser",

  /**
   * Node环境
   */
  DeviceType_Node = "Node",
}

export default DeviceTypeEnum
