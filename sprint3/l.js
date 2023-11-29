/**
 * Вася решил накопить денег на два одинаковых велосипеда — себе и сестре.
 * У Васи есть копилка, в которую каждый день он может добавлять деньги
 * (если, конечно, у него есть такая финансовая возможность).
 * В процессе накопления Вася не вынимает деньги из копилки.
 * У вас есть информация о росте Васиных накоплений —
 * сколько у Васи в копилке было денег в каждый из дней.
 * Ваша задача — по заданной стоимости велосипеда определить
 * первый день, в которой Вася смог бы купить один велосипед,
 * и первый день, в который Вася смог бы купить два велосипеда.
 * Подсказка: решение должно работать за O(log n).
 */

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

const buyingBicycle = (moneyBox, cost, left, right) => {
  if (right <= left) return -1;
  const mid = Math.floor((left + right) / 2);
  if (moneyBox[mid] >= cost && (mid === 0 || moneyBox[mid - 1] < cost)) return mid + 1;
  if (cost > moneyBox[mid]) {
    return buyingBicycle(moneyBox, cost, mid + 1, right);
  } else {
    return buyingBicycle(moneyBox, cost, left, mid);
  }
};

function solve() {
  const moneyBox = readIntArray();
  const cost = readInt();

  const firstBuy = buyingBicycle(moneyBox, cost, 0, moneyBox.length);
  const secondBuy = buyingBicycle(moneyBox, cost * 2, firstBuy, moneyBox.length);

  process.stdout.write(`${firstBuy} ${secondBuy}`);
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readIntArray() {
  var arr = _inputLines[_curLine]
    .trim(" ")
    .split(" ")
    .map((num) => Number(num));
  _curLine++;
  return arr;
}
