/**
 * Гоша решил отправиться в турне по островам Алгосского архипелага.
 * Туристическая программа состоит из последовательного посещения
 * n достопримечательностей. У i-й достопримечательности есть свой
 * рейтинг ri.
 * Впечатление от i-й достопримечательности равно её рейтингу ri.
 * Гоша хочет, чтобы его впечатление от каждой новой посещённой
 * достопримечательности было сильнее, чем от предыдущей.
 * Ради этого он даже готов пропустить некоторые места в маршруте
 * –— в случае, если они нарушают этот порядок плавного возрастания.
 * Помогите Гоше и найдите наибольшую возрастающую
 * подпоследовательность в массиве рейтингов ri.
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

const getLongestIncreasingSubsequence = (array) => {
  const subs = Array.from({ length: array.length }, (_, i) => [i + 1]);

  for (let i = 0; i < array.length; i++) {
    for (let x = i + 1; x < array.length; x++) {
      if (array[i] < array[x] && subs[i].length + 1 > subs[x].length) subs[x] = [...subs[i], x + 1];
    }
  }

  let max = 0;
  for (let y = 1; y < subs.length; y++) {
    if (subs[y].length > subs[max].length) max = y;
  }

  return [subs[max].length, subs[max].join(" ")].join("\n");
};

function solve() {
  const _ = readInt();
  const ratings = readIntLine();

  process.stdout.write(getLongestIncreasingSubsequence(ratings));
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readIntLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line.split(" ").map(Number);
}
