/**
 * Напишите программу, которая определяет,
 * будет ли положительное целое число степенью четвёрки.
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

function isPowerOfFour(number) {
  let pow = 1;
  while (pow < number) {
    pow = pow * 4;
  }
  return pow === number ? true : false;
}

function solve() {
  const number = readInt();
  if (isPowerOfFour(number)) {
    console.log("True");
  } else {
    console.log("False");
  }
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}
