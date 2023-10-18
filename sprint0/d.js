// Рита и Гоша играют в игру. У Риты есть n фишек, на каждой из которых написано количество очков.
// Сначала Гоша называет число k, затем Рита должна выбрать две фишки, сумма очков на которых равна заданному числу.
// Рите надоело искать фишки самой, и она решила применить свои навыки программирования для решения этой задачи.
// Помогите ей написать программу для поиска нужных фишек.

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

function twoSum(array, targetSum) {
  const a = array.pop();
  for (let i = 0; i < array.length; i++) {
    const b = array[i];
    if (a + b === targetSum) return [a, b];
  }
  return array.length <= 1 ? [] : twoSum(array, targetSum);
}

function solve() {
  const n = readInt();
  const array = readArray();
  const targetSum = readInt();
  const ans = twoSum(array, targetSum);
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
