/**
 * Задан неориентированный граф. Обойдите с помощью DFS все вершины,
 * достижимые из заданной вершины s, и выведите их в порядке обхода,
 * если начинать обход из s.
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

const DFS = (vertexes, edgesArray, start) => {
  const visited = new Array(vertexes + 1).fill(false);
  const result = [];
  const adjacencyList = Array.from({ length: vertexes + 1 }, () => []);
  edgesArray.forEach((edge) => {
    adjacencyList[edge[0]].push(edge[1]);
    adjacencyList[edge[1]].push(edge[0]);
  });

  const stack = [];
  stack.push(start);

  while (stack.length > 0) {
    const v = stack.pop();
    if (!visited[v]) {
      const outgoingEdges = adjacencyList[v].sort((a, b) => b - a);
      for (edge of outgoingEdges) {
        if (!visited[edge]) stack.push(edge);
      }
      result.push(v);
      visited[v] = true;
    }
  }
  return result.join(" ");
};

function solve() {
  const [vertexes, edges] = readLine().split(" ").map(Number);
  const edgesArray = readIntArray(edges);
  const start = readInt();

  process.stdout.write(DFS(vertexes, edgesArray, start));
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line;
}

function readIntArray(lines) {
  const array = new Array(lines);
  for (let i = 0; i < lines; i++) {
    array[i] = readLine().split(" ").map(Number);
  }
  return array;
}
