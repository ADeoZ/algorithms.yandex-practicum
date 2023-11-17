/**
 * Вася реализовал функцию, которая переводит целое число из десятичной системы в двоичную.
 * Но, кажется, она получилась не очень оптимальной.
 * Попробуйте написать более эффективную программу.
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

function getBinaryNumber(number) {
  if (number === 0) return 0;
  let rest = number;
  let result = "";
  while (rest > 0) {
    result = (rest % 2) + result;
    rest = Math.trunc(rest / 2);
  }
  return result;
}

function solve() {
  const n = readInt();
  process.stdout.write(`${getBinaryNumber(n)}`);
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}
