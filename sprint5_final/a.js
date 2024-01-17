/**
 * В данной задаче необходимо реализовать сортировку кучей.
 * При этом кучу необходимо реализовать самостоятельно, использовать имеющиеся в языке реализации нельзя.
 * Тимофей решил организовать соревнование по спортивному программированию,
 * чтобы найти талантливых стажёров. Задачи подобраны, участники зарегистрированы, тесты написаны.
 * Осталось придумать, как в конце соревнования будет определяться победитель.
 * Каждый участник имеет уникальный логин. Когда соревнование закончится,
 * к нему будут привязаны два показателя: количество решённых задач Pi и размер штрафа Fi.
 * Штраф начисляется за неудачные попытки и время, затраченное на задачу.
 * Тимофей решил сортировать таблицу результатов следующим образом: при сравнении двух участников
 * выше будет идти тот, у которого решено больше задач. При равенстве числа решённых задач
 * первым идёт участник с меньшим штрафом. Если же и штрафы совпадают, то первым будет тот,
 * у которого логин идёт раньше в алфавитном (лексикографическом) порядке.
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

class Heap {
  constructor() {
    this.heap = [-1];
    this.size = 0;
  }

  // компаратор
  isAGreaterB(first, second) {
    return this.heap[first] > this.heap[second];
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

class HeapWinners extends Heap {
  // компаратор для расчёта позиций участников
  isAGreaterB(playerA, playerB) {
    const [loginA, tasksA, penA] = this.heap[playerA];
    const [loginB, tasksB, penB] = this.heap[playerB];

    if (tasksA !== tasksB) return tasksA > tasksB;
    else if (penA !== penB) return penA < penB;
    else if (loginA !== loginB) return loginA < loginB;
    return true;
  }
}

const heapWinnersSort = (resultsArray) => {
  const heapWinners = new HeapWinners();
  resultsArray.forEach((result) => heapWinners.add(result));
  let result = "";
  while (heapWinners.size) {
    result += `${heapWinners.getMax()[0]}\n`;
  }
  return result;
};

function solve() {
  const players = readInt();
  const playerResults = readResultsMatrix(players);

  const resultsTable = heapWinnersSort(playerResults);
  process.stdout.write(resultsTable);
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readResultsArray() {
  const arr = _inputLines[_curLine].trim().split(" ");
  arr[1] = Number(arr[1]);
  arr[2] = Number(arr[2]);
  _curLine++;
  return arr;
}

function readResultsMatrix(rowsCount) {
  const arr = [];
  for (let i = 0; i !== rowsCount; i++) {
    arr.push(readResultsArray());
  }
  return arr;
}
