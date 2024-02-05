/**
 * Неориентированный граф называется двудольным (англ. bipartite),
 * если его вершины можно разбить на два непересекающихся множества
 * таким образом, что рёбра будут проведены только между вершинами
 * из разных множеств. Эти два множества вершин ещё называют долями.
 * Гоша узнал, что двудольными могут быть не только графы,
 * но и растения (например, сирень). Теперь он в них путается
 * и не может проверить граф на двудольность без мыслей о цветочках.
 * Помогите Гоше: проверьте, является ли заданный неориентированный
 * граф двудольным.
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

const isBigraph = (vertexes, adjacencyList) => {
  let firstPart = true;
  const parts = new Array(vertexes + 1).fill(null);

  const colors = new Array(vertexes + 1).fill("white");
  for (let i = 1; i < colors.length; i++) {
    if (colors[i] === "white") {
      const stack = [];
      stack.push(i);

      while (stack.length) {
        const v = stack.pop();
        if (colors[v] === "white") {
          colors[v] = "gray";
          stack.push(v);

          parts[v] = firstPart;
          firstPart = !firstPart;

          const outgoingEdges = adjacencyList[v];
          for (let edge of outgoingEdges) {
            if (parts[v] === parts[edge]) return false;
            if (colors[edge] === "white") stack.push(edge);
          }
        } else if (colors[v] === "gray") {
          firstPart = !firstPart;
          colors[v] = "black";
        }
      }
    }
  }

  return true;
};

function solve() {
  const [vertexes, edges] = readIntLine();
  const adjacencyList = getAdjacencyList(vertexes, edges);

  process.stdout.write(isBigraph(vertexes, adjacencyList) ? "YES" : "NO");
}

function readIntLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line.split(" ").map(Number);
}

function getAdjacencyList(vertexes, edges) {
  const adjacencyList = Array.from({ length: vertexes + 1 }, () => []);
  for (let i = 0; i < edges; i++) {
    const [a, b] = readIntLine();
    adjacencyList[a].push(b);
    adjacencyList[b].push(a);
  }
  return adjacencyList;
}
