/**
 * Вася решил избавиться от проблем с произношением и стать певцом.
 * Он обратился за помощью к логопеду. Тот посоветовал Васе выполнять упражнение,
 * которое называется анаграммная группировка.
 * В качестве подготовительного этапа нужно выбрать из множества строк анаграммы.
 */

const _readline = require("readline");

const _reader = _readline.createInterface({
  input: process.stdin,
});

const _inputLines = [];
let _curLine = 1;

_reader.on("line", (line) => {
  _inputLines.push(line);
});

process.stdin.on("end", solve);

const getAnagrams = (line) => {
  const sortedStrings = Object.values(
    line
      .split(" ")
      .map((string, i) => ({ index: i, string: string.split("").sort().join("") }))
      .reduce((anagrams, { string, index }) => {
        string in anagrams ? anagrams[string].push(index) : (anagrams[string] = [index]);
        return anagrams;
      }, {})
  ).forEach((result) => console.log(result.join(" ")));
  return sortedStrings;
};

function solve() {
  const line = readLine();

  getAnagrams(line);
}

function readLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line;
}
