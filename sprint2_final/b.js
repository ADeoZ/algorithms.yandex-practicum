/**
 * Задание связано с обратной польской нотацией.
 * Она используется для парсинга арифметических выражений.
 * Еще её иногда называют постфиксной нотацией.
 * В постфиксной нотации операнды расположены перед знаками операций.
 * Для вычисления значения выражения, записанного в обратной польской нотации,
 * нужно считывать выражение слева направо.
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

const polishCalc = (line) => {
  const stackOperands = [];
  const expression = line.split(" ");
  const operatorsFn = {
    "+": (a, b) => b + a,
    "-": (a, b) => b - a,
    "*": (a, b) => b * a,
    "/": (a, b) => Math.floor(b / a),
  };

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if (char in operatorsFn) {
      const operationResult = operatorsFn[char](stackOperands.pop(), stackOperands.pop());
      stackOperands.push(operationResult);
    } else if (!isNaN(char)) {
      stackOperands.push(Number(char));
    } else {
      throw new Error("This is not a number!");
    }
  }

  return stackOperands.pop();
};

function solve() {
  const expression = readLine();

  try {
    process.stdout.write(`${polishCalc(expression)}`);
  } catch (e) {
    console.log("error");
  }
}

function readLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line;
}
