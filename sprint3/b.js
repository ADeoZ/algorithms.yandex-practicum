/**
 * На клавиатуре старых мобильных телефонов каждой цифре соответствовало несколько букв.
 * Вам известно в каком порядке были нажаты кнопки телефона, без учета повторов.
 * Напечатайте все комбинации букв, которые можно набрать такой последовательностью нажатий.
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

const buttonsAlphabet = [
  [],
  [],
  ["a", "b", "c"],
  ["d", "e", "f"],
  ["g", "h", "i"],
  ["j", "k", "l"],
  ["m", "n", "o"],
  ["p", "q", "r", "s"],
  ["t", "u", "v"],
  ["w", "x", "y", "z"],
];

const mobileTextGenerator = (codes, text) => {
  if (codes.length === 0) {
    process.stdout.write(`${text} `);
    return;
  }

  const buttonChars = buttonsAlphabet[codes[0]];
  buttonChars.forEach((char) => {
    mobileTextGenerator(codes.slice(1), text + char);
  });
};

function solve() {
  const buttonCodes = readIntArray();

  mobileTextGenerator(buttonCodes, "");
}

function readIntArray() {
  const arr = _inputLines[_curLine].trim(" ").split("").map(Number);
  _curLine++;
  return arr;
}
