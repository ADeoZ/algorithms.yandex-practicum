/**
 * Задан неориентированный граф. Обойдите поиском в ширину все вершины,
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

const BFS = (vertexes, edgesArray, start) => {
  const visited = new Array(vertexes + 1).fill(false);
  const result = [];
  const adjacencyList = Array.from({ length: vertexes + 1 }, () => []);
  edgesArray.forEach((edge) => {
    adjacencyList[edge[0]].push(edge[1]);
    adjacencyList[edge[1]].push(edge[0]);
  });

  const queue = new Queue(vertexes);
  queue.push(start);

  while (queue.size > 0) {
    const v = queue.pop();
    if (!visited[v]) {
      const outgoingEdges = adjacencyList[v].sort((a, b) => a - b);
      for (edge of outgoingEdges) {
        if (!visited[edge]) queue.push(edge);
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

  process.stdout.write(BFS(vertexes, edgesArray, start));
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
