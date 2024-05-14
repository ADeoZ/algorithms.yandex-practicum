/**
 * Вам дан массив натуральных чисел a. Найдите число таких пар элементов a, где
 * |a1 - a2| % 200 === 0.
 */

function getNumberOfGoodPairs(numbers) {
  if (numbers.length <= 1) return 0;

  let counter = 0;
  let rest = new Map();

  for (let i = 0; i < numbers.length; i++) {
    const divRest = numbers[i] % 200;
    if (rest.has(divRest)) {
      let times = rest.get(divRest);
      counter += times;
      rest.set(divRest, ++times);
    } else rest.set(divRest, 1);
  }

  return counter;
}

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

function solve() {
  const numbers = readArray();
  const ans = getNumberOfGoodPairs(numbers);
  console.log(ans);
}

function readArray() {
  var arr = _inputLines[_curLine]
    .trim(" ")
    .split(" ")
    .map((num) => Number(num));
  _curLine++;
  return arr;
}
