/**
 * Под расстоянием между двумя вершинами в графе будем понимать длину
 * кратчайшего пути между ними в рёбрах. Для данной вершины s определите
 * максимальное расстояние от неё до другой вершины неориентированного графа.
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

class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  push(x) {
    const newNode = new Node(x, null);
    if (this.size === 0) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
    }
    this.tail = newNode;
    this.size++;
  }

  pop() {
    if (this.size === 0) {
      return "error";
    }
    const head = this.head;
    this.head = this.head.next;
    this.size--;
    return head.value;
  }
}

const findMaximumPath = (vertexes, edgesArray, start) => {
  const visited = new Array(vertexes + 1).fill(false);
  const adjacencyList = Array.from({ length: vertexes + 1 }, () => []);
  edgesArray.forEach((edge) => {
    adjacencyList[edge[0]].push(edge[1]);
    adjacencyList[edge[1]].push(edge[0]);
  });

  const distance = new Array(vertexes + 1).fill(-1);
  const previous = new Array(vertexes + 1).fill(null);
  const queue = new Queue();
  queue.push(start);
  visited[start] = true;
  distance[start] = 0;
  let maxDistance = 0;

  while (queue.size > 0) {
    const v = queue.pop();

    const outgoingEdges = adjacencyList[v];
    for (edge of outgoingEdges) {
      if (!visited[edge]) {
        queue.push(edge);
        previous[edge] = v;
        distance[edge] = distance[v] + 1;
        if (distance[edge] > maxDistance) maxDistance = distance[edge];
        visited[edge] = true;
      }
    }
  }

  return maxDistance;
};

function solve() {
  const [vertexes, edges] = readIntLine();
  const edgesArray = readIntArray(edges);
  const [start] = readIntLine();

  process.stdout.write(`${findMaximumPath(vertexes, edgesArray, start)}`);
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
