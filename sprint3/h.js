/**
 * Вечером ребята решили поиграть в игру «Большое число».
 * Даны числа. Нужно определить, какое самое большое число можно из них составить.
 */

const _readline = require("readline");

const _reader = _readline.createInterface({
  input: process.stdin,
});

const _inputLines = [];
let _curLine = 1;

_reader.on("line", (line) => {
  _inputLines.push(line);
});

process.stdin.on("end", solve);

const aLessOrEqualB = (a, b) => {
  return `${a}${b}` < `${b}${a}`;
};

const megaNumber = (array) => {
  if (array.length === 1) return array;

  const mid = Math.floor(array.length / 2);
  const leftArray = megaNumber(array.slice(0, mid));
  const rightArray = megaNumber(array.slice(mid));

  const result = new Array(array.length);
  let left = (right = i = 0);
  while (left < leftArray.length && right < rightArray.length) {
    if (aLessOrEqualB(leftArray[left], rightArray[right])) {
      result[i] = rightArray[right];
      right++;
    } else {
      result[i] = leftArray[left];
      left++;
    }
    i++;
  }

  while (left < leftArray.length) {
    result[i] = leftArray[left];
    left++;
    i++;
  }
  while (right < rightArray.length) {
    result[i] = rightArray[right];
    right++;
    i++;
  }

  return result;
};

function solve() {
  const array = readIntArray();

  process.stdout.write(megaNumber(array).join(""));
}

function readIntArray() {
  const arr = _inputLines[_curLine].trim(" ").split(" ").map(Number);
  _curLine++;
  return arr;
}
