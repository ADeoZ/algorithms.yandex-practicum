/**
 * В этой задаче вам необходимо посчитать префикс-функцию для заданной строки.
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

const getPrefixes = (string) => {
  const prefixes = new Array(string.length).fill(0);

  for (let i = 1; i < string.length; i++) {
    let prefix = prefixes[i - 1];

    while (prefix > 0 && string[prefix] !== string[i]) prefix = prefixes[--prefix];
    if (string[prefix] === string[i]) prefix++;

    prefixes[i] = prefix;
  }

  return prefixes;
};

function solve() {
  const string = readLine();

  process.stdout.write(getPrefixes(string).join(" "));
}

function readLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line;
}
