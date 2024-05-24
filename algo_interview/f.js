/**
 * Дано укоренённое дерево на N вершинах и число X. В каждой вершине записано
 * число — её вес.
 * Восходящий путь — это путь, который начинается с некоторой вершины и
 * двигается в сторону корня (не обязательно доходя до него). Путь может
 * состоять из одной вершины.
 * Весом пути назовём суммарный вес вершин на этом пути.
 * Найдите количество восходящих путей с весом X.
 */

class Vertex {
  constructor(weight, parent) {
    this.weight = weight;
    this.parent = parent;
    this.visited = false;
    this.childrens = [];
    this.sum = null;
  }
}

function getNumberOfUpgoingPaths(root, x) {
  let stack = [root];
  let result = 0;

  const sums = new Map();
  sums.set(0, 1);

  while (stack.length > 0) {
    const node = stack.pop();
    if (!node) continue;

    if (!node.visited) {
      node.visited = true;
      node.sum = (node.parent.sum ?? 0) + node.weight;

      result += sums.has(node.sum - x) ? sums.get(node.sum - x) : 0;

      sums.set(node.sum, (sums.get(node.sum) ?? 0) + 1);

      stack.push(node);
      for (let i = 0; i < node.childrens.length; i++) {
        stack.push(node.childrens[i]);
      }
    } else sums.set(node.sum, sums.get(node.sum) - 1);
  }

  return result;
}

const _readline = require("readline");

const _reader = _readline.createInterface({
  input: process.stdin,
});

const _inputLines = [];
let _curLine = 0;

_reader.on("line", (line) => {
  _inputLines.push(line);
});

process.stdin.on("end", solve);

function solve() {
  const firsLine = readArray();
  const n = firsLine[0];
  const x = firsLine[1];
  const root = readTree(n);
  process.stdout.write(`${getNumberOfUpgoingPaths(root, x)}`);
}

function readArray() {
  var arr = _inputLines[_curLine]
    .trim(" ")
    .split(" ")
    .map((num) => Number(num));
  _curLine++;
  return arr;
}

function readTree(vertexes) {
  let tree = [];
  let root = null;
  for (let i = 0; i < vertexes; i++) {
    let vertex = readArray();
    tree.push(new Vertex(vertex[1], vertex[0]));
    if (vertex[0] === -1) root = tree[i];
  }
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.parent !== -1) {
      node.parent = tree[node.parent];
      node.parent.childrens.push(node);
    }
  }
  return root;
}
