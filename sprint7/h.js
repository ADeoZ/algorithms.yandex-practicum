/**
 * Черепаха Кондратина путешествует по клетчатому полю из n строк и m столбцов.
 * В каждой клетке либо растёт цветочек, либо не растёт.
 * Кондратине надо добраться из левого нижнего в правый верхний угол
 * и собрать как можно больше цветочков.
 * Помогите ей с этой сложной задачей и определите, какое наибольшее число
 * цветочков она сможет собрать при условии, что Кондратина умеет передвигаться
 * только на одну клетку вверх или на одну клетку вправо за ход.
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

const collectBouqet = (field) => {
  const cols = field[0].length;
  const rows = field.length;
  let scoreField = Array.from({ length: rows }, () => []);

  for (let x = 0; x < cols; x++) {
    for (let y = rows - 1; y >= 0; y--) {
      const bottom = y < rows - 1 ? scoreField[y + 1][x] : 0;
      const left = x > 0 ? scoreField[y][x - 1] : 0;
      scoreField[y].push(Math.max(bottom, left) + field[y][x]);
    }
  }

  return scoreField[0][cols - 1];
};

function solve() {
  const [rows] = readIntLine();
  const field = readIntArray(rows);

  process.stdout.write(`${collectBouqet(field)}`);
}

function readLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line;
}

function readIntLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line.split(" ").map(Number);
}

function readIntArray(lines) {
  const array = new Array(lines);
  for (let i = 0; i < lines; i++) {
    array[i] = readLine().split("").map(Number);
  }
  return array;
}
