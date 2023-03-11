/**
 * 主题通用类（由theme.js动态调用，除了单元测试之外请勿主动调用）
 *
 * @public
 * @author terwer
 * @since 1.0.0
 */
class Theme {
  /**
   * 主流程加载
   *
   * @param runAs 运行模式
   */
  public async init(runAs?: any): Promise<void> {
    console.log("Theme inited.")
  }
}

export default Theme
