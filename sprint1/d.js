/**
 * Метеорологическая служба вашего города решила исследовать погоду новым способом.
 * Под температурой воздуха в конкретный день будем понимать максимальную температуру в этот день.
 * Под хаотичностью погоды за n дней служба понимает количество дней, в которые температура строго больше,
 * чем в день до (если такой существует) и в день после текущего (если такой существует).
 * Например, если за 5 дней максимальная температура воздуха составляла [1, 2, 5, 4, 8] градусов,
 * то хаотичность за этот период равна 2: в 3-й и 5-й дни выполнялись описанные условия.
 * Определите по ежедневным показаниям температуры хаотичность погоды за этот период.
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

function getWeatherRandomness(temperatures) {
  let countRand = 0;
  for (let i = 0; i < temperatures.length; i++) {
    let left = false;
    let right = false;
    if (i > 0) {
      if (temperatures[i - 1] < temperatures[i]) {
        left = true;
      }
    } else {
      left = true;
    }
    if (i < temperatures.length - 1) {
      if (temperatures[i + 1] < temperatures[i]) {
        right = true;
      }
    } else {
      right = true;
    }
    if (left && right) {
      countRand++;
      i++;
    }
  }
  return countRand;
}

function solve() {
  const n = readInt();
  const temperatures = readArray();
  process.stdout.write(`${getWeatherRandomness(temperatures)}`);
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readArray() {
  var arr = _inputLines[_curLine]
    .trim(" ")
    .split(" ")
    .map((num) => Number(num));
  _curLine++;
  return arr;
}
