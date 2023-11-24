/**
 * Реализуйте класс StackMaxEffective, поддерживающий операцию
 * определения максимума среди элементов в стеке.
 * Сложность операции должна быть O(1). Для пустого стека
 * операция должна возвращать None. При этом push(x) и pop()
 * также должны выполняться за константное время.
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

class StackMaxEffective {
  constructor() {
    this.stack = [];
    this.size = 0;
    this.maxValues = [];
  }

  push(x) {
    this.stack.push(x);
    if (x >= this.get_max() || this.maxValues.length === 0) this.maxValues.push(x);
    this.size++;
  }

  pop() {
    if (this.size) {
      const deleted = this.stack.pop();
      if (deleted === this.get_max()) this.maxValues.pop();
      return deleted;
    } else {
      return undefined;
    }
  }

  get_max() {
    if (this.size) {
      return this.maxValues[this.maxValues.length - 1];
    } else {
      return null;
    }
  }
}

function solve() {
  const comCount = readInt();
  const stack = new StackMaxEffective();

  for (let i = 0; i < comCount; i++) {
    const command = readLine();
    if (command.includes("pop")) {
      if (stack.pop() === undefined) console.log("error");
    }
    if (command.includes("get_max")) {
      const maxValue = stack.get_max();
      console.log(maxValue == null ? "None" : maxValue);
    }
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
