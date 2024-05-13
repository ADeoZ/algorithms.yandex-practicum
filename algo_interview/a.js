/**
 * На стол в ряд выложены карточки, на каждой карточке написано натуральное
 * число. За один ход разрешается взять карточку либо с левого, либо с правого
 * конца ряда. Всего можно сделать k ходов. Итоговый счет равен сумме чисел на
 * выбранных карточках. Определите, какой максимальный счет можно получить по
 * итогам игры.
 */

function getCardCount(counter, cards) {
  if (counter >= cards.length) return cards.reduce((sum, i) => sum + i, 0);

  let leftSum = 0;
  let rightSum = 0;

  for (let x = 0; x < counter; x++) {
    leftSum += cards[x];
    rightSum += cards[cards.length - 1 - x];
  }

  let left = 0;
  let right = cards.length - 1;
  let result = 0;

  for (let i = 0; i < counter; i++) {
    if (leftSum >= rightSum) {
      const card = cards[left];
      result += card;
      leftSum -= card;
      rightSum -= cards[right - counter + i + 1];
      left++;
    } else {
      const card = cards[right];
      result += card;
      rightSum -= card;
      leftSum -= cards[left + counter - i - 1];
      right--;
    }
  }

  return result;
}

const _readline = require("readline");

const _reader = _readline.createInterface({
  input: process.stdin,
});

const _inputLines = [];
let _curLine = 1;

_reader.on("line", (line) => {
  _inputLines.push(line);
});

process.stdin.on("end", solve);

function solve() {
  const counter = readInt();
  const cards = readArray();
  const ans = getCardCount(counter, cards);
  console.log(ans);
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readArray() {
  var arr = _inputLines[_curLine]
    .trim(" ")
    .split(" ")
    .map((num) => Number(num));
  _curLine++;
  return arr;
}
