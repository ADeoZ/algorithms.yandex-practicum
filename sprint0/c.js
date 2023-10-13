// Вам дана статистика по числу запросов в секунду к вашему любимому рекомендательному сервису.
// Измерения велись n секунд.
// В секунду i поступает qi запросов.
// Примените метод скользящего среднего с длиной окна k к этим данным и выведите результат.

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

function movingAverage(array, windowSize) {
  const result = [];
  let currentSum = array.slice(0, windowSize).reduce((s, i) => s + i, 0);
  result.push(currentSum / windowSize);
  for (let i = 0; i < array.length - windowSize; i++) {
    currentSum = currentSum - array[i] + array[i + windowSize];
    result.push(currentSum / windowSize);
  }
  return result;
}

function solve() {
  const n = readInt();
  const arr = readArray();
  const windowSize = readInt();
  process.stdout.write(`${movingAverage(arr, windowSize).join(" ")}`);
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
