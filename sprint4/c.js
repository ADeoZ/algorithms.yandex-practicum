/**
 * Алла не остановилась на достигнутом –— теперь она хочет научиться быстро вычислять хеши
 * произвольных подстрок данной строки. Помогите ей!
 * На вход поступают запросы на подсчёт хешей разных подстрок.
 * Ответ на каждый запрос должен выполняться за O(1).
 * Допустимо в начале работы программы сделать предподсчёт для дальнейшей работы со строкой.
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

const getHashesArray = (base, mod, string) => {
  let hashes = [0];
  for (let i = 0; i < string.length; i++) {
    hashes[i + 1] = (hashes[i] * base + string[i].charCodeAt()) % mod;
  }
  return hashes;
};

const getCoeffsArray = (base, mod, length) => {
  const coeffs = [1];
  for (let i = 1; i <= length; i++) {
    coeffs[i] = (coeffs[i - 1] * base) % mod;
  }
  return coeffs;
};

const getHashSubstring = (bases, hashes, mod, l, r) => {
  return (hashes[r] + mod - ((hashes[l - 1] * bases[r - l + 1]) % mod)) % mod;
};

function solve() {
  const base = readInt();
  const mod = readInt();
  const string = readLine();
  const lines = readInt();
  const substrings = readLineArray(lines);

  const hashes = getHashesArray(base, mod, string);
  const bases = getCoeffsArray(base, mod, string.length);

  substrings.forEach((substring) => {
    const [left, right] = substring.split(" ");
    console.log(`${getHashSubstring(bases, hashes, mod, left, right)}`);
  });
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
