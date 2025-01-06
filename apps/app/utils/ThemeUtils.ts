/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import type AppConfig from "~/app.config"

/**
 * 主题相关的工具类
 *
 * @author terwer
 * @since 5.4.0
 */
class ThemeUtils {
  private static base = ""

  // 添加base路径
  public static withBase (path?: string, setting?: typeof AppConfig) {
    // base路径
    this.base = setting?.siteUrl || ""

    if (!path) {
      return ""
    }
    if (this.base && path.charAt(0) === "/") {
      return this.base + path.slice(1)
    } else {
      return path
    }
  }
}

export { ThemeUtils }
