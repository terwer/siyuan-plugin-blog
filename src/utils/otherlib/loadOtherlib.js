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
 * 获取数据目录
 *
 * @author terwer
 * @since 0.0.1
 */
export const getSiyuanDataDir = () => {
  return window.siyuan.config.system.dataDir
}

/**
 * 获取数据目录
 *
 * @author terwer
 * @since 0.0.1
 */
export const getSiyuanConfDir = () => {
  return window.siyuan.config.system.confDir
}

/**
 * 获取zhi主题构建路径目录
 *
 * @author terwer
 * @since 0.0.1
 */
export const getZhiDir = () => {
  return `${getSiyuanConfDir()}/appearance/themes/zhi/dist-cjs`
}

/**
 * 获取构建后的otherlib目录
 *
 * @author terwer
 * @since 0.0.1
 */
export const getOtherlibDir = () => {
  return `${getZhiDir()}/lib`
}

/**
 * 引入otherlib依赖
 *
 * @param entryName 运行模式名称
 * @param libfile 依赖名称，otherlib下面
 * @param alias 依赖别名
 * @author terwer
 * @since 0.0.1
 */
const requireOtherlib = (entryName, libfile, alias) => {
  const path = window.require("path")
  const libpath = path.join(getOtherlibDir(), libfile)
  return window.require(libpath)
}

// -------------------------------------------------------------------------

/**
 * 加载插件系统
 *
 * @author terwer
 * @since 0.0.1
 */
const loadPluginSystemScript = () => {
  const pluginSystem = requireOtherlib(
    "zhi",
    "plugin/plugin-system/index.js",
    "插件系统"
  )
  return pluginSystem.initPluginSystem()
}

/**
 * 加载发布工具
 *
 * @author terwer
 * @since 0.0.1
 */
const loadPostPublisherScript = () => {
  const postPublisher = requireOtherlib(
    "zhi",
    "widgets/sy-post-publisher/index.js",
    "发布工具"
  )
  return postPublisher.initPostPublisher()
}

/**
 * 加载图片透明库
 *
 * @author terwer
 * @since 0.0.1
 */
const loadTranslucifyScript = () => {
  const translucify = requireOtherlib(
    "zhi",
    "vendor/translucify/index.js",
    "图片透明类库"
  )
  return translucify.initTranslucify()
}

/**
 * 加载挂件
 *
 * @author terwer
 * @since 0.0.1
 */
const loadWidgetsScript = () => {
  return loadPostPublisherScript()
}

/**
 * 加载挂件
 *
 * @author terwer
 * @since 0.0.1
 */
const loadVendorsScript = () => {
  return loadTranslucifyScript()
}

const loadOtherlib = {
  loadPluginSystemScript,
  loadWidgetsScript,
  loadVendorsScript,
}

export default loadOtherlib
