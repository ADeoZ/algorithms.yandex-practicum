/**
 * Алла хочет купить дом на Алгосах. Для этого ей надо много наличных,
 * которые она собирается получить в банкомате. Банкомат приличный,
 * поэтому в нём есть бесконечно много банкнот каждого номинала.
 * Всего номиналов k штук. Дом мечты Аллы стоит x франков.
 * Найдите минимальное количество банкнот, которые в сумме
 * дадут x франков. Если в набор входит несколько банкнот одинакового
 * номинала, то учитывать надо их все.
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

const withdrawMinimum = (cost, cash) => {
  const counter = new Array(cost + 1).fill(-1);

  for (let i = 0; i < cash.length; i++) {
    for (let x = 0; x <= cost; x++) {
      const diff = x - cash[i];
      if (diff < 0 || (diff > 0 && counter[diff] === -1)) continue;
      const current = diff > 0 ? 1 + counter[diff] : 1;
      counter[x] = counter[x] === -1 ? current : Math.min(counter[x], current);
    }
  }

  return counter[counter.length - 1];
};

function solve() {
  const cost = readInt();
  const _ = readInt();
  const cash = readIntLine();

  process.stdout.write(`${withdrawMinimum(cost, cash)}`);
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
