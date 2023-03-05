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
 * 获取环境变量，未定义返回空
 *
 * @param key key
 * @author terwer
 * @since 1.0.0
 */
const getEnv = (key: string): string => {
  let env = ""
  try {
    env = import.meta.env[key] ?? ""
  } catch (e: any) {}
  return env
}

/**
 * 获取环境变量，如果未定义或者为空值，用指定的默认值代替
 *
 * @param key key
 * @param defaultValue 默认值
 * @author terwer
 * @since 0.1.0
 */
export const getEnvOrDefault = (key: string, defaultValue: string) => {
  const value = getEnv(key)
  if (value.trim().length == 0) {
    return defaultValue
  }
  return value
}

/**
 * 获取Boolean类型的环境变量
 *
 * @param key
 * @author terwer
 * @since 1.0.0
 */
const getBooleanEnv = (key: string): boolean => {
  let env: boolean
  const defVal = getEnvOrDefault(key, "false")
  env = defVal.toLowerCase() === "true"
  return env
}

// 是否是开发阶段调试
const isNodeDev = process.env.NODE_ENV === "development"
const isDev = isNodeDev || getBooleanEnv("VITE_DEBUG_MODE")

const envUtil = {
  getEnv,
  getBooleanEnv,

  isNodeDev,
  isDev,
}
export default envUtil
