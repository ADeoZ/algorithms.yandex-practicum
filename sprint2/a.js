/**
 * Есть матрица размера m × n. Нужно написать функцию, которая её транспонирует.
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

function transposeMatrix(rows, cols, matrix) {
  const result = new Array(cols);

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (!result[y]) result[y] = [];
      result[y][x] = matrix[x][y];
    }
  }

  return result;
}

function solve() {
  const rows = readInt();
  const cols = readInt();
  const matrix = readMatrix(rows);

  const transposedStrings = transposeMatrix(rows, cols, matrix).map((line) => line.join(" "));
  for (let i = 0; i < transposedStrings.length; i++) {
    process.stdout.write(`${transposedStrings[i]}`);
    process.stdout.write("\n");
  }
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
