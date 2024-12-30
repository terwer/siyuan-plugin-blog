/**
 * @description 树形工具类
 */
class TreeUtils {
  /**
   * 添加父级ID
   *
   * @param data
   */
  public static addParentIds (data: any) {
    const map = new Map()
    if (!data) {
      return []
    }
    data.forEach((item: any) => map.set(item.id, item))

    function getParentIds (item: any) {
      const parentIds = []
      let parent = map.get(item.parentId)
      while (parent) {
        parentIds.unshift(parent.id)
        parent = map.get(parent.parentId)
      }
      return parentIds
    }

    data.forEach((item: any) => {
      item.parentIds = getParentIds(item)
    })
    return data
  }

  /**
   * 获取所有父级ID（包括自己）
   *
   * @param treeData
   * @param expandedIds
   */
  public static chainExpandedIds (treeData: any[], expandedIds: string[]): string[] {
    // 获取所有 parentIds，同时包括 expandedIds 中的 ID，并去重
    const parentIds = [
      ...new Set(
        treeData
          .filter((item: any) => expandedIds.includes(item.id))
          .map((item: any) => item.parentIds)
          // 扁平化 parentIds 数组
          .flat()
      ),
      // 将 expandedIds 中的 ID 加入结果
      ...expandedIds,
    ]

    // 去重并按升序排序
    return [...new Set(parentIds)].sort()
  }
}

export { TreeUtils }
