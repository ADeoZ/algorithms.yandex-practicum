/**
 * Напишите функцию is_correct_bracket_seq, которая принимает на вход
 * скобочную последовательность и возвращает True, если последовательность
 * правильная, а иначе False.
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

function is_correct_bracket_seq(line) {
  const lineBrackets = [...line];
  const stack = [];
  const closedBrackets = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  for (let i = 0; i < lineBrackets.length; i++) {
    if (/[\(\[\{]/.test(lineBrackets[i])) {
      stack.push(lineBrackets[i]);
    } else if (closedBrackets[lineBrackets[i]] === stack[stack.length - 1]) {
      stack.pop();
    } else {
      return false;
    }
  }

  return stack.length ? false : true;
}

function solve() {
  const brackets = readLine();

  process.stdout.write(is_correct_bracket_seq(brackets) ? "True" : "False");
}

function readLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line;
}
