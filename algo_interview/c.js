/**
 * Вам дана матрица из n строк и m столбцов, заполненная натуральными числами.
 * По матрице можно перемещаться, из клетки можно уходить только в соседнюю по
 * стороне клетку, переходы по диагонали, а также выход за границу матрицы
 * запрещены.
 * Ваша задача — найти наиболее длинный возрастающий путь в матрице. Путь
 * возрастающий, если значения в посещаемых клетках строго возрастают от начала
 * пути к его концу.
 */

function getLongestIncreasingPath(rows, columns, matrix) {
  const maxPaths = Array.from({ length: rows }, () => new Array(columns).fill(0));

  let longestPath = 0;
  function getMaxPath(x, y) {
    const current = matrix[x][y];
    let maxPath = 0;
    // top
    if (x > 0 && matrix[x - 1][y] > current) {
      if (maxPaths[x - 1][y]) maxPath = Math.max(maxPath, maxPaths[x - 1][y]);
      else maxPath = Math.max(maxPath, getMaxPath(x - 1, y));
    }

    // right
    if (y < columns - 1 && matrix[x][y + 1] > current) {
      if (maxPaths[x][y + 1]) maxPath = Math.max(maxPath, maxPaths[x][y + 1]);
      else maxPath = Math.max(maxPath, getMaxPath(x, y + 1));
    }

    // bottom
    if (x < rows - 1 && matrix[x + 1][y] > current) {
      if (maxPaths[x + 1][y]) maxPath = Math.max(maxPath, maxPaths[x + 1][y]);
      else maxPath = Math.max(maxPath, getMaxPath(x + 1, y));
    }

    // left
    if (y > 0 && matrix[x][y - 1] > current) {
      if (maxPaths[x][y - 1]) maxPath = Math.max(maxPath, maxPaths[x][y - 1]);
      else maxPath = Math.max(maxPath, getMaxPath(x, y - 1));
    }

    maxPath++;
    maxPaths[x][y] = maxPath;
    longestPath = Math.max(longestPath, maxPath);

    return maxPath;
  }

  for (x = 0; x < rows; x++) {
    for (y = 0; y < columns; y++) {
      if (!maxPaths[x][y]) getMaxPath(x, y);
    }
  }

  return longestPath;
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
  const [rows, columns] = readArray();
  const matrix = readMatrix(rows);
  const ans = getLongestIncreasingPath(rows, columns, matrix);
  console.log(ans);
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

function readMatrix(rows) {
  let matrix = [];
  for (let i = 0; i < rows; i++) {
    matrix.push(readArray());
  }
  return matrix;
}
