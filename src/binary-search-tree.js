const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor(){
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this.rootNode) {
      this.rootNode = newNode;
      return;
    }

    let current = this.rootNode;
    while (true) {
      if (data < current.data) {
        if (!current.left) {
          current.left = newNode;
          break;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          break;
        }
        current = current.right;
      }
    }
  }

  has(data) {
    return !!this.find(data);
  }


  find(data) {
    let current = this.rootNode;

    while (current) {
      if (data === current.data) return current;
      current = data < current.data ? current.left : current.right;
    }

    return null;
  }

  remove(data) {
    function removeNode(node, data) {
      if (!node) return null;

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) return null;
        if (!node.left) return node.right;
        if (!node.right) return node.left;

        let temp = node.right;
        while (temp.left) temp = temp.left;
        node.data = temp.data;
        node.right = removeNode(node.right, temp.data);
        return node;
      }
    }

    this.rootNode = removeNode(this.rootNode, data);
  }

  min() {
    if (!this.rootNode) return null;
    let current = this.rootNode;
    while (current.left) current = current.left;
    return current.data;
  }

  max() {
    if (!this.rootNode) return null;
    let current = this.rootNode;
    while (current.right) current = current.right;
    return current.data;
  }
}

module.exports = {
  BinarySearchTree
};