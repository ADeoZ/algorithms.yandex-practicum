/**
 * Рита по поручению Тимофея наводит порядок в правильных скобочных последовательностях (ПСП),
 * состоящих только из круглых скобок (). Для этого ей надо сгенерировать все ПСП длины 2n
 * в алфавитном порядке —– алфавит состоит из ( и ) и открывающая скобка идёт раньше закрывающей.
 * Помогите Рите —– напишите программу, которая по заданному n выведет все ПСП в нужном порядке.
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

const bracketsGenerator = (length, line, opened) => {
  if (length === 0) {
    console.log(line);
    return;
  }
  const reducedLength = length - 1;
  if (opened < length) bracketsGenerator(reducedLength, line + "(", opened + 1);
  if (opened > 0) bracketsGenerator(reducedLength, line + ")", opened - 1);
};

function solve() {
  const length = readInt() * 2;

  bracketsGenerator(length, "", 0);
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}
