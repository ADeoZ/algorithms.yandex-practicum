/**
 * Ребятам стало интересно, сколько может быть различных деревьев поиска,
 * содержащих в своих узлах все уникальные числа от 1 до n.
 * Помогите им найти ответ на этот вопрос.
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

const BSTVariations = [1, 1];

const countBST = (n) => {
  if (BSTVariations[n]) return BSTVariations[n];

  for (let i = BSTVariations.length; i <= n; i++) {
    let variations = 0;
    // i - количество вершин в дереве
    for (let x = 1; x <= i; x++) {
      const left = x - 1; // левое поддерево
      const right = i - x; // правое поддерево
      // количество комбинаций от величины поддеревьев
      variations += BSTVariations[left] * BSTVariations[right];
    }
    BSTVariations.push(variations);
  }
  return BSTVariations[n];
};

function solve() {
  const n = readInt();

  process.stdout.write(`${countBST(n)}`);
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}
