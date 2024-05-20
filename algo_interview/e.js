/**
 * Назовем строку хорошей, если в ней нет двух соседних букв, которые
 * различаются только регистром. Например, строка «abba» хорошая, а строка
 * «aBba» нет.
 * Со строкой можно делать преобразование: если два соседних символа обозначают
 * одну и ту же букву, но записаны в разных регистрах, то их можно удалить. При
 * этом строка «схлопнется», то есть пробелов при удалении не образуется.
 * Цепочкой таких преобразований можно превратить любую строку в хорошую.
 * По заданной строке найдите хорошую строку, в которую ее можно превратить.
 */

function isGoodLetters(one, second) {
  if (one.charCodeAt() !== second.charCodeAt() && one.toLowerCase() === second.toLowerCase()) return false;
  return true;
}

function convertToGoodString(probablyBadString) {
  const letterStack = [];

  for (let i = 0; i < probablyBadString.length; i++) {
    if (
      letterStack.length === 0 ||
      isGoodLetters(letterStack[letterStack.length - 1], probablyBadString[i])
    ) {
      letterStack.push(probablyBadString[i]);
    } else letterStack.pop();
  }

  return letterStack.join("");
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
  const probablyBadString = readLine();
  const ans = convertToGoodString(probablyBadString);
  console.log(ans);
}

function readLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line;
}
