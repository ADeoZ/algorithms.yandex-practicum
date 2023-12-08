/**
 * На каждом острове в архипелаге Алгосы живёт какое-то количество людей или же остров необитаем
 * (тогда на острове живёт 0 людей). Пусть на i-м острове численность населения составляет ai.
 * Тимофей захотел найти медиану среди всех значений численности населения.
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

const getMediana = (firstLength, secondLength, first, second) => {
  const result = Array(firstLength + secondLength);
  let f = 0;
  let s = 0;
  let r = 0;
  while (f < firstLength && s < secondLength) {
    if (first[f] > second[s]) {
      result[r] = second[s];
      s++;
      r++;
    } else {
      result[r] = first[f];
      f++;
      r++;
    }
  }

  while (f < firstLength) {
    result[r] = first[f];
    f++;
    r++;
  }
  while (s < secondLength) {
    result[r] = second[s];
    s++;
    r++;
  }

  const mid = Math.floor(result.length / 2);
  return result.length % 2 ? result[mid] : (result[mid] + result[mid - 1]) / 2;
};

function solve() {
  const firstLength = readInt();
  const secondLength = readInt();
  const first = readIntArray();
  const second = readIntArray();

  process.stdout.write(`${getMediana(firstLength, secondLength, first, second)}`);
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readIntArray() {
  const arr = _inputLines[_curLine].trim(" ").split(" ").map(Number);
  _curLine++;
  return arr;
}
