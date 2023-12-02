/**
 * Гоша любит играть в игру «Подпоследовательность»:
 * даны 2 строки, и нужно понять, является ли первая
 * из них подпоследовательностью второй.
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

const hasSubsequence = (find, source) => {
  let f = 0;

  for (let i = 0; i < source.length; i++) {
    if (source[i] === find[f]) f++;
    if (f === find.length) return true;
  }

  return false;
};

function solve() {
  const find = readLine();
  const source = readLine();

  process.stdout.write(hasSubsequence(find, source) ? "True" : "False");
}

function readLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line;
}
