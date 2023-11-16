/**
 * Чтобы подготовиться к семинару, Гоше надо прочитать статью по эффективному менеджменту.
 * Так как Гоша хочет спланировать день заранее, ему необходимо оценить сложность статьи.
 * Он придумал такой метод оценки: берётся случайное предложение из текста
 * и в нём ищется самое длинное слово. Его длина и будет условной сложностью статьи.
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

function getLongestWord(line) {
  const lines = line.trim(" ").split(" ");
  let longestWordIndex = -1;
  let currentMax = 0;
  for (let i = 0; i < lines.length; i++) {
    if (currentMax < lines[i].length) {
      longestWordIndex = i;
      currentMax = lines[i].length;
    }
  }
  return [lines[longestWordIndex], currentMax];
}

function solve() {
  const line = readLine();
  const longestWord = getLongestWord(line);
  process.stdout.write(`${longestWord[0]}`);
  process.stdout.write("\n");
  process.stdout.write(`${longestWord[1]}`);
}

function readLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line;
}
