/**
 * Вам дано число, записанное римскими цифрами. Получите это же число в обычной
 * записи (арабскими цифрами).
 * Римская запись чисел может включать следующие символы:
 * ’I’ — 1
 * ’V’ — 5
 * ’X’ — 10
 * ’L’ — 50
 * ’C’ — 100
 * ’D’ — 500
 * ’M’ — 1000
 * Цифры ’I’, ’X’, ’C’ и ’M’ нельзя использовать более трех раз подряд. Цифры
 * ’V’, ’L’ и ’D’ нельзя использовать более одного раза во всей записи числа.
 * Обыкновенно цифры записывают по убыванию слева направо.
 * Однако есть исключения:
 * Чтобы получить ’4’ или ’9’, надо поставить ’I’ перед ’V’ или ’X’
 * соответственно
 * Чтобы получить ’40’ или ’90’, надо поставить ’X’ перед ’L’ или ’C’.
 * Чтобы получить ’400’ или ’900’, надо поставить ’C’ перед ’D’ или ’M’.
 */

function convertToArabic(romanNumber) {
  const numTable = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
    CM: 900,
    CD: 400,
    XC: 90,
    XL: 40,
    IX: 9,
    IV: 4,
  };

  const repGroups = {
    I: 0,
    X: 0,
    C: 0,
    M: 0,
  };
  const repOnce = {
    V: 0,
    L: 0,
    D: 0,
  };

  let result = 0;
  for (let i = 0; i < romanNumber.length; i++) {
    let letter = romanNumber[i];
    let nextLetter = romanNumber[i + 1];
    let number = numTable[letter];
    let prevNumber = numTable[romanNumber[i - 1]];

    if ((letter === "C" || letter === "X" || letter === "I") && numTable[nextLetter] > number) {
      number = numTable[letter + romanNumber[i + 1]];
      letter = nextLetter;
      i++;
    }

    if (!number) return -1;
    if (number > prevNumber) return -1;

    if (letter in repGroups) {
      if (repGroups[letter] < 3) repGroups[letter]++;
      else if (prevNumber === number) return -1;
      else repGroups[letter] = 1;
    }

    if (letter in repOnce) {
      if (repOnce[letter] > 0) return -1;
      else repOnce[letter]++;
    }
    result += number;
  }

  return result;
}

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

function solve() {
  const romanNumber = readLine();
  const ans = convertToArabic(romanNumber);
  console.log(ans);
}

function readLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line;
}
