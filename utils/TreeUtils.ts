interface TreeNode {
  id: string
  name: string
  parentId?: string
  children?: TreeNode[]
  content?: string
}

class TreeUtils {
  public static buildTree(nodes: TreeNode[]): TreeNode[] {
    const idMap = new Map<string, TreeNode>()
    const rootNodes: TreeNode[] = []

    // 首先将所有节点放入一个 Map 中，以便快速查找
    nodes.forEach((node) => {
      idMap.set(node.id, { ...node, children: [] })
    })

    // 构建树结构
    nodes.forEach((node) => {
      if (node.parentId) {
        const parent = idMap.get(node.parentId)
        if (parent) {
          parent.children = parent.children ?? []
          parent.children.push(idMap.get(node.id)!)
        }
      } else {
        rootNodes.push(idMap.get(node.id)!)
      }
    })

    return rootNodes
  }
}

export { type TreeNode, TreeUtils }
