/**
 * Рита хочет попробовать поиграть на бирже.
 * Но для начала она решила потренироваться на исторических данных.
 * Даны стоимости акций в каждый из n дней.
 * В течение дня цена акции не меняется. Акции можно покупать и продавать,
 * но только по одной штуке в день. В один день нельзя совершать
 * более одной операции (покупки или продажи).
 * Также на руках не может быть более одной акции в каждый момент времени.
 * Помогите Рите выяснить, какую максимальную прибыль она могла бы получить.
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

const getRich = (history) => {
  let hasShare = false;
  let shareCost = 0;
  let profit = 0;

  for (let i = 0; i < history.length; i++) {
    if (!hasShare) {
      while (history[i + 1] < history[i] && i < history.length) i++;
      hasShare = true;
      shareCost = history[i];
    } else {
      while (history[i + 1] >= history[i] && i < history.length) i++;
      hasShare = false;
      profit += history[i] - shareCost;
    }
  }

  return profit;
};

function solve() {
  const days = readInt();
  const history = readIntLine();

  process.stdout.write(`${getRich(history)}`);
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
