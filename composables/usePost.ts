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

import { createAppLogger } from "~/common/appLogger"
import { Post } from "zhi-blog-api"
import { ObjectUtil } from "zhi-common"
import { usePostApi } from "~/composables/api/usePostApi"
import { SiyuanDevice } from "zhi-device"

/**
 * 文档相关
 */
export const usePost = () => {
  const logger = createAppLogger("use-post")
  const { getPost } = usePostApi()

  // datas
  const currentPost = reactive({
    post: {} as Post,
  })

  /**
   * 如果缓存已有直接返回，否则去远程抓取数据
   */
  const setCurrentPost = async (pageId?: string) => {
    const win = SiyuanDevice.siyuanWindow()
    if (!win.origin) {
      throw new Error("server mode, ignore")
    }
    if (!win?.origin?.includes("127.0.0.1") && !win?.origin?.includes("localhost")) {
      throw new Error("only local service is allowed for preview")
    }
    if (ObjectUtil.isEmptyObject(currentPost.post)) {
      const route = useRoute()
      const id = pageId ?? ((route.params.id ?? "") as string)
      currentPost.post = await getPost(id)
    } else {
      logger.info("Post already cached, skip fetch")
    }
  }

  return { currentPost, setCurrentPost }
}
