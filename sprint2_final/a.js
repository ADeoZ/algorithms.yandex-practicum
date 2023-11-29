/**
 * Гоша реализовал структуру данных Дек, максимальный размер которого определяется заданным числом.
 * Методы push_back(x), push_front(x), pop_back(), pop_front() работали корректно.
 * Но, если в деке было много элементов, программа работала очень долго.
 * Дело в том, что не все операции выполнялись за O(1). Помогите Гоше!
 * Напишите эффективную реализацию.
 * Внимание: при реализации используйте кольцевой буфер.
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

class DequeSized {
  constructor(maxSize) {
    this.deque = new Array(maxSize).fill(null);
    this.maxSize = maxSize;
    this.head = 0;
    this.tail = 0;
    this.size = 0;
  }

  pushBack(x) {
    this.isDequeFull();
    this.deque[this.tail] = x;
    this.tail = this.increaseIterator(this.tail);
    this.size++;
  }

  pushFront(x) {
    this.isDequeFull();
    this.head = this.decreaseIterator(this.head);
    this.deque[this.head] = x;
    this.size++;
  }

  popFront() {
    this.isDequeEmpty();
    const x = this.deque[this.head];
    this.deque[this.head] = null;
    this.head = this.increaseIterator(this.head);
    this.size--;
    return x;
  }

  popBack() {
    this.isDequeEmpty();
    this.tail = this.decreaseIterator(this.tail);
    const x = this.deque[this.tail];
    this.deque[this.tail] = null;
    this.size--;
    return x;
  }

  isDequeEmpty() {
    if (this.size === 0) throw new Error("Empty deque");
  }

  isDequeFull() {
    if (this.size === this.maxSize) throw new Error("Size exceeded");
  }

  increaseIterator(previousValue) {
    return (previousValue + 1) % this.maxSize;
  }

  decreaseIterator(previousValue) {
    return (previousValue + this.maxSize - 1) % this.maxSize;
  }
}

function solve() {
  const comCount = readInt();
  const maxSize = readInt();
  const deque = new DequeSized(maxSize);

  for (let i = 0; i < comCount; i++) {
    const command = readLine();

    try {
      if (command.includes("push_back")) {
        const value = Number(command.split(" ")[1]);
        deque.pushBack(value);
      }
      if (command.includes("push_front")) {
        const value = Number(command.split(" ")[1]);
        deque.pushFront(value);
      }
      if (command.includes("pop_front")) {
        console.log(`${deque.popFront()}`);
      }
      if (command.includes("pop_back")) {
        console.log(`${deque.popBack()}`);
      }
    } catch (e) {
      console.log("error");
    }
  }
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
