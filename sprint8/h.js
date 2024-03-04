/**
 * Напишите программу, которая будет заменять в тексте все вхождения
 * строки s на строку t. Гарантируется, что никакие два вхождения шаблона
 * s не пересекаются друг с другом.
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

const searchPattern = (string, found) => {
  const sentinel = `${found}#${string}`;
  const prefixes = new Array(found.length).fill(0);
  const positions = [];

  let prev = 0;
  for (let i = 1; i < sentinel.length; i++) {
    let prefix = prev;

    while (prefix > 0 && sentinel[prefix] !== sentinel[i]) prefix = prefixes[--prefix];
    if (sentinel[prefix] === sentinel[i]) prefix++;

    if (i < prefixes.length) prefixes[i] = prefix;
    if (prefix === found.length) positions.push(i - found.length * 2);
    prev = prefix;
  }

  return positions;
};

const replaceFound = (string, found, replace) => {
  const positions = searchPattern(string, found);

  let result = [];
  let prev = 0;
  for (let i = 0; i < positions.length; i++) {
    result.push(string.slice(prev, positions[i]));
    prev = positions[i] + found.length;
  }
  result.push(string.slice(prev));
  return result.join(replace);
};

function solve() {
  const string = readLine();
  const found = readLine();
  const replace = readLine();

  process.stdout.write(replaceFound(string, found, replace));
}

function readLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line;
}
