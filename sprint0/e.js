// Рита и Гоша играют в игру. У Риты есть n фишек, на каждой из которых написано количество очков.
// Сначала Гоша называет число k, затем Рита должна выбрать две фишки, сумма очков на которых равна заданному числу.
// Рите надоело искать фишки самой, и она решила применить свои навыки программирования для решения этой задачи.
// Помогите ей написать программу для поиска нужных фишек.
// Оптимизированные алгоритмы

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

function twoSumSorted(array, targetSum) {
  const sortedArray = [...array].sort((a, b) => a - b);
  let i = 0;
  let j = sortedArray.length - 1;
  while (i !== j) {
    const a = sortedArray[i];
    const b = sortedArray[j];
    if (a + b === targetSum) return [a, b];
    a + b < targetSum ? i++ : j--;
  }
  return [];
}

function twoSumCached(array, targetSum) {
  const cache = new Set();
  for (let i = 0; i < array.length; i++) {
    if (cache.has(targetSum - array[i])) {
      return [array[i], targetSum - array[i]];
    } else {
      cache.add(array[i]);
    }
  }
  return [];
}

function solve() {
  const n = readInt();
  const array = readArray();
  const targetSum = readInt();
  const ans = twoSumCached(array, targetSum);
  if (ans.length === 0) {
    console.log("None");
  } else {
    process.stdout.write(`${ans.join(" ")}`);
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
