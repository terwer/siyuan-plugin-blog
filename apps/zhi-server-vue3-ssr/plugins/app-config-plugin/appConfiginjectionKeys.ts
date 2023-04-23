/*
 * Copyright (c) 2023, Terwer . All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Terwer designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Terwer in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Terwer, Shenzhen, Guangdong, China, youweics@163.com
 * or visit www.terwer.space if you need additional information or have any
 * questions.
 */

import { InjectionKey } from "vue"

export interface AppConfig {
  siteTitle?: string
  siteSlogan?: string
  siteDescription?: string
  themeConfig?: {
    nav?: Nav[]
    sidebarDepth?: number
    logo?: string
    repo?: string
    repoLabel?: string | undefined
    searchMaxSuggestions?: number
    lastUpdated?: string | boolean
    docsDir?: string
    editLinks?: boolean
    editLinkText?: string
    pageStyle?: string
    bodyBgImg?: string[] | string
    bodyBgImgOpacity?: number
    bodyBgImgInterval?: number
    defaultMode?: string
    sidebar?: "structuring" | { mode: "structuring"; collapsable: boolean } | "auto" | any
    sidebarHoverTriggerOpen?: any
    author?: Author
    blogger?: Blogger
    social?: Social
    footer?: Footer
    extendFrontmatter?: {
      [key: string]: Frontmatter
    }
  }
}

interface Nav {
  text: string
  link?: string
  /**
   * 每一项可以重复
   */
  items?: any[]
}

interface Author {
  name: string
  link?: string
}

interface Blogger {
  avatar: string
  name: string
  slogan: string
  social?: Social
}

interface Social {
  iconfontCssFile?: string
  icons?: { iconClass: string; title: string; link: string }[]
}

interface Footer {
  createYear: number
  copyrightInfo: string
}

interface Frontmatter {
  name: string
  link?: string
}

export const appConfigSymbol: InjectionKey<AppConfig> = Symbol("appConfig")
