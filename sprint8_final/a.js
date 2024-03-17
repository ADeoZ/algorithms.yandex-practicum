/**
 * Вам даны строки в запакованном виде. Определим запакованную строку (ЗС)
 * рекурсивно. Строка, состоящая только из строчных букв английского алфавита
 * является ЗС. Если A и B —– корректные ЗС, то и AB является ЗС. Если A —– ЗС,
 * а n — однозначное натуральное число, то n[A] тоже ЗС. При этом запись n[A]
 * означает, что при распаковке строка A записывается подряд n раз. Найдите
 * наибольший общий префикс распакованных строк и выведите его (в распакованном
 * виде).
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

// вспомогательный метод — является ли символ цифрой
const isItDigit = (char) => /\d/.test(char);

// метод распаковки строки
const unpacking = (string) => {
  const CLOSING_BRACKET = "]";
  // стэк для хранения необходимого количества повторений подстроки
  const stringStack = [{ times: 1, letters: "" }];

  for (let i = 0; i < string.length; i++) {
    // если цифра, то помещаем в стэк и пропускаем открывающую скобку
    if (isItDigit(string[i])) {
      stringStack.push({ times: string[i], letters: "" });
      i++;
    }
    // если комбинация закрывается, то образуем подстроку
    // и помещаем в предшествующее значение в стэке
    else if (string[i] === CLOSING_BRACKET) {
      const { times, letters } = stringStack.pop();
      const completeString = letters.repeat(times);
      stringStack[stringStack.length - 1].letters += completeString;
    } else stringStack[stringStack.length - 1].letters += string[i];
  }

  // в стэке всегда остаётся итоговая подстрока с однократным повторением
  return stringStack[0].letters;
};

const getCommonUnpackedPrefix = (strings) => {
  // будем исходить из максимального префикса и сужать его
  let commonPrefix = unpacking(strings[0]);
  // итоговая длина префикса, которую будем обновлять в цикле
  let prefixEnd = commonPrefix.length;

  for (let x = 1; x < strings.length; x++) {
    // распаковка строк по очереди сэкономит память
    const unpackingString = unpacking(strings[x]);
    for (let y = 0; y < prefixEnd; y++) {
      if (unpackingString[y] !== commonPrefix[y]) {
        // если разница с первого символа, то префикс - пустая строка
        if (y === 0) return "";
        prefixEnd = y;
        break;
      }
    }
  }
  commonPrefix = commonPrefix.slice(0, prefixEnd);

  return commonPrefix;
};

function solve() {
  const stringsCount = readInt();
  const packedStrings = readLineArray(stringsCount);

  process.stdout.write(getCommonUnpackedPrefix(packedStrings));
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
