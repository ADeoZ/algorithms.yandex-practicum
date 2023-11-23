/**
 * Игра «Тренажёр для скоростной печати» представляет собой поле 4x4 из клавиш,
 * на которых — либо точка, либо цифра от одного до девяти.
 * Суть игры следующая: каждый раунд на поле появляется комбинация цифр и точек.
 * В момент времени t игрок должен одновременно нажать на все клавиши, где есть цифра t.
 * Если в момент t нажаты все нужные клавиши, игроки получают один балл.
 * Если клавиш с цифрой t на поле нет, победное очко не начисляется.
 * Два игрока в один момент могут нажать на k клавиш каждый. Найдите число баллов,
 * которое смогут заработать Гоша и Тимофей, если будут нажимать на клавиши вдвоём.
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

function calculateScore(hands, field) {
  const ROWS = 4;
  const COLUMNS = 4;
  const PLAYERS = 2;
  const MAX_CHAR_TYPES = 9;

  const fieldsChars = new Array(MAX_CHAR_TYPES).fill(0);

  for (let x = 0; x < ROWS; x++) {
    for (let y = 0; y < COLUMNS; y++) {
      const char = Number(field[x][y]);
      if (char) fieldsChars[char - 1]++;
    }
  }

  let score = 0;
  for (let i = 0; i < MAX_CHAR_TYPES; i++) {
    if (fieldsChars[i] > 0 && fieldsChars[i] <= hands * PLAYERS) score++;
  }
  return score;
}

function solve() {
  const hands = readInt();
  const field = readMatrix(4);

  process.stdout.write(`${calculateScore(hands, field)}`);
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readArray() {
  const arr = _inputLines[_curLine].trim().split("");
  _curLine++;
  return arr;
}

function readMatrix(rowsCount) {
  const arr = [];
  for (let i = 0; i !== rowsCount; i++) {
    arr.push(readArray());
  }
  return arr;
}
