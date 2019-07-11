export default class MenuNode {
  constructor(parent, data) {
    this._opened = false;
    this._selected = false;
    this.parent = parent;
    this.children = [];
    this.data = data;
  }
  /**
   * 添加一个孩子节点
   * @param {TreeNode} node
   */
  addChildren(node) {
    this.children.push(node);
  }

  set selected(selected) {
    this._selected = selected;
    this.opened = selected;
  }

  get selected() {
    return this._selected;
  }

  set opened(opened) {
    this._opened = opened;
    if (this.parent) {
      this.parent.opened = opened;
    }
  }

  get opened() {
    return this._opened;
  }
}
