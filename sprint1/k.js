/**
 * Вася просил Аллу помочь решить задачу. На этот раз по информатике.
 * Для неотрицательного целого числа X списочная форма –— это массив его цифр слева направо.
 * На вход подается количество цифр числа Х, списочная форма неотрицательного числа Х и
 * неотрицательное число K. Число К не превосходят 10000. Длина числа Х не превосходит 1000.
 * Нужно вернуть списочную форму числа X + K.
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

function getSum(listNumber, k) {
  const listK = [];
  while (k > 0) {
    const right = k % 10;
    listK.unshift(right);
    k = (k - right) / 10;
  }

  const maxLength = Math.max(listNumber.length, listK.length);
  const result = [];
  let rest = 0;
  for (let i = 1; i <= maxLength; i++) {
    const x = listNumber[listNumber.length - i] || 0;
    const y = listK[listK.length - i] || 0;
    const sum = x + y + rest;
    const right = sum % 10;
    result.unshift(right);
    rest = (sum - right) / 10;
  }
  if (rest) result.unshift(rest);

  return result;
}

function solve() {
  const length = readInt();
  const listNumber = readArray();
  const number = readInt();

  process.stdout.write(`${getSum(listNumber, number).join(" ")}`);
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
