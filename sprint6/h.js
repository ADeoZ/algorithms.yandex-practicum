/**
 * Вам дан ориентированный граф. Известно, что все его вершины достижимы из вершины s=1.
 * Найдите время входа и выхода при обходе в глубину, производя первый запуск
 * из вершины s. Считайте, что время входа в стартовую вершину равно 0.
 * Соседей каждой вершины обходите в порядке увеличения номеров.
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

const getInOut = (vertexes, edgesArray) => {
  const colors = new Array(vertexes + 1).fill("white");
  const result = new Array(vertexes + 1).fill("");
  const adjacencyList = Array.from({ length: vertexes + 1 }, () => []);
  edgesArray.forEach((edge) => adjacencyList[edge[0]].push(edge[1]));
  adjacencyList.map((v) => v.sort((a, b) => b - a));
  let timer = 0;
  const stack = [];
  stack.push(1);

  while (stack.length > 0) {
    const v = stack.pop();
    if (colors[v] === "white") {
      result[v] = `${timer}`;
      timer++;

      colors[v] = "gray";
      stack.push(v);
      const outgoingEdges = adjacencyList[v];
      for (edge of outgoingEdges) {
        if (colors[edge] === "white") stack.push(edge);
      }
    } else if (colors[v] === "gray") {
      result[v] += ` ${timer}`;
      timer++;

      colors[v] = "black";
    }
  }

  return result.slice(1).join("\n");
};

function solve() {
  const [vertexes, edges] = readIntLine();
  const edgesArray = readIntArray(edges);

  process.stdout.write(getInOut(vertexes, edgesArray));
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
