import ZhiUtil from "../ZhiUtil"
import { DeviceType } from "zhi-common"

/**
 * 主题通用类（由theme.js动态调用，除了单元测试之外请勿主动调用）
 *
 * @public
 * @author terwer
 * @since 1.0.0
 */
class Zhi {
  private readonly logger
  private readonly common

  constructor() {
    this.logger = ZhiUtil.zhiLog("zhi")
    this.common = ZhiUtil.zhiCommon()
  }

  /**
   * 主流程加载
   *
   * @param runAs - 运行模式
   */
  public async init(runAs?: string): Promise<void> {
    try {
      this.logger.info(this.common.strUtil.f("Theme runAs {0}", runAs ?? DeviceType.DeviceType_Node))

      this.logger.info("Theme inited.")
    } catch (e) {
      this.logger.error("Theme load error=>", e)
    }
  }
}

export default Zhi
