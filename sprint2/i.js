/**
 * Астрологи объявили день очередей ограниченного размера.
 * Тимофею нужно написать класс MyQueueSized, который принимает параметр max_size,
 * означающий максимально допустимое количество элементов в очереди.
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

class MyQueueSized {
  constructor(max_size) {
    this.queue = new Array(max_size).fill(null);
    this.maxSize = max_size;
    this.head = 0;
    this.tail = 0;
    this.size = 0;
  }

  push(x) {
    if (this.size === this.maxSize) return "error";
    this.queue[this.tail] = x;
    this.tail = (this.tail + 1) % this.maxSize;
    this.size++;
  }

  pop() {
    if (this.size === 0) return "None";
    const x = this.queue[this.head];
    this.queue[this.head] = null;
    this.head = (this.head + 1) % this.maxSize;
    this.size--;
    return x;
  }

  peek() {
    if (this.size === 0) return "None";
    return this.queue[this.head];
  }
}

function solve() {
  const comCount = readInt();
  const maxSize = readInt();
  const queue = new MyQueueSized(maxSize);

  for (let i = 0; i < comCount; i++) {
    const command = readLine();
    if (command.includes("push")) {
      const value = Number(command.split(" ")[1]);
      if (queue.push(value) === "error") console.log("error");
    }
    if (command.includes("pop")) {
      console.log(queue.pop());
    }
    if (command.includes("peek")) {
      console.log(queue.peek());
    }
    if (command.includes("size")) {
      console.log(queue.size);
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
