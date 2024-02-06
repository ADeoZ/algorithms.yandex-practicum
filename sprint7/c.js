/**
 * Гуляя по одному из островов Алгосского архипелага, Гоша набрёл на пещеру,
 * в которой лежат кучи золотого песка. К счастью, у Гоши есть с собой рюкзак
 * грузоподъёмностью до M килограмм, поэтому он может унести с собой какое-то
 * ограниченное количество золота.
 * Всего золотых куч n штук, и все они разные. В куче под номером i содержится
 * mi килограммов золотого песка, а стоимость одного килограмма — ci
 * алгосских франков.
 * Помогите Гоше наполнить рюкзак так, чтобы общая стоимость золотого песка
 * в пересчёте на алгосские франки была максимальной.
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

const needMoreGold = (capacity, piles) => {
  const sortedPiles = piles.sort((a, b) => b[0] - a[0]);
  let restCapacity = capacity;
  let totalValue = 0;

  for (let i = 0; i < sortedPiles.length; i++) {
    totalValue +=
      sortedPiles[i][1] > restCapacity
        ? restCapacity * sortedPiles[i][0]
        : sortedPiles[i][1] * sortedPiles[i][0];
    restCapacity -= sortedPiles[i][1];

    if (restCapacity <= 0) break;
  }

  return totalValue;
};

function solve() {
  const capacity = readInt();
  const lines = readInt();
  const piles = readIntArray(lines);

  process.stdout.write(`${needMoreGold(capacity, piles)}`);
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readIntLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line.split(" ").map(Number);
}

function readIntArray(lines) {
  const array = new Array(lines);
  for (let i = 0; i < lines; i++) {
    array[i] = readIntLine();
  }
  return array;
}
