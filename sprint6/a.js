/**
 * Алла пошла на стажировку в студию графического дизайна,
 * где ей дали такое задание: для очень большого числа ориентированных графов
 * преобразовать их список рёбер в список смежности.
 * Чтобы побыстрее решить эту задачу, она решила автоматизировать процесс.
 * Помогите Алле написать программу, которая по списку рёбер графа будет строить его список смежности.
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
  const adjacencyList = Array.from({ length: vertexes }, () => []);
  edgesArray.forEach((edge) => adjacencyList[edge[0] - 1].push(edge[1]));

  const result = adjacencyList.reduce(
    (list, vertex) => [...list, `${vertex.length} ${vertex.sort((a, b) => a - b).join(" ")}`],
    []
  );
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
