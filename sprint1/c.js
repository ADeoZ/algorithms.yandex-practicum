/**
 * Дана матрица. Нужно написать функцию, которая для элемента возвращает всех его соседей.
 * Соседним считается элемент, находящийся от текущего на одну ячейку влево, вправо,
 * вверх или вниз. Диагональные элементы соседними не считаются.
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

function getNeighbours(rows, cols, matrix, rowId, colId) {
  const neighbours = [];

  if (rowId < rows - 1) {
    neighbours.push(matrix[rowId + 1][colId]);
  }
  if (rowId > 0) {
    neighbours.push(matrix[rowId - 1][colId]);
  }
  if (colId < cols - 1) {
    neighbours.push(matrix[rowId][colId + 1]);
  }
  if (colId > 0) {
    neighbours.push(matrix[rowId][colId - 1]);
  }

  return neighbours.sort((a, b) => a - b);
}

function solve() {
  const rows = readInt();
  const cols = readInt();
  const matrix = readMatrix(rows);
  const rowId = readInt();
  const colId = readInt();

  process.stdout.write(`${getNeighbours(rows, cols, matrix, rowId, colId).join(" ")}`);
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

function readMatrix(rowsCount) {
  var arr = [];
  for (let i = 0; i !== rowsCount; i++) {
    arr.push(readArray());
  }
  return arr;
}
