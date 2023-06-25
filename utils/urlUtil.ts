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

import { DeviceDetection, DeviceTypeEnum, SiyuanDevice } from "zhi-device"

const getIPv4List = () => {
  const win = SiyuanDevice.siyuanWindow()
  const os = win.require("os")
  const interfaces = os.networkInterfaces()
  const addresses = []

  for (const k in interfaces) {
    for (const k2 in interfaces[k]) {
      const address = interfaces[k][k2]
      if (address.family === "IPv4" && !address.internal) {
        addresses.push(address.address)
      }
    }
  }

  if (addresses.length === 0) {
    return "127.0.0.1"
  }

  return addresses
}

const getAvailableIP = (ips: string[]): string | null => {
  const localIPs = ips.filter((ip) => ip !== "127.0.0.1")
  return localIPs.length > 0 ? localIPs[0] : null
}

const getLocalIp = () => {
  const ips = getAllIps()
  return getAvailableIP(ips)
}

export const getAllIps = () => {
  if (typeof window === "undefined") {
    return []
  }
  const win = window as any
  if (typeof win.siyuan === "undefined" || typeof win.parent.siyuan === "undefined") {
    return []
  }
  const syWin = SiyuanDevice.siyuanWindow()
  const ips = syWin.siyuan.config.localIPs

  const deviceType = DeviceDetection.getDevice()
  if (
    deviceType === DeviceTypeEnum.DeviceType_Siyuan_MainWin ||
    deviceType === DeviceTypeEnum.DeviceType_Siyuan_Widget
  ) {
    const ipv4s = getIPv4List()
    // 将ipv4s中的所有元素添加到ips数组中
    ips.push(...ipv4s)
  }

  return ips
}

export const getAvailableOrigin = () => {
  const win = SiyuanDevice.siyuanWindow()
  const origin = win.location.origin
  const localIp = getLocalIp()
  if (localIp) {
    return origin.replace(/(127.0.0.1|localhost)/, localIp)
  }
  return origin
}
