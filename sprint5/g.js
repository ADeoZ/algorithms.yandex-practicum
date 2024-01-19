/**
 * Тимофей устраивает соревнования по спортивному ориентированию в своём офисе.
 * Схема офиса представлена в виде дерева.
 * Посещая каждый пункт, можно зарабатывать или терять очки.
 * Нужно определить, какое максимальное число очков можно заработать,
 * пройдя по пути из какого-то пункта A в какой-то (возможно, тот же) пункт B.
 * Путь не обязательно должен проходить через корень или содержать лист.
 * Путь должен содержать по крайней мере один узел.
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
  const paths = [];
  collectPaths(root, paths);
  return Math.max(...paths);
}

function collectPaths(node, paths) {
  if (!node) return 0;

  const leftPath = collectPaths(node.left, paths);
  const rightPath = collectPaths(node.right, paths);

  let sum = node.value;
  sum += leftPath > 0 ? leftPath : 0;
  sum += rightPath > 0 ? rightPath : 0;
  paths.push(sum);
  const bestPath = Math.max(leftPath, rightPath);

  return Math.max(node.value + bestPath, node.value);
}

function test() {
  var node1 = new CNode(5, null, null);
  var node2 = new CNode(1, null, null);
  var node3 = new CNode(-3, node2, node1);
  var node4 = new CNode(2, null, null);
  var node5 = new CNode(2, node4, node3);
  console.assert(solution(node5) === 6);
}
