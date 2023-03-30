import Zhi from "./lib/zhi"

/**
 * @packageDocumentation
 * zhi-mini 一款简洁、强大的思源笔记主题
 */
import ZhiUtil from "./ZhiUtil"
;(async () => {
  const zhi = new Zhi()
  const common = ZhiUtil.zhiCommon()
  const deviceType = common.deviceUtil.getDevice()
  await zhi.init(deviceType)
})()
