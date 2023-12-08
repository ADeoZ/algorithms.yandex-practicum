/**
 * После того, как Гоша узнал про сортировку слиянием и быструю сортировку,
 * он решил придумать свой метод сортировки, который предполагал бы разделение данных на части.
 * Назвал он свою сортировку Частичной.
 * Этим методом можно отсортировать n уникальных чисел a1, a2, … , an, находящихся в диапазоне от 0 до n - 1.
 * Определите максимальное число блоков, на которое можно разбить исходную последовательность,
 * чтобы сортировка отработала корректно.
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

const getMaxBlocks = (length, numbers) => {
  const sequence = Array(length).fill(false);
  let waiting = 0;
  let blocksCount = 0;

  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];
    sequence[number] = true;
    if (number === waiting) {
      while (waiting <= i) {
        waiting++;
        if (!sequence[waiting]) break;
      }
      if (waiting > i) blocksCount++;
    }
  }

  return blocksCount;
};

function solve() {
  const length = readInt();
  const numbers = readIntArray();

  process.stdout.write(`${getMaxBlocks(length, numbers)}`);
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readIntArray() {
  const arr = _inputLines[_curLine].trim(" ").split(" ").map(Number);
  _curLine++;
  return arr;
}
