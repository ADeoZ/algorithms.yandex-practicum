/**
 * Вам дан ациклический ориентированный граф. Найдите в нем количество путей
 * от вершины A до вершины B. Так как потенциально различных путей может быть
 * очень много, то выведите остаток этого числа по модулю 10^9 + 7.
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

const howManyPaths = (vertexes, edgesArray, start, end) => {
  const adjacencyList = Array.from({ length: vertexes + 1 }, () => []);
  // составляем наоборот
  edgesArray.forEach(([from, to]) => adjacencyList[to].push(from));
  const mod = 10 ** 9 + 7;

  const colors = new Array(vertexes + 1).fill("white");
  const paths = new Array(vertexes + 1).fill(0);

  colors[start] = "black";
  paths[start] = 1;
  const stack = [end];

  while (stack.length) {
    const v = stack.pop();
    if (colors[v] === "white") {
      colors[v] = "gray";
      stack.push(v);

      const ingoingEdges = adjacencyList[v];
      for (let edge of ingoingEdges) {
        if (colors[edge] === "white") stack.push(edge);
      }
    } else if (colors[v] === "gray") {
      let pathsCount = paths[v];
      const ingoingEdges = adjacencyList[v];
      for (let edge of ingoingEdges) {
        pathsCount = (pathsCount + paths[edge]) % mod;
      }
      paths[v] = pathsCount;
      colors[v] = "black";
    }
  }

  return paths[end];
};

function solve() {
  const [vertexes, edges] = readIntLine();
  const edgesArray = readIntArray(edges);
  const [start, end] = readIntLine();

  process.stdout.write(`${howManyPaths(vertexes, edgesArray, start, end)}`);
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
