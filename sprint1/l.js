/**
 * Васе очень нравятся задачи про строки, поэтому он придумал свою.
 * Есть 2 строки s и t, состоящие только из строчных букв.
 * Строка t получена перемешиванием букв строки s и добавлением 1 буквы
 * в случайную позицию. Нужно найти добавленную букву.
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

function getExcessiveLetter(firstString, secondString) {
  const allStrings = [...firstString, ...secondString];
  allStrings.sort();

  for (let i = 0; i < allStrings.length; i = i + 2) {
    if (allStrings[i] !== allStrings[i + 1]) return allStrings[i];
  }
}

function solve() {
  const firstLine = readLine();
  const secondLine = readLine();
  process.stdout.write(`${getExcessiveLetter(firstLine, secondLine)}`);
}

function readLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line;
}
