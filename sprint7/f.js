/**
 * Алла хочет доказать, что она умеет прыгать вверх по лестнице быстрее всех.
 * На этот раз соревнования будут проходить на специальной прыгательной лестнице.
 * С каждой её ступеньки можно прыгнуть вверх на любое расстояние от 1 до k.
 * Число k придумывает Алла.
 * Гоша не хочет проиграть, поэтому просит вас посчитать количество способов
 * допрыгать от первой ступеньки до n-й. Изначально все стоят на первой ступеньке.
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

const getJumpingSeries = (target, distance) => {
  const series = [0, 1];
  const mod = 10 ** 9 + 7;

  for (let i = 2; i <= target; i++) {
    const start = i <= distance ? 0 : i - distance;
    let sum = 0;
    for (let x = start; x < i; x++) {
      sum += series[x];
    }
    series.push(sum % mod);
  }

  return series[target];
};

function solve() {
  const [target, distance] = readIntLine();

  process.stdout.write(`${getJumpingSeries(target, distance)}`);
}

function readIntLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line.split(" ").map(Number);
}
