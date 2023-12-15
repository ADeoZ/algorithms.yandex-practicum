/**
 * На вход подается строка. Нужно определить длину наибольшей подстроки,
 * которая не содержит повторяющиеся символы.
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

const maxSubstrings = (string) => {
  const history = {};
  let maximum = 0;
  let current = 0;

  for (let i = 0; i < string.length; i++) {
    if (string[i] in history && i - current <= history[string[i]]) {
      current = i - history[string[i]];
      history[string[i]] = i;
    } else {
      current++;
      history[string[i]] = i;
    }
    if (maximum < current) maximum = current;
  }

  return maximum;
};

function solve() {
  const string = readLine();

  process.stdout.write(`${maxSubstrings(string)}`);
}

function readLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line;
}
