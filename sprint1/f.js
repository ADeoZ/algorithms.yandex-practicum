/**
 * Помогите Васе понять, будет ли фраза палиндромом.
 * Учитываются только буквы и цифры, заглавные и строчные буквы считаются одинаковыми.
 * Решение должно работать за O(N), где N — длина строки на входе.
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

function isPalindrome(line) {
  let left = 0;
  let right = line.length - 1;
  while (left < right) {
    while (!/[0-9A-Z]/i.test(line[left])) left++;
    while (!/[0-9A-Z]/i.test(line[right])) right--;
    if (line[left].toLowerCase() !== line[right].toLowerCase()) return false;
    left++;
    right--;
  }
  return true;
}

function solve() {
  const line = readLine();
  if (isPalindrome(line)) {
    console.log("True");
  } else {
    console.log("False");
  }
}

function readLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line;
}
