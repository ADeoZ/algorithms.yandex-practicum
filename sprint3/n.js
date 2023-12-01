/**
 * Алла захотела, чтобы у неё под окном были узкие клумбы с тюльпанам.
 * На схеме земельного участка клумбы обозначаются просто горизонтальными отрезками,
 * лежащими на одной прямой. Для ландшафтных работ было нанято n садовников.
 * Каждый из них обрабатывал какой-то отрезок на схеме. Процесс был организован не очень хорошо,
 * иногда один и тот же отрезок или его часть могли быть обработаны сразу несколькими садовниками.
 * Таким образом, отрезки, обрабатываемые двумя разными садовниками, сливаются в один.
 * Непрерывный обработанный отрезок затем станет клумбой. Нужно определить границы будущих клумб.
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

const mergeSortLines = (array) => {
  if (array.length === 1) return array;

  const mid = Math.floor(array.length / 2);
  const leftArray = mergeSortLines(array.slice(0, mid));
  const rightArray = mergeSortLines(array.slice(mid));

  const result = new Array(array.length);
  let left = (right = i = 0);
  while (left < leftArray.length && right < rightArray.length) {
    if (leftArray[left][0] > rightArray[right][0]) {
      result[i] = rightArray[right];
      right++;
    } else {
      result[i] = leftArray[left];
      left++;
    }
    i++;
  }

  while (left < leftArray.length) {
    result[i] = leftArray[left];
    left++;
    i++;
  }
  while (right < rightArray.length) {
    result[i] = rightArray[right];
    right++;
    i++;
  }

  return result;
};

const getflowerBeds = (lines) => {
  const result = [lines[0]];
  for (i = 1; i < lines.length; i++) {
    const flowerBed = result[result.length - 1];
    if (lines[i][0] <= flowerBed[1]) {
      flowerBed[1] = lines[i][1] < flowerBed[1] ? flowerBed[1] : lines[i][1];
    } else {
      result.push(lines[i]);
    }
  }
  return result;
};

function solve() {
  const rows = readInt();
  const linesArray = readMatrix(rows);

  const flowerBeds = getflowerBeds(mergeSortLines(linesArray));
  flowerBeds.forEach((flowerBed) => console.log(flowerBed.join(" ")));
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readIntArray() {
  const arr = _inputLines[_curLine]
    .trim()
    .split(" ")
    .map((num) => Number(num));
  _curLine++;
  return arr;
}

function readMatrix(rowsCount) {
  const arr = [];
  for (let i = 0; i !== rowsCount; i++) {
    arr.push(readIntArray());
  }
  return arr;
}
