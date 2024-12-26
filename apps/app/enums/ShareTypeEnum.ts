/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2023-2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

/**
 * 分享类型枚举
 */
export enum ShareTypeEnum {
  /**
   * 公共分享，思源笔记已废弃，不安全
   *
   * @deprecated see https://github.com/siyuan-note/siyuan/pull/9634
   */
  ShareType_Public = "public",

  /**
   * 静态分享
   */
  ShareType_Static = "private",
}
