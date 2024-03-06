/**
 * Найдите наибольший по длине общий префикс нескольких строк.
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

const commonPrefix = (strings) => {
  let count = 0;
  const source = strings[0];
  for (let x = 0; x < source.length; x++) {
    const char = source[x];
    for (let y = 1; y < strings.length; y++) {
      if (strings[y][x] !== char) return count;
    }
    count++;
  }
  return count;
};

function solve() {
  const stringsCount = readInt();
  const strings = readLineArray(stringsCount);

  process.stdout.write(`${commonPrefix(strings)}`);
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
