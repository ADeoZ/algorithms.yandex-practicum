const _readline = require("readline");

/**
 * К Васе в гости пришли одноклассники. Его мама решила угостить ребят печеньем.
 * Но не всё так просто. Печенья могут быть разного размера.
 * А у каждого ребёнка есть фактор жадности —– минимальный размер печенья, которое он возьмёт.
 * Нужно выяснить, сколько ребят останутся довольными в лучшем случае, когда они действуют оптимально.
 */

const _reader = _readline.createInterface({
  input: process.stdin,
});

const _inputLines = [];
let _curLine = 0;

_reader.on("line", (line) => {
  _inputLines.push(line);
});

process.stdin.on("end", solve);

const quickSort = (array) => {
  if (array.length <= 1) return array;

  const mid = array[Math.floor(Math.random() * array.length)];

  const left = [];
  const center = [];
  const right = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] < mid) left.push(array[i]);
    else if (array[i] > mid) right.push(array[i]);
    else center.push(array[i]);
  }

  return [...quickSort(left), ...center, ...quickSort(right)];
};

const happyChilds = (childs, cookies) => {
  const sortedChilds = quickSort(childs);
  const sortedCookies = quickSort(cookies);
  let countHappy = 0;

  let cookie = 0;
  let child = 0;
  while (cookie < sortedCookies.length && child < sortedChilds.length) {
    if (sortedCookies[cookie] >= sortedChilds[child]) {
      countHappy++;
      cookie++;
      child++;
    } else {
      cookie++;
    }
  }

  return countHappy;
};

function solve() {
  const childs = readIntArray(1);
  const cookies = readIntArray(3);

  process.stdout.write(`${happyChilds(childs, cookies)}`);
}

function readIntArray(line) {
  const arr = _inputLines[line].trim(" ").split(" ").map(Number);
  return arr;
}
