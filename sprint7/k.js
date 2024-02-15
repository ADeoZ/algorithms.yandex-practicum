/**
 * В мире последовательностей нет гороскопов.
 * Поэтому когда две последовательности хотят понять,
 * могут ли они счастливо жить вместе, они оценивают
 * свою совместимость как длину их наибольшей общей
 * подпоследовательности.
 * Подпоследовательность получается из последовательности
 * удалением некоторого (возможно, нулевого) числа
 * элементов. То есть элементы сохраняют свой
 * относительный порядок, но не обязаны изначально
 * идти подряд.
 * Найдите наибольшую общую подпоследовательность
 * двух одиноких последовательностей и выведите её!
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

const getLongestCommonSubsequence = (first, second) => {
  const counter = Array.from({ length: first.length }, () => []);

  for (let x = 0; x < first.length; x++) {
    for (let y = 0; y < second.length; y++) {
      if (first[x] === second[y]) {
        const prev = x > 0 && y > 0 ? counter[x - 1][y - 1] : 0;
        counter[x].push(prev + 1);
      } else {
        const left = y > 0 ? counter[x][y - 1] : 0;
        const up = x > 0 ? counter[x - 1][y] : 0;
        counter[x].push(Math.max(left, up));
      }
    }
  }

  let x = first.length - 1;
  let y = second.length - 1;
  const max = counter[x][y];
  let firstResult = "";
  let secondResult = "";
  while (x >= 0 && y >= 0) {
    if (first[x] === second[y]) {
      firstResult = `${x + 1} ${firstResult}`;
      secondResult = `${y + 1} ${secondResult}`;
      x--;
      y--;
    } else {
      if (x === 0) y--;
      else if (y === 0 || counter[x - 1][y] > counter[x][y - 1]) x--;
      else y--;
    }
  }

  return [max, firstResult, secondResult].join("\n");
};

function solve() {
  const fL = readInt();
  const first = readIntLine();
  const sL = readInt();
  const second = readIntLine();

  process.stdout.write(getLongestCommonSubsequence(first, second));
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readIntLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line.split(" ").map(Number);
}
