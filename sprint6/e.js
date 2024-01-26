/**
 * Вам дан неориентированный граф. Найдите его компоненты связности.
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

const BFS = (start, adjacencyList, visited) => {
  const result = [];
  const queue = new Queue();
  queue.push(start);

  while (queue.size > 0) {
    const v = queue.pop();
    if (!visited[v]) {
      const outgoingEdges = adjacencyList[v];
      for (edge of outgoingEdges) {
        if (!visited[edge]) queue.push(edge);
      }
      result.push(v);
      visited[v] = true;
    }
  }

  return result.sort((a, b) => a - b).join(" ");
};

const getConnectivityComponents = (vertexes, edgesArray) => {
  const visited = new Array(vertexes + 1).fill(false);
  const adjacencyList = Array.from({ length: vertexes + 1 }, () => []);
  edgesArray.forEach((edge) => {
    adjacencyList[edge[0]].push(edge[1]);
    adjacencyList[edge[1]].push(edge[0]);
  });
  const components = [];

  for (let i = 1; i <= vertexes; i++) {
    if (!visited[i]) {
      components.push(BFS(i, adjacencyList, visited));
    }
  }

  return components;
};

function solve() {
  const [vertexes, edges] = readLine().split(" ").map(Number);
  const edgesArray = readIntArray(edges);

  const components = getConnectivityComponents(vertexes, edgesArray);
  process.stdout.write(`${components.length}`);
  process.stdout.write("\n");
  process.stdout.write(components.join("\n"));
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
