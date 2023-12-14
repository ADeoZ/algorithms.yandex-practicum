/**
 * Жители Алгосов любят устраивать турниры по спортивному программированию.
 * Все участники разбиваются на пары и соревнуются друг с другом.
 * А потом два самых сильных программиста встречаются в финальной схватке,
 * которая состоит из нескольких раундов. Если в очередном раунде выигрывает
 * первый участник, в таблицу с результатами записывается 0, если второй,
 * то 1. Ничьей в раунде быть не может.
 * Нужно определить наибольший по длине непрерывный отрезок раундов,
 * по результатам которого суммарно получается ничья.
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

const getMaximumDrawSeries = (scores) => {
  const sumHash = new Map();
  let sum = 0;
  let maxSeries = 0;

  for (let i = 0; i < scores.length; i++) {
    sum += scores[i] === 0 ? -1 : 1;
    if (sum === 0 && maxSeries < i + 1) maxSeries = i + 1;

    if (sumHash.has(sum)) {
      const series = i - sumHash.get(sum);
      if (maxSeries < series) maxSeries = series;
    } else sumHash.set(sum, i);
  }

  return maxSeries;
};

function solve() {
  const array = readIntArray();

  process.stdout.write(`${getMaximumDrawSeries(array)}`);
}

function readIntArray() {
  const arr = _inputLines[_curLine].trim(" ").split(" ").map(Number);
  _curLine++;
  return arr;
}
