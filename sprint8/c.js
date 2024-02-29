/**
 * Палиндром —– это строка, которая одинаково читается как слева направо,
 * так и справа налево.
 * Из данной строки s путём удаления и перестановки букв надо получить
 * палиндром максимальной длины. Среди всех таких палиндромов надо
 * получить лексикографически минимальный. Количество удалений и
 * перестановок символов может быть любым.
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

const getLongestPalindrom = (string) => {
  const LATIN_CHARS_COUNT = 26;
  const START_LATIN_CODECHAR_IN_ASCII = 97;

  const alphabet = new Array(LATIN_CHARS_COUNT).fill(0);

  for (let i = 0; i < string.length; i++) {
    alphabet[string[i].charCodeAt() % START_LATIN_CODECHAR_IN_ASCII]++;
  }

  let leftPart = "";
  let center = "";
  let rightPart = "";
  for (let a = 0; a < alphabet.length; a++) {
    const char = String.fromCharCode(a + START_LATIN_CODECHAR_IN_ASCII);
    const count = Math.floor(alphabet[a] / 2);
    if (count) {
      const multipleChars = char.repeat(count);
      leftPart += multipleChars;
      rightPart = multipleChars + rightPart;
    }
    if (center === "" && alphabet[a] % 2 === 1) center = char;
  }

  return leftPart + center + rightPart;
};

function solve() {
  const string = readLine();

  process.stdout.write(getLongestPalindrom(string));
}

function readLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line;
}
