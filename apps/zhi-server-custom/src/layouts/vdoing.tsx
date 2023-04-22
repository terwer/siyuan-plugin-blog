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

import React from "react"

// 主题样式注入入口
import "../assets/vdoing/fonts/webfont.css"
import "../assets/vdoing/styles/index.styl"
// 布局样式
import "./vdoing.styl"
import Navbar from "../components/vdoing/Navbar"

type VdoingLayoutProps = {
  header: React.ReactNode
  main: React.ReactNode
  footer: React.ReactNode
  props?: Record<string, any>
}

/**
 * Vdoing 布局
 *
 * @param header - 头部
 * @param main - 正文
 * @param footer - 底部
 * @param props - 参数
 * @author terwer
 * @version 1.0.0
 * @since 1.0.0
 * @constructor
 */
const VdoingLayout: React.FC<VdoingLayoutProps> = ({ header, main, footer, props }) => {
  return (
    <div className={"theme-container"}>
      <header>
        <Navbar />
        <div className={"head-placeholder"}></div>
        {header}
      </header>
      <main className={"content-main"}>{main}</main>
      <footer>
        <h1>This is the footer</h1>
        {footer}
      </footer>
    </div>
  )
}

export default VdoingLayout
