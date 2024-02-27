/**
 * Представьте, что вы работаете пограничником и постоянно
 * проверяете документы людей по записи из базы. При этом
 * допустима ситуация, когда имя человека в базе отличается
 * от имени в паспорте на одну замену, одно удаление или
 * одну вставку символа. Если один вариант имени может быть
 * получен из другого удалением одного символа, то человека
 * пропустят через границу. А вот если есть какое-либо
 * второе изменение, то человек грустно поедет домой или
 * в посольство.
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

const borderControl = (first, second) => {
  const lengthDiff = Math.abs(first.length - second.length);
  if (lengthDiff > 1) return "FAIL";

  let mistakes = 0;
  let x = 0;
  let y = 0;
  while (x < first.length || y < second.length) {
    if (first[x] !== second[y]) {
      if (mistakes > 0) return "FAIL";
      if (lengthDiff > 0) {
        first.length > second.length ? y-- : x--;
      }
      mistakes++;
    }
    x++;
    y++;
  }
  return "OK";
};

function solve() {
  const first = readLine();
  const second = readLine();

  process.stdout.write(borderControl(first, second));
}

function readLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line;
}
