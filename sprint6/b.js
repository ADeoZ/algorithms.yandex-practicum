/**
 * Алла успешно справилась с предыдущим заданием, и теперь ей дали новое.
 * На этот раз список рёбер ориентированного графа надо переводить в
 * матрицу смежности. Конечно же, Алла попросила вас помочь написать программу для этого.
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

const getAdjacencyList = (vertexes, edgesArray) => {
  const adjacencyList = Array.from({ length: vertexes }, () => new Array(vertexes).fill(0));
  edgesArray.forEach((edge) => (adjacencyList[edge[0] - 1][edge[1] - 1] = 1));

  const result = adjacencyList.map((line) => line.join(" "));
  return result;
};

function solve() {
  const [vertexes, edges] = readLine().split(" ").map(Number);
  const edgesArray = readIntArray(edges);

  const adjacencyList = getAdjacencyList(vertexes, edgesArray);
  process.stdout.write(adjacencyList.join("\n"));
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
