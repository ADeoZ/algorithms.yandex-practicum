/**
 * Гоша повесил на стену гирлянду в виде бинарного дерева,
 * в узлах которого находятся лампочки. У каждой лампочки есть своя яркость.
 * Уровень яркости лампочки соответствует числу, расположенному в узле дерева.
 * Помогите Гоше найти самую яркую лампочку в гирлянде, то есть такую,
 * у которой яркость наибольшая.
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
  let maximum = root.value;
  const left = root.left ? [root.left] : [];
  const right = root.right ? [root.right] : [];
  while (left.length || right.length) {
    if (left.length) {
      const leftNode = left.pop();
      if (leftNode.value > maximum) maximum = leftNode.value;
      if (leftNode.left) left.push(leftNode.left);
      if (leftNode.right) right.push(leftNode.right);
    }
    if (right.length) {
      const rightNode = right.pop();
      if (rightNode.value > maximum) maximum = rightNode.value;
      if (rightNode.left) left.push(rightNode.left);
      if (rightNode.right) right.push(rightNode.right);
    }
  }
  return maximum;
}

function test() {
  var node1 = new CNode(1);
  var node2 = new CNode(-5);
  var node3 = new CNode(3);
  node3.left = node1;
  node3.right = node2;
  var node4 = new CNode(2);
  node4.left = node3;
  console.assert(solution(node4) === 3);
}
