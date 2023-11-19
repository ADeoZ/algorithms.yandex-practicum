/**
 * Основная теорема арифметики говорит: любое число раскладывается
 * на произведение простых множителей единственным образом,
 * с точностью до их перестановки.
 * Разложение числа на простые множители называется факторизацией числа.
 * Напишите программу, которая производит факторизацию переданного числа.
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

function factorize(number) {
  const res = [];
  const limit = Math.sqrt(number);
  for (let i = 2; i < limit; ) {
    if (number % i === 0) {
      res.push(i);
      number = number / i;
    } else {
      i++;
    }
  }
  if (number > 1) res.push(number);
  return res;
}

function solve() {
  const number = readInt();
  const factorization = factorize(number);
  process.stdout.write(`${factorization.join(" ")}`);
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}
