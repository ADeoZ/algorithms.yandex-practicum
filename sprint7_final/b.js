/**
 * На Алгосах устроили турнир по настольному теннису.
 * Гоша выиграл n партий, получив при этом некоторое
 * количество очков за каждую из них.
 * Гоше стало интересно, можно ли разбить все
 * заработанные им во время турнира очки на две части
 * так, чтобы сумма в них была одинаковой.
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

const isSplitsEqual = (scores) => {
  // считаем сумму, так как будем искать набор цифр, которые составят половину от неё
  const totalSum = scores.reduce((sum, score) => sum + score, 0);
  // если сумма не делится пополам ровно, значит такого набора целых чисел также не будет
  if (totalSum % 2 === 1) return false;
  const halfSum = totalSum / 2;

  // будем использовать две строки значений — предыдущие и текущие
  let prevSums;
  let curSums = new Array(halfSum + 1).fill(0);

  for (let x = 1; x <= scores.length; x++) {
    // на каждом шаге сменяем строки значений
    prevSums = curSums;
    curSums = new Array(halfSum + 1);

    for (let y = 0; y <= halfSum; y++) {
      const value = scores[x - 1];
      // если нужная сумма меньше значения числа, то берём лучший вариант из предыдущего ряда
      if (y < value) curSums[y] = prevSums[y];
      // иначе берём максимальное: или из предыдущего ряда, или значение числа + остаток
      else curSums[y] = Math.max(prevSums[y], prevSums[y - value] + value);
    }
  }

  // если смогли набрать сумму равную половине общей суммы, значит такое деление возможно
  return curSums[halfSum] === halfSum;
};

function solve() {
  const scores = readIntLine();

  process.stdout.write(isSplitsEqual(scores) ? "True" : "False");
}

function readIntLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line.split(" ").map(Number);
}
