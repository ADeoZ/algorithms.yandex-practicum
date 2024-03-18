/**
 * Дан набор слов, слова могут повторяться. Среди них надо найти самое частое
 * слово. Если таких слов несколько, то выведите лексикографически наименьшее.
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

const getMostRepeatedWord = (words) => {
  const sortedWords = words.sort();

  let max = { index: 0, count: -1 };
  let current = 0;

  for (let i = 0; i < sortedWords.length; i++) {
    if (sortedWords[i] === sortedWords[i + 1]) current++;
    else {
      if (current > max.count) {
        max = { index: i, count: current };
      }
      current = 0;
    }
  }

  return sortedWords[max.index];
};

function solve() {
  const wordsCount = readInt();
  const words = readLineArray(wordsCount);

  process.stdout.write(getMostRepeatedWord(words));
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
