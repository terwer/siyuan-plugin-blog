import ZhiUtil from "../../../../../../../../../../../zhi-common"
import siyuan from "siyuan"
import PublisherHook from "~/src/zhi-plugins/zhi-publisher/publisher-hook"
import Env from "zhi-env"

/**
 * zhi publisher plugin
 *
 * @author terwer
 * @since 1.0.0
 */
class ZhiPublisherPlugin extends siyuan.Plugin {
  private readonly logger
  private readonly publisherHook

  constructor() {
    super()
    const env = new Env(import.meta.env)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const zhiSdk = ZhiUtil.zhiSdk(env)
    this.logger = zhiSdk.getLogger()

    this.publisherHook = new PublisherHook()
  }

  async onload() {
    await this.publisherHook.init()
    this.logger.info("ZhiPublisherPlugin loaded")
  }

  onunload() {
    this.logger.info("ZhiPublisherPlugin unloaded")
  }
}

export default ZhiPublisherPlugin
