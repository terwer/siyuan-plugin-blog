import siyuan from "siyuan"
import "../main.styl"

class ZhiCodeBlock extends siyuan.Plugin {
  private readonly loggerName = "ZhiCodeBlock"
  private readonly logger
  private readonly clientApi = siyuan.clientApi

  constructor() {
    super()
    this.logger = this.clientApi.createLogger(this.loggerName)
  }

  override onload() {
    this.logger.info("ZhiCodeBlock loaded")
  }

  override onunload() {
    this.logger.info("ZhiCodeBlock unloaded")
  }
}

export default ZhiCodeBlock
