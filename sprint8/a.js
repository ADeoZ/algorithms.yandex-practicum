/**
 * В некоторых языках предложения пишутся и читаются не слева направо, а справа налево.
 * Вам под руку попался странный текст –— в нём обычный (слева направо) порядок букв
 * в словах. А вот сами слова идут в противоположном направлении.
 * Вам надо преобразовать текст так, чтобы слова в нём были написаны слева направо.
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

const reverseSentence = (str) => {
  let result = "";

  let word = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] === " ") {
      result = `${word} ${result}`;
      word = "";
    } else word += str[i];
  }

  return `${word} ${result}`;
};

function solve() {
  const str = readLine();

  process.stdout.write(reverseSentence(str));
}

function readLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line;
}
