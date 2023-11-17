/**
 * Тимофей записал два числа в двоичной системе счисления и попросил Гошу вывести их сумму,
 * также в двоичной системе.
 * Встроенную в язык программирования возможность сложения двоичных чисел применять нельзя.
 * Помогите Гоше решить задачу.
 * Решение должно работать за O(N), где N –— количество разрядов максимального числа на входе.
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

function sumOfBinaries(firstNumber, secondNumber) {
  let result = "";
  let rest = 0;
  const maxLength = Math.max(firstNumber.length, secondNumber.length);
  for (let i = 1; i <= maxLength; i++) {
    const x = Number(firstNumber[firstNumber.length - i]) || 0;
    const y = Number(secondNumber[secondNumber.length - i]) || 0;

    const sum = x + y + rest;
    if (sum === 0 || sum === 2) result = "0" + result;
    if (sum === 1 || sum === 3) result = "1" + result;
    rest = sum > 1 ? 1 : 0;
  }
  return rest === 1 ? rest + result : result;
}

function solve() {
  const firstNumber = readLine();
  const secondNumber = readLine();
  process.stdout.write(`${sumOfBinaries(firstNumber, secondNumber)}`);
}

function readLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line;
}
