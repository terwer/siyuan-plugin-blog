"use strict";
class Theme {
  /**
   * 主流程加载
   *
   * @param runAs 运行模式
   */
  async init(runAs) {
    console.log("Theme inited.");
  }
}
(async () => {
  const theme = new Theme();
  await theme.init("electron");
})();
