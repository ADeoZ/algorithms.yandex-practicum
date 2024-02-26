/**
 * У Риты была строка s, Гоша подарил ей на 8 марта ещё n других строк t.
 * Теперь Рита думает, куда их лучше поставить. Один из вариантов —
 * расположить подаренные строки внутри имеющейся строки s,
 * поставив строку t сразу после символа строки s с номером k
 * (в частности, если k=0, то строка вставляется в самое начало s).
 * Помогите Рите и определите, какая строка получится после вставки в s
 * всех подаренных Гошей строк.
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

const insertStrings = (str, inserts) => {
  const insertsArray = new Array(str.length + 1).fill("");
  for (let x = 0; x < inserts.length; x++) {
    const [insert, index] = inserts[x].split(" ");
    insertsArray[Number(index)] = insert;
  }

  let result = "";
  for (let y = 0; y < str.length; y++) {
    result += `${insertsArray[y]}${str[y]}`;
  }

  return result + insertsArray[str.length];
};

function solve() {
  const str = readLine();
  const insertCount = readInt();
  const inserts = readLineArray(insertCount);

  process.stdout.write(insertStrings(str, inserts));
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line;
}

function readLineArray(lines) {
  const array = new Array(lines);
  for (let i = 0; i < lines; i++) {
    array[i] = readLine();
  }
  return array;
}
