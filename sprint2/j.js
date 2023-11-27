/**
 * Любимый вариант очереди Тимофея — очередь,
 * написанная с использованием связного списка.
 * Помогите ему с реализацией.
 * Очередь должна поддерживать выполнение трёх команд:
 * get() — вывести элемент, находящийся в голове очереди,
 * и удалить его. Если очередь пуста, то вывести «error».
 * put(x) — добавить число x в очередь
 * size() — вывести текущий размер очереди
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

class ListQueue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  put(x) {
    const newNode = new Node(x, null);
    if (this.size === 0) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
    }
    this.tail = newNode;
    this.size++;
  }

  get() {
    if (this.size === 0) {
      return "error";
    }
    const head = this.head;
    this.head = this.head.next;
    this.size--;
    return head.value;
  }
}

function solve() {
  const comCount = readInt();
  const queue = new ListQueue();

  for (let i = 0; i < comCount; i++) {
    const command = readLine();
    if (command.includes("put")) {
      const value = Number(command.split(" ")[1]);
      queue.put(value);
    }
    if (command.includes("get")) {
      console.log(queue.get());
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
