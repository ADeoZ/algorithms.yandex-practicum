/**
 * Вы приехали на архипелаг Алгосы (наконец-то!). Здесь есть n достопримечательностей.
 * Ваша лодка может высадить вас у одной из них, забрать у какой-то другой,
 * возможно, той же самой достопримечательности и увезти на материк.
 * Чтобы более тщательно спланировать свой маршрут, вы хотите узнать расстояния
 * между каждой парой достопримечательностей Алгосов. Некоторые из них
 * соединены мостами, по которым вы можете передвигаться в любую сторону.
 * Всего мостов m.
 * Есть вероятность, что карта архипелага устроена так, что нельзя добраться
 * от какой-то одной достопримечательности до другой без использования лодки.
 * Найдите кратчайшие расстояния между всеми парами достопримечательностей.
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

const dijkstra = (vertexes, adjacencyList, start) => {
  const getMinimumNotVisited = () => {
    let minimumDistance = Number.MAX_VALUE;
    let minimumVertex = null;

    for (let v = 1; v < visited.length; v++) {
      if (!visited[v] && distance[v] < minimumDistance) {
        minimumDistance = distance[v];
        minimumVertex = v;
      }
    }

    return minimumVertex;
  };

  const relax = (from, edge) => {
    if (distance[edge.to] > distance[from] + edge.weight) {
      distance[edge.to] = distance[from] + edge.weight;
      previous[edge.to] = from;
    }
  };

  const distance = new Array(vertexes + 1).fill(Number.MAX_VALUE);
  const previous = new Array(vertexes + 1).fill(null);
  const visited = new Array(vertexes + 1).fill(false);

  distance[start] = 0;

  while (true) {
    const vertex = getMinimumNotVisited();

    if (vertex === null || distance[vertex] === Number.MAX_VALUE) break;

    visited[vertex] = true;

    const outgoingEdges = adjacencyList[vertex];
    for (let edge of outgoingEdges) {
      relax(vertex, edge);
    }
  }

  return distance.slice(1);
};

const getDistancesMatrix = (vertexes, edgesArray) => {
  const adjacencyList = Array.from({ length: vertexes + 1 }, () => []);
  edgesArray.forEach((edge) => {
    if (edge[0] === edge[1]) return;
    adjacencyList[edge[0]].push({ to: edge[1], weight: edge[2] });
    adjacencyList[edge[1]].push({ to: edge[0], weight: edge[2] });
  });

  const result = [];
  for (let i = 1; i <= vertexes; i++) {
    result.push(dijkstra(vertexes, adjacencyList, i));
  }

  return result
    .map((line) => line.map((item) => (item === Number.MAX_VALUE ? -1 : item)).join(" "))
    .join("\n");
};

function solve() {
  const [vertexes, edges] = readIntLine();
  const edgesArray = readIntArray(edges);

  process.stdout.write(getDistancesMatrix(vertexes, edgesArray));
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
