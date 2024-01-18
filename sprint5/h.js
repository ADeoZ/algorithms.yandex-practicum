/**
 * Вася и его друзья решили поиграть в игру.
 * Дано дерево, в узлах которого записаны цифры от 0 до 9.
 * Таким образом, каждый путь от корня до листа содержит число,
 * получившееся конкатенацией цифр пути (склеиванием цифр пути в одно число).
 * Нужно найти сумму всех таких чисел в дереве.
 */

if (process.env.REMOTE_JUDGE !== "true") {
  class CNode {
    constructor(value, left = null, right = null) {
      this.value = value;
      this.left = left;
      this.right = right;
    }
  }
}

function solution(root) {
  const result = [];
  joinValues(root, "", result);
  return result.reduce((sum, number) => (sum += Number(number)), 0);
}

function joinValues(node, sequence, result) {
  if (!node) return;
  if (!node.left && !node.right) {
    result.push(sequence + node.value);
    return;
  }
  joinValues(node.left, sequence + node.value, result);
  joinValues(node.right, sequence + node.value, result);
}

function test() {
  var node1 = new CNode(2, null, null);
  var node2 = new CNode(1, null, null);
  var node3 = new CNode(3, node1, node2);
  var node4 = new CNode(2, null, null);
  var node5 = new CNode(1, node4, node3);
  console.assert(solution(node5) === 275);
}
