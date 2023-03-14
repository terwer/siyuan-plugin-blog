import ZhiUtil from "zhi-common"
import HackPluginSystem from "~/src/plugin-system/hack-plugin-system"
import Env from "zhi-env"

/**
 * 插件系统入口
 *
 * @author terwer
 * @since 1.0.0
 */
class PluginSystemHook {
  private readonly logger
  private readonly common
  private readonly siyuanApi

  private readonly hack

  constructor() {
    const env = new Env(import.meta.env)
    const zhiSdk = ZhiUtil.zhiSdk(env)

    this.logger = zhiSdk.getLogger()
    this.common = zhiSdk.common
    this.siyuanApi = zhiSdk.siyuanApi

    this.hack = new HackPluginSystem()
  }

  /**
   * 获取插件同步信息
   *
   * @param p 插件系统对象
   * @param zhiPlugin 插件对象
   */
  getOldPluginInfo(p: any, zhiPlugin: any) {
    let isSynced = false
    let isUpdate = false
    let oldVersion = this.hack.OLD_VERSION_ZERO

    const plugins = p.pslm.storageMangager.thirdPartyPlugins
    for (const item of plugins) {
      // this.logger.debug("Plugin=>", item)
      // 不是当前插件跳过
      if (zhiPlugin.name !== item.name) {
        continue
      }

      // 当前插件有新版本
      if (this.common.versionUtil.greater(zhiPlugin.version, item.version)) {
        isUpdate = true
      }

      oldVersion = item.version
      isSynced = true
    }

    return { isSynced, oldVersion, isUpdate }
  }

  /**
   * 同步插件到插件目录
   *
   * @param p - 插件对象
   */
  async syncZhiPlugins(p: any) {
    this.logger.info("Start syncing zhi plugins ...")
    const fs = this.common.electronUtil.requireLib("fs")
    const path = this.common.electronUtil.requireLib("path")

    // 主题插件目录
    const zhiPluginsPath = this.common.electronUtil.joinPath(
      this.common.electronUtil.zhiThemePath(),
      "apps",
      "theme",
      "lib",
      this.hack.ZHI_PLUGIN_FOLDER
    )
    this.logger.debug("Zhi plugins folder=>", zhiPluginsPath)

    // 插件系统默认目录
    const pluginsPath = this.common.electronUtil.joinPath(
      this.common.electronUtil.siyuanDataPath(),
      this.hack.PLUGIN_FOLDER
    )
    this.logger.debug("Plugins folder=>", pluginsPath)

    let syncedCount = 0
    let zhiPlugins: any = []

    // 未找到主题差距，不同步
    if (!fs.existsSync(zhiPluginsPath)) {
      this.logger.warn("No zhi plugins found, stop!")
    } else {
      // 扫描插件并同步
      zhiPlugins = await this.hack.scanPlugins(zhiPluginsPath)
      // this.logger.debug("zhiPlugins=>", zhiPlugins)
      for (const item of zhiPlugins) {
        const pluginBasename = path.basename(item)
        const from = item
        const to = path.join(pluginsPath, pluginBasename)
        this.logger.debug(this.common.strUtil.f("Try syncing zhi plugin {0}", pluginBasename))

        const manifest = await this.hack.getManifest(path.join(item, this.hack.MANIFEST))
        // this.logger.debug("ZhiPlugin=>", manifest)

        const oldPluginInfo = this.getOldPluginInfo(p, manifest)
        const oldVersion = oldPluginInfo.oldVersion
        this.logger.info(
          this.common.strUtil.f(
            "Plugin status : [{0}] isSynced=>{1}, isUpdate=>{2}, forceUpdate=>{3}, version Info: {4} -> {5}",
            pluginBasename,
            oldPluginInfo.isSynced,
            oldPluginInfo.isUpdate,
            manifest.forceUpdate,
            oldVersion,
            manifest.version
          )
        )

        // 同步需满足下面条件
        // 1. 未同步过或者有新版本
        // 2. 新旧插件注册信息目录均保持一致
        if (!oldPluginInfo.isSynced) {
          // 未同步过，但是目标目录已存在
          if (fs.existsSync(to)) {
            throw new Error(this.common.strUtil.f("Expected forder already exists=>{0}", to))
          }

          this.common.strUtil.f("Do syncing, please wait...")
          this.common.electronUtil.copyFolderSync(from, to)
          syncedCount++
        } else if (oldPluginInfo.isSynced && oldPluginInfo.isUpdate) {
          // 新插件目录不一致，但是有版本号
          if (!fs.existsSync(to)) {
            throw new Error(
              this.common.strUtil.f(
                "Conflict plugin exists, manifest exists but dest folder is not correct with original, please fix plugin folder name.Expected forder is=>{0}",
                to
              )
            )
          }

          this.common.strUtil.f("Do syncing, please wait...")
          this.common.electronUtil.copyFolderSync(from, to)
          syncedCount++
        } else if (manifest.forceUpdate) {
          this.logger.warn(
            this.common.strUtil.f(
              "Find forceUpdate flag in manifest.json, try forcing update plugin, [{0}] {1}.This flag is development only, before publish plugin, you should remove this flag from manifest.json!",
              pluginBasename,
              manifest.version
            )
          )

          this.common.electronUtil.rmFolder(to)
          this.common.electronUtil.copyFolderSync(from, to)
          syncedCount++
        } else {
          this.logger.debug(
            this.common.strUtil.f("Already synced and the latest version [{0}] {1}", pluginBasename, manifest.version)
          )
        }
      }
    }

    this.logger.info(
      this.common.strUtil.f(
        "Zhi theme plugins Synced.Scaned {0}, synced {1} plugin(s).",
        zhiPlugins.length,
        syncedCount
      )
    )

    if (syncedCount > 0) {
      this.logger.warn(
        this.common.strUtil.f("Synced {0} zhi plugins, you need to reload siyuan to take effect.", syncedCount)
      )
    }
  }

  /**
   * 插件系统初始化
   */
  public async init() {
    const sys = await this.hack.initPluginSystem()
    if (!sys) {
      this.logger.error("Plugin system init error, some feature may not work!")
      return
    }

    await this.syncZhiPlugins(sys)
    this.logger.info("PluginSystem inited.")
  }
}

export default PluginSystemHook
