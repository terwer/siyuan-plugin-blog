import siyuan from "siyuan"
import "../main.styl"

class ZhiCodeBlock extends siyuan.Plugin {
  private readonly logger
  private readonly clientApi = siyuan.clientApi

  constructor() {
    super()
    this.logger = this.clientApi.createLogger(ZhiCodeBlock.name)
  }

  override onload() {
    this.logger.info("ZhiCodeBlock loaded")
  }

  override onunload() {
    this.logger.info("ZhiCodeBlock unloaded")
  }
}

export default ZhiCodeBlock
