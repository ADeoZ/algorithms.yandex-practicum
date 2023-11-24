/**
 * Нужно реализовать класс StackMax, который поддерживает операцию
 * определения максимума среди всех элементов в стеке.
 * Класс должен поддерживать операции push(x), где x – целое число,
 * pop() и get_max().
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

class StackMax {
  constructor() {
    this.stack = [];
  }

  push(x) {
    this.stack.push(x);
  }

  pop() {
    if (this.stack.length) {
      this.stack.pop();
    } else {
      console.log("error");
    }
  }

  get_max() {
    if (this.stack.length) {
      console.log(Math.max(...this.stack));
    } else {
      console.log("None");
    }
  }
}

function solve() {
  const comCount = readInt();
  const stack = new StackMax();

  for (let i = 0; i < comCount; i++) {
    const command = readLine();
    if (command.includes("pop")) stack.pop();
    if (command.includes("get_max")) stack.get_max();
    if (command.includes("push")) {
      const value = Number(command.split(" ")[1]);
      stack.push(value);
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
