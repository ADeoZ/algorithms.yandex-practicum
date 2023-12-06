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

const buyRealty = (budget, prices) => {
  const sortedPrices = prices.sort((a, b) => a - b);
  let houses = 0;
  for (let i = 0; i < sortedPrices.length; i++) {
    if (budget - sortedPrices[i] >= 0) {
      houses++;
      budget -= sortedPrices[i];
    } else break;
  }
  return houses;
};

function solve() {
  const budget = readIntArray()[1];
  const prices = readIntArray();

  process.stdout.write(`${buyRealty(budget, prices)}`);
}

function readIntArray() {
  const arr = _inputLines[_curLine].trim().split(" ").map(Number);
  _curLine++;
  return arr;
}
