/**
 * В компании, где работает Тимофей, заботятся о досуге сотрудников
 * и устраивают различные кружки по интересам.
 * Когда кто-то записывается на занятие, в лог вносится название кружка.
 * По записям в логе составьте список всех кружков, в которые ходит хотя бы один человек.
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

const getUniqueLines = (lines) => {
  const unique = new Set();
  for (let i = 0; i < lines.length; i++) {
    if (!unique.has(lines[i])) {
      unique.add(lines[i]);
      console.log(lines[i]);
    }
  }
};

function solve() {
  const linesNumber = readInt();
  const linesArray = readLineArray(linesNumber);

  getUniqueLines(linesArray);
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line;
}

function readLineArray(lines) {
  const array = new Array(lines);
  for (let i = 0; i < lines; i++) {
    array[i] = readLine();
  }
  return array;
}
