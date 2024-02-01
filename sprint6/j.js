/**
 * Дан ациклический ориентированный граф (так называемый DAG, directed acyclic graph).
 * Найдите его топологическую сортировку, то есть выведите его вершины в таком порядке,
 * что все рёбра графа идут слева направо. У графа может быть несколько
 * подходящих перестановок вершин. Вам надо найти любую топологическую сортировку.
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

const topologicalSort = (vertexes, edgesArray) => {
  const colors = new Array(vertexes + 1).fill("white");
  const adjacencyList = Array.from({ length: vertexes + 1 }, () => []);
  edgesArray.forEach((edge) => {
    adjacencyList[edge[0]].push(edge[1]);
  });
  const result = [];

  for (let i = 1; i < colors.length; i++) {
    if (colors[i] === "white") {
      const stack = [];
      stack.push(i);

      while (stack.length > 0) {
        const v = stack.pop();

        if (colors[v] === "white") {
          colors[v] = "gray";
          stack.push(v);

          const outgoingEdges = adjacencyList[v];
          for (edge of outgoingEdges) {
            if (colors[edge] === "white") stack.push(edge);
          }
        } else if (colors[v] === "gray") {
          colors[v] = "black";
          result.push(v);
        }
      }
    }
  }

  return result.reverse().join(" ");
};

function solve() {
  const [vertexes, edges] = readIntLine();
  const edgesArray = readIntArray(edges);

  process.stdout.write(topologicalSort(vertexes, edgesArray));
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
