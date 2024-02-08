/**
 * Гоша практикуется в динамическом программировании —
 * он хочет быстро считать числа Фибоначчи.
 * Помогите Гоше решить эту задачу.
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

const fibonacciAgain = (n) => {
  const mod = 10 ** 9 + 7;

  let a = 0;
  let b = 1;

  for (let i = 1; i <= n; i++) {
    const sum = (a + b) % mod;
    a = b;
    b = sum;
  }

  return b;
};

function solve() {
  const n = readInt();

  process.stdout.write(`${fibonacciAgain(n)}`);
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}
