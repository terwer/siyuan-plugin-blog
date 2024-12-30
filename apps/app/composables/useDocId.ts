/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

/**
 * 统一获取文档 ID 的方法
 */
export const useDocId = () => {
  const route = useRoute()

  const getDocId = () => {
    const id = (route.params.id ?? "") as string
    if (id.endsWith(".html")) {
      return id.replace(".html", "")
    } else if (id.endsWith(".htm")) {
      return id.replace(".htm", "")
    } else {
      return id
    }
  }

  return { docId: getDocId() }
}
