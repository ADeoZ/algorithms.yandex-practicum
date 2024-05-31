/**
 * Определите все расстановки из n ферзей на шахматной доске n×n, где ферзи не
 * могут бить друг друга.
 * В качестве ответа на задачу выведите в первой строке число расстановок, а
 * далее все расстановки в следующем формате: одна расстановка описывается n
 * числами. i-е число описывает i-ую строку доски, а именно оно равно номеру
 * клетки, в которой стоит ферзь на текущей строке. Строки нумеруются сверху
 * вниз от 1 до n. Клетки внутри строки нумеруются от 1 до n слева направо.
 */

const checkCombinations = (combinations, start, n, current, result) => {
  if (start >= n * n) result.push(current);

  for (let i = start; i < start + n; i++) {
    if (!combinations[i]) continue;
    let newCombinations = [...combinations];

    for (let x = i; x < n * n; x += n) {
      newCombinations[x] = false;
      const shift = (x - i) / n;
      const startRow = x - (x % n);
      if (x - shift >= startRow) newCombinations[x - shift] = false;
      if (x + shift < startRow + n) newCombinations[x + shift] = false;
    }

    checkCombinations(newCombinations, start + n, n, [...current, (i % n) + 1], result);
  }
};

function getAllPeacefulCombinations(n) {
  const combinations = new Array(n * n).fill(true);

  const result = [];
  checkCombinations(combinations, 0, n, [], result);

  return result;
}

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

function solve() {
  const n = readInt();
  const combinations = getAllPeacefulCombinations(n);
  outputAnswer(combinations);
}

function outputAnswer(combinations) {
  process.stdout.write(`${combinations.length}\n`);
  for (let combination of combinations) {
    process.stdout.write(`${combination.join(" ")}\n`);
  }
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}
