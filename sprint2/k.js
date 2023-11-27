/**
 * У Тимофея было n стажёров.
 * Каждый стажёр хотел быть лучше своих предшественников,
 * поэтому i-й стажёр делал столько коммитов,
 * сколько делали два предыдущих стажёра в сумме.
 * Два первых стажёра были менее инициативными —– они сделали по одному коммиту.
 * Определите, сколько кода напишет следующий стажёр.
 * Решение должно быть реализовано рекурсивно.
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

const fibonacciRec = (n) => {
  if (n === 0 || n === 1) return 1;
  return fibonacciRec(n - 2) + fibonacciRec(n - 1);
};

function solve() {
  const n = readInt();

  process.stdout.write(`${fibonacciRec(n)}`);
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}
