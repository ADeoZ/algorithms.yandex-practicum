/**
 * Представьте себе онлайн-игру для поездки в метро: игрок нажимает на кнопку,
 * и на экране появляются три случайных числа. Если все три числа оказываются одной чётности,
 * игрок выигрывает.
 * Напишите программу, которая по трём числам определяет, выиграл игрок или нет.
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

function checkParity(a, b, c) {
  const isAeven = a % 2 === 0;
  const isBeven = b % 2 === 0;
  const isCeven = c % 2 === 0;
  return isAeven === isBeven && isBeven === isCeven ? "WIN" : "FAIL";
}

function solve() {
  const inputNumbers = readArray();
  const a = inputNumbers[0];
  const b = inputNumbers[1];
  const c = inputNumbers[2];
  if (checkParity(a, b, c)) {
    process.stdout.write("WIN");
  } else {
    process.stdout.write("FAIL");
  }
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readArray() {
  var arr = _inputLines[_curLine]
    .trim(" ")
    .split(" ")
    .map((num) => Number(num));
  _curLine++;
  return arr;
}
