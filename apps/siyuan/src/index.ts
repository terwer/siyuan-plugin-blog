/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import { App, IObject, Plugin } from "siyuan";
import { isDev } from "./Constants.ts";
import { Topbar } from "./topbar.ts";
import { ILogger, simpleLogger } from "zhi-lib-base";

import "./global.css";

/**
 * PublishProPlugin 类是 siyuan-note 的插件入口
 *
 * @author terwer
 * @since 2.0.0
 */
export default class SiyuanBlogPlugin extends Plugin {
  public logger: ILogger = simpleLogger("index", "siyuan-blog", isDev);
  private topbar: Topbar = {} as Topbar;

  constructor(options: { app: App; id: string; name: string; i18n: IObject }) {
    super(options);
    // topbar
    this.topbar = new Topbar(this);
  }

  async onload() {
    // 初始化工具栏
    this.topbar.initTopbar();
    this.logger.info("SiyuanBlog loaded");
  }

  onunload() {
    this.logger.debug("SiyuanBlog unloaded");
  }

  // ==================
  // private methods
  // ==================
}
