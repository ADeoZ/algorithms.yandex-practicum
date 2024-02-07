/**
 * Теперь черепашке Кондратине надо узнать не только,
 * сколько цветочков она может собрать, но и как ей
 * построить свой маршрут для этого. Помогите ей!
 * Напомним, что Кондратине надо дойти от левого нижнего
 * до правого верхнего угла, а передвигаться она умеет
 * только вверх и вправо.
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

const collectBouqetAndPath = (field) => {
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

  let path = "";
  let x = cols - 1;
  let y = 0;
  while (x > 0 || y < rows - 1) {
    if (x === 0) {
      path = "U" + path;
      y++;
    } else if (y === rows - 1 || scoreField[y][x - 1] > scoreField[y + 1][x]) {
      path = "R" + path;
      x--;
    } else {
      path = "U" + path;
      y++;
    }
  }

  return [scoreField[0][cols - 1], path];
};

function solve() {
  const [rows] = readIntLine();
  const field = readIntArray(rows);

  process.stdout.write(`${collectBouqetAndPath(field).join("\n")}`);
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
