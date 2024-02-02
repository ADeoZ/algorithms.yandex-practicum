/**
 * Тимофей решил соединить все компьютеры в своей компании в единую сеть.
 * Для этого он придумал построить минимальное остовное дерево,
 * чтобы эффективнее использовать ресурсы.
 * Но от начальства пришла новость о том, что выделенный на сеть бюджет
 * оказался очень большим и его срочно надо израсходовать.
 * Поэтому Тимофея теперь интересуют не минимальные,
 * а максимальные остовные деревья.
 * Он поручил вам найти вес такого максимального остовного дерева
 * в неориентированном графе, который задаёт схему офиса.
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

// Куча
class Heap {
  constructor(comparator) {
    this.heap = [-1];
    this.size = 0;
    this.comparator = comparator;
  }

  // будем использовать свой компаратор
  isAGreaterB(first, second) {
    if (this.comparator) return this.comparator(this.heap[first], this.heap[second]);
    else return this.heap[first] > this.heap[second];
  }

  // добавление элемента
  add(value) {
    this.heap.push(value);
    this.size++;
    this.siftUp(this.size);
  }

  // извлечение верхнего элемента
  getMax() {
    if (this.size === 0) throw new Error("Heap is empty!");

    this.swap(1, this.size);
    const max = this.heap.pop();
    this.size--;
    this.siftDown(1);
    return max;
  }

  // обмен позициями элементов
  swap(a, b) {
    if (a < 1 || b > this.size) throw new Error("Incorrect index!");

    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  // просеивание вверх
  siftUp(index) {
    if (index === 1) return;
    const parentIndex = Math.trunc(index / 2);
    if (this.isAGreaterB(index, parentIndex)) {
      this.swap(parentIndex, index);
      this.siftUp(parentIndex);
    }
  }

  // просеивание вниз
  siftDown(index) {
    const leftIndex = index * 2;
    const rightIndex = index * 2 + 1;

    if (leftIndex > this.size) return;

    const largestIndex =
      this.heap[rightIndex] == null || this.isAGreaterB(leftIndex, rightIndex) ? leftIndex : rightIndex;

    if (this.isAGreaterB(largestIndex, index)) {
      this.swap(index, largestIndex);
      this.siftDown(largestIndex);
    }
  }
}

class SpanningTree {
  constructor(vertexes, edgesArray) {
    // список смежности
    this.adjacencyList = Array.from({ length: vertexes + 1 }, () => []);
    this.buildAdjacencyList(edgesArray);

    // не обработанные вершины
    this.notAdded = new Set(Array.from({ length: vertexes }, (_, i) => i + 1));
    // все исходящие рёбра в куче по наибольшему весу
    this.treeEdges = new Heap((edgeA, edgeB) => edgeA.weight > edgeB.weight);
  }

  // построение списка смежности
  buildAdjacencyList = (edgesArray) => {
    edgesArray.forEach((edge) => {
      this.adjacencyList[edge[0]].push({ to: edge[1], weight: edge[2] });
      this.adjacencyList[edge[1]].push({ to: edge[0], weight: edge[2] });
    });
  };

  // обработка вершины и получение исходящих рёбер
  addVertex = (vertex) => {
    this.notAdded.delete(vertex);
    const edgesNotAdded = this.adjacencyList[vertex].filter((edge) => this.notAdded.has(edge.to));
    edgesNotAdded.forEach((edge) => this.treeEdges.add(edge));
  };

  // получение вершины с наибольшим весом
  getMaximumEdge = () => {
    return this.treeEdges.getMax();
  };

  // получение максимального остовного дерева
  getMaximumSpanningTreeWeight = () => {
    let spanningTreeWeight = 0;
    this.addVertex(1);

    while (this.notAdded.size && this.treeEdges.size) {
      // продвигаемся только по ребру с максимальным весом
      const edge = this.getMaximumEdge();
      // которое входит в ещё не обработанную ранее вершину
      if (this.notAdded.has(edge.to)) {
        spanningTreeWeight += edge.weight;
        this.addVertex(edge.to);
      }
    }

    // если остались не обработанные вершины, то граф не связный
    if (this.notAdded.size) {
      throw new Error("Oops! I did it again");
    } else return spanningTreeWeight;
  };
}

function solve() {
  const [vertexes, edges] = readIntLine();
  const edgesArray = readIntArray(edges);

  const spanningTree = new SpanningTree(vertexes, edgesArray);

  try {
    const weight = spanningTree.getMaximumSpanningTreeWeight();
    process.stdout.write(`${weight}`);
  } catch (error) {
    process.stdout.write(error.message);
  }
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
