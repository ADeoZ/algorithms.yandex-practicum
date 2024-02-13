/**
 * Тимофей пошёл снять деньги в банкомат. Ему нужно m франков.
 * В банкомате в бесконечном количестве имеются купюры различных достоинств.
 * Всего различных достоинств n. Купюр каждого достоинства можно взять
 * бесконечно много. Нужно определить число способов,
 * которыми Тимофей сможет набрать нужную сумму.
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

const getWithdrawVariations = (values, sum) => {
  const variations = new Array(sum + 1).fill(0);

  for (let i = 0; i < values.length; i++) {
    for (let x = 0; x <= sum; x++) {
      let vars = 0;
      if (x === values[i]) vars = 1;
      else if (variations[x - values[i]] > 0) vars = variations[x - values[i]];
      variations[x] = variations[x] + vars;
    }
  }

  return variations[variations.length - 1];
};

function solve() {
  const sum = readInt();
  const _ = readInt();
  const values = readIntLine();

  process.stdout.write(`${getWithdrawVariations(values, sum)}`);
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
