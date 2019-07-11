import MenuNode from "./menuNode";
/**
 * 使原始数据结构转换成数据结构
 * @param {object} root 原始数据
 * @param {TreeNode} parent 父节点
 * @param {Function} pickData 从原始数据中提取数据函数
 * @param {Function} isSelected 判断是否符合选中条件
 * @returns {TreeNode} 根节点
 */
export default function normalizeTree(root, parent, pickData, isSelected) {
  if (!root) {
    return null;
  }
  // 创建节点
  const treeNode = new MenuNode(parent, pickData(root));
  //如果有子节点
  if (Array.isArray(root.children)) {
    root.children.forEach(originalNode => {
      // 转换所有子节点
      let node = normalizeTree(originalNode, treeNode, pickData, isSelected);
      if (node) {
        treeNode.addChildren(node);
        node.selected = isSelected(node);
      }
    });
  }
  return treeNode;
}
