// Даны два массива чисел длины n.
// Составьте из них один массив длины 2n, в котором числа из входных массивов чередуются (первый — второй — первый — второй — ...).
// При этом относительный порядок следования чисел из одного массива должен быть сохранён.

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

function zip(n, a, b) {
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(a[i]);
    result.push(b[i]);
  }
  return result;
}

function solve() {
  const n = readInt();
  const a = readArray();
  const b = readArray();
  process.stdout.write(`${zip(n, a, b).join(" ")}`);
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
