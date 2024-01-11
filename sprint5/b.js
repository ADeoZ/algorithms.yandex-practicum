/**
 * Гоше очень понравилось слушать рассказ Тимофея про деревья.
 * Особенно часть про сбалансированные деревья.
 * Он решил написать функцию, которая определяет, сбалансировано ли дерево.
 * Дерево считается сбалансированным, если левое и правое поддеревья
 * каждой вершины отличаются по высоте не больше, чем на единицу.
 */

if (process.env.REMOTE_JUDGE !== "true") {
  class CNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }
}

function solution(root) {
  let leftHeight = 0;
  if (root.left) {
    if (!solution(root.left)) return false;
    leftHeight = root.left.height;
  }

  let rightHeight = 0;
  if (root.right) {
    if (!solution(root.right)) return false;
    rightHeight = root.right.height;
  }

  if (Math.abs(leftHeight - rightHeight) > 1) return false;
  root.height = Math.max(leftHeight, rightHeight) + 1;
  return true;
}

function test() {
  var node1 = new CNode(1);
  var node2 = new CNode(-5);
  var node3 = new CNode(3);
  node3.left = node1;
  node3.right = node2;
  var node4 = new CNode(10);
  var node5 = new CNode(2);
  node5.left = node3;
  node5.right = node4;
  console.assert(solution(node5));
}
