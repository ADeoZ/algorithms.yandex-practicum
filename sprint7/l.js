/**
 * Лепреконы в данной задаче появились по соображениям
 * общей морали, так как грабить банки — нехорошо.
 * Вам удалось заключить неплохую сделку с лепреконами,
 * поэтому они пустили вас в своё хранилище золотых слитков.
 * Все слитки имеют единую пробу, то есть стоимость 1 грамма
 * золота в двух разных слитках одинакова. В хранилище есть
 * n слитков, вес i-го слитка равен wi кг. У вас есть рюкзак,
 * вместимость которого M килограмм.
 * Выясните максимальную суммарную массу золотых слитков,
 * которую вы сможете унести.
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

const stealGold = (capacity, goldBars) => {
  let bestChoices = new Array(capacity + 1).fill(0);

  for (let bar = 0; bar < goldBars.length; bar++) {
    let currentBest = new Array(capacity + 1).fill(0);
    for (let w = 0; w <= capacity; w++) {
      let currentWeight = goldBars[bar] <= w ? goldBars[bar] : 0;
      currentWeight += bar > 0 ? bestChoices[w - currentWeight] : 0;
      const prevBarsWeight = bar > 0 ? bestChoices[w] : 0;
      currentBest[w] = Math.max(currentWeight, prevBarsWeight);
    }
    bestChoices = currentBest;
  }

  return bestChoices[bestChoices.length - 1];
};

function solve() {
  const [bars, capacity] = readIntLine();
  const goldBars = readIntLine();

  process.stdout.write(`${stealGold(capacity, goldBars)}`);
}

function readIntLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line.split(" ").map(Number);
}
