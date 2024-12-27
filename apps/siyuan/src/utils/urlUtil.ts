/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import { DeviceDetection, DeviceTypeEnum, SiyuanDevice } from "zhi-device"
import {createAppLogger} from "./appLogger.ts";

const logger = createAppLogger("url-utils")

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
  const syWin = SiyuanDevice.siyuanWindow()
  const ips = syWin?.siyuan?.config?.localIPs ?? []

  const deviceType = DeviceDetection.getDevice()
  if (
    deviceType === DeviceTypeEnum.DeviceType_Siyuan_MainWin ||
    deviceType === DeviceTypeEnum.DeviceType_Siyuan_Widget
  ) {
    const ipv4s = getIPv4List()
    // 将ipv4s中的所有元素添加到ips数组中
    ips.push(...ipv4s)
  }

  const v4IPs = ips.filter((ip: string) => !ip.startsWith("[") && !ip.endsWith("]"))
  logger.info("v4IPs =>", v4IPs)
  const uniqueIPs = Array.from(new Set(v4IPs)) as any[]
  logger.info("uniqueIPs =>", uniqueIPs)
  return uniqueIPs
}

export const getAvailableOrigin = () => {
  const win = SiyuanDevice.siyuanWindow()
  const origin = win.location.origin
  const localIp = getLocalIp()
  if (localIp) {
    // @ts-ignore
    return origin.replace(/127.0.0.1|localhost/, localIp)
  }
  return origin
}
