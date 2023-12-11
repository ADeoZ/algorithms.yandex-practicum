/**
 * Жители Алгосского архипелага придумали новый способ сравнения строк.
 * Две строки считаются равными, если символы одной из них можно заменить
 * на символы другой так, что первая строка станет точной копией второй строки.
 * При этом необходимо соблюдение двух условий:
 * Порядок вхождения символов должен быть сохранён.
 * Одинаковым символам первой строки должны соответствовать одинаковые символы
 * второй строки. Разным символам —– разные.
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

const isSameStrings = (first, second) => {
  if (first.length !== second.length) return "NO";

  const hashFirst = {};
  const hashSecond = {};
  for (let i = 0; i < first.length; i++) {
    const firstKey = first[i];
    const secondKey = second[i];

    if (!(firstKey in hashFirst)) hashFirst[firstKey] = secondKey;
    if (!(secondKey in hashSecond)) hashSecond[secondKey] = firstKey;
    if (hashFirst[firstKey] !== secondKey || hashSecond[secondKey] !== firstKey) return "NO";
  }
  return "YES";
};

function solve() {
  const first = readLine();
  const second = readLine();

  process.stdout.write(isSameStrings(first, second));
}

function readLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line;
}
