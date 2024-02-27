/**
 * Алла придумала новый способ сравнивать две строки:
 * чтобы сравнить строки a и b, в них надо оставить
 * только те буквы, которые в английском алфавите стоят
 * на четных позициях. Затем полученные строки
 * сравниваются по обычным правилам. Помогите Алле
 * реализовать новое сравнение строк.
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

const compareEvenChars = (first, second) => {
  let x = 0;
  let y = 0;
  while (x < first.length || y < second.length) {
    while (x < first.length && first[x].charCodeAt() % 2 === 1) x++;
    while (y < second.length && second[y].charCodeAt() % 2 === 1) y++;

    if (first[x] === undefined && second[y] === undefined) return 0;
    if (first[x] === undefined || first[x] < second[y]) return -1;
    if (second[y] === undefined || first[x] > second[y]) return 1;
    x++;
    y++;
  }
  return 0;
};

function solve() {
  const first = readLine();
  const second = readLine();

  process.stdout.write(`${compareEvenChars(first, second)}`);
}

function readLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line;
}
