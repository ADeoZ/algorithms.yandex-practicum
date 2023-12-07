/**
 * На IT-конференции присутствовали студенты из разных вузов со всей страны.
 * Для каждого студента известен ID университета, в котором он учится.
 * Тимофей предложил Рите выяснить, из каких k вузов на конференцию пришло больше всего учащихся.
 */

const _readline = require("readline");

const _reader = _readline.createInterface({
  input: process.stdin,
});

const _inputLines = [];
let _curLine = 1;

_reader.on("line", (line) => {
  _inputLines.push(line);
});

process.stdin.on("end", solve);

const getFrequenceRank = (numbers, top) => {
  return Object.entries(
    numbers.reduce((frequency, number) => {
      number in frequency ? frequency[number]++ : (frequency[number] = 1);
      return frequency;
    }, {})
  )
    .sort((a, b) => (a[0] !== b[0] ? b[1] - a[1] : a[0] - b[0]))
    .slice(0, top)
    .map(([key]) => key)
    .join(" ");
};

function solve() {
  const ids = readIntArray();
  const top = readInt();

  console.log(getFrequenceRank(ids, top));
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readIntArray() {
  const arr = _inputLines[_curLine].trim().split(" ").map(Number);
  _curLine++;
  return arr;
}
