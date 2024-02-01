/**
 * Неориентированный граф называется полным, если в нём каждая пара вершин
 * соединена ребром.
 * Вам дан неориентированный граф из n вершин и m рёбер.
 * Выясните, является ли этот граф полным.
 */

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

const isGraphComplete = (vertexes, edgesArray) => {
  const adjacencyList = Array.from({ length: vertexes + 1 }, () => new Set());
  edgesArray.forEach((edge) => {
    if (edge[0] === edge[1]) return;
    adjacencyList[edge[0]].add(edge[1]);
    adjacencyList[edge[1]].add(edge[0]);
  });

  return adjacencyList.slice(1).every((vertex) => vertex.size === vertexes - 1);
};

function solve() {
  const [vertexes, edges] = readIntLine();
  const edgesArray = readIntArray(edges);

  process.stdout.write(isGraphComplete(vertexes, edgesArray) ? "YES" : "NO");
}

function readIntLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line.split(" ").map(Number);
}

function readIntArray(lines) {
  const array = new Array(lines);
  for (let i = 0; i < lines; i++) {
    array[i] = readIntLine();
  }
  return array;
}
