/**
 * Будем говорить, что строка s является повтором длины k, если существует
 * такая строка t, что s = t * k, где под умножением подразумевается
 * конкатенация k экземпляров строки t один за другим.
 * Например, строка abababab является повтором строки abab длины 2, а
 * также повторением строки ab длины 4. Тогда имеет смысл говорить о
 * наибольшем повторе. Строка является наибольшим повтором длины k, если
 * она является повтором некоторой строки длины k и если не существует
 * такой строки t, что s —– повтор t длины m > k. Например, строка aaaa
 * является наибольшим повтором длины 4.
 * Вам дана строка, которая является наибольшим повтором длины x. Найдите
 * x.
 * Заметим, что ответ всегда равен хотя бы единице, так как строка
 * является повтором самой себя.
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

const countRepeated = (string) => {
  for (let i = 1; i <= string.length / 2; i++) {
    if (string.length % i !== 0) continue;

    const first = string.slice(0, i);
    let match = true;
    for (let z = i; z <= string.length - i; z = z + i) {
      const next = string.slice(z, z + i);
      if (first !== next) {
        match = false;
        break;
      }
    }
    if (match) return string.length / i;
  }

  return 1;
};

function solve() {
  const string = readLine();

  process.stdout.write(`${countRepeated(string)}`);
}

function readLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line;
}
