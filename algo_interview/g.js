/**
 * В этой задаче вы будете перекладывать камни. Изначально есть n кучек камней.
 * Кучка i весит x килограммов. Кучки можно объединять. При объединении кучек i
 * и j затрачивается xi + xj единиц энергии, при этом две исходные кучки
 * пропадают и появляется кучка весом xi + xj. Определите наименьшее количество
 * энергии, которое надо затратить для объединения всех кучек в одну.
 */

// Куча
class Heap {
  constructor() {
    this.heap = [-1];
    this.size = 0;
  }

  // компаратор
  isALessB(first, second) {
    return this.heap[first] < this.heap[second];
  }

  // добавление элемента
  add(value) {
    this.heap.push(value);
    this.size++;
    this.siftUp(this.size);
  }

  // извлечение верхнего элемента
  getMin() {
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
    if (this.isALessB(index, parentIndex)) {
      this.swap(parentIndex, index);
      this.siftUp(parentIndex);
    }
  }

  // просеивание вниз
  siftDown(index) {
    const leftIndex = index * 2;
    const rightIndex = index * 2 + 1;

    if (leftIndex > this.size) return;

    const smallerIndex =
      this.heap[rightIndex] == null || this.isALessB(leftIndex, rightIndex) ? leftIndex : rightIndex;

    if (this.isALessB(smallerIndex, index)) {
      this.swap(index, smallerIndex);
      this.siftDown(smallerIndex);
    }
  }
}

function getEnergyForUnion(stones) {
  if (stones.length === 1) return 0;

  const heap = new Heap();
  stones.forEach((stone) => heap.add(stone));

  let result = 0;
  while (heap.size > 1) {
    const smallestSum = heap.getMin() + heap.getMin();
    result += smallestSum;
    heap.add(smallestSum);
  }

  return result;
}

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

function solve() {
  const n = readInt();
  const stones = readArray();
  const ans = getEnergyForUnion(stones);
  console.log(ans);
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readArray() {
  var arr = _inputLines[_curLine]
    .trim(" ")
    .split(" ")
    .map((num) => Number(num));
  _curLine++;
  return arr;
}
