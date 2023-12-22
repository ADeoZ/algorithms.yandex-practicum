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
  constructor(key, value, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor(key, value) {
    this.head = new Node(key, value);
  }

  // добавление будем производить в начало списка,
  // так как не влияет на последующие операции, но быстрее
  add(key, value) {
    const newNode = new Node(key, value, this.head);
    this.head = newNode;
  }

  find(key) {
    let node = this.head;
    while (node) {
      if (node.key === key) return node;
      node = node.next;
    }
    return undefined;
  }

  delete(key) {
    let current = this.head;
    let prev = null;

    while (current) {
      if (current.key === key) {
        if (prev === null) {
          this.head = current.next;
        } else prev.next = current.next;
        return current;
      }
      prev = current;
      current = current.next;
    }
    throw new Error("None");
  }
}

class HashTable {
  constructor(size) {
    this.table = new Array(size).fill(null);
    this.mod = size;
  }

  getHash(key) {
    return Number(key);
  }

  getBucket(key) {
    const hash = this.getHash(key);
    return ((hash % this.mod) + this.mod) % this.mod;
  }

  get(key) {
    const bucket = this.getBucket(key);
    if (this.table[bucket]) {
      const bucketList = this.table[bucket];
      const existedNode = bucketList.find(key);
      if (existedNode) return existedNode.value;
    }
    throw new Error("None");
  }

  put(key, value) {
    const bucket = this.getBucket(key);
    if (this.table[bucket]) {
      const bucketList = this.table[bucket];
      const existedNode = bucketList.find(key);
      if (existedNode) existedNode.value = value;
      else bucketList.add(key, value);
    } else this.table[bucket] = new LinkedList(key, value);
  }

  delete(key) {
    const bucket = this.getBucket(key);
    if (this.table[bucket]) {
      const bucketList = this.table[bucket];
      const deleteNode = bucketList.delete(key);
      // если значение было единственным, очищаем ячейку
      if (bucketList.head === null) this.table[bucket] = null;
      return deleteNode.value;
    } else throw new Error("None");
  }
}

function solve() {
  const commandsCount = readInt();
  const commands = readLineArray(commandsCount);

  // размер для 10^5 ключей по условию
  // + запас для максимальной заполненности не более 65%
  // + приведение к ближайшему простому числу
  const HASH_TABLE_SIZE = 153871;
  const hashTable = new HashTable(HASH_TABLE_SIZE);

  let result = "";
  commands.forEach((commandLine) => {
    let [command, ...values] = commandLine.split(" ");
    values = values.map(Number);
    try {
      if (command === "get") {
        result += `${hashTable.get(values[0])}\n`;
      }
      if (command === "put") {
        hashTable.put(values[0], values[1]);
      }
      if (command === "delete") {
        result += `${hashTable.delete(values[0])}\n`;
      }
    } catch (e) {
      result += `None\n`;
    }
  });

  process.stdout.write(result);
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

function readLineArray(lines) {
  const array = new Array(lines);
  for (let i = 0; i < lines; i++) {
    array[i] = readLine();
  }
  return array;
}
