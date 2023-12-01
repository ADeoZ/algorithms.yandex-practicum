/**
 * Чтобы выбрать самый лучший алгоритм для решения задачи,
 * Гоша продолжил изучать разные сортировки. На очереди сортировка пузырьком.
 * Помогите Гоше написать код алгоритма.
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

const bubbleSort = (array) => {
  let hasSwap = null;
  for (let limit = array.length; limit > 0; limit--) {
    for (let i = 1; i < limit; i++) {
      if (array[i - 1] > array[i]) {
        [array[i - 1], array[i]] = [array[i], array[i - 1]];
        hasSwap = true;
      }
    }
    if (hasSwap || hasSwap === null) {
      console.log(array.join(" "));
      hasSwap = false;
    } else {
      break;
    }
  }
};

function solve() {
  const array = readIntArray();

  bubbleSort(array);
}

function readIntArray() {
  const arr = _inputLines[_curLine].trim(" ").split(" ").map(Number);
  _curLine++;
  return arr;
}
