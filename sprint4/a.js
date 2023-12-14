/**
 * Алле очень понравился алгоритм вычисления полиномиального хеша.
 * Помогите ей написать функцию, вычисляющую хеш строки s.
 * В данной задаче необходимо использовать в качестве значений
 * отдельных символов их коды в таблице ASCII.
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

const getPolynomialHash = (base, mod, string) => {
  let sum = 0;
  let q = 1;
  for (let i = 1; i <= string.length; i++) {
    sum = (sum + string[string.length - i].charCodeAt() * q) % mod;
    q = (q * base) % mod;
  }
  return sum;
};

function solve() {
  const base = readInt();
  const mod = readInt();
  const string = readLine();

  process.stdout.write(`${getPolynomialHash(base, mod, string)}`);
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
