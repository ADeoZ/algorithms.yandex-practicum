/**
 * Гоша измерял температуру воздуха n дней подряд. В результате у него
 * получился некоторый временной ряд. Теперь он хочет посмотреть, как
 * часто встречается некоторый шаблон в получившейся последовательности.
 * Однако температура — вещь относительная, поэтому Гоша решил, что при
 * поиске шаблона длины m (a1, a2, ..., am) стоит также рассматривать
 * сдвинутые на константу вхождения. Это значит, что если для некоторого
 * числа c в исходной последовательности нашёлся участок вида (a1 + c,
 * a2 + c, ... , am + c), то он тоже считается вхождением шаблона (a1,
 * a2, ..., am).
 * По заданной последовательности измерений X и шаблону A=(a1, a2, ...,
 * am) определите все вхождения A в X, допускающие сдвиг на константу.
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

const findSequenceWithOffset = (first, second) => {
  const resultPositions = [];

  for (let x = 0; x <= first.length - second.length; x++) {
    const offset = second[0] - first[x];
    for (let y = 1; y < second.length; y++) {
      if (second[y] - first[x + y] !== offset) break;
      if (y === second.length - 1) resultPositions.push(x + 1);
    }
  }

  return resultPositions;
};

function solve() {
  const fL = readInt();
  const first = readIntLine();
  const sL = readInt();
  const second = readIntLine();

  process.stdout.write(findSequenceWithOffset(first, second).join(" "));
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
