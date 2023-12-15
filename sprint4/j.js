/**
 * У Гоши есть любимое число S.
 * Помогите ему найти все уникальные четвёрки чисел в массиве,
 * которые в сумме дают заданное число S.
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

const getFoursome = (sum, n) => {
  n.sort((a, b) => a - b);
  const foursomes = new Set();
  let left, right;

  for (x = 0; x < n.length - 3; x++) {
    for (y = x + 1; y < n.length - 2; y++) {
      left = y + 1;
      right = n.length - 1;

      while (left < right) {
        const currSum = n[x] + n[y] + n[left] + n[right];
        if (currSum === sum) {
          foursomes.add([n[x], n[y], n[left], n[right]].join(" "));
          break;
        } else if (currSum < sum) left++;
        else if (currSum > sum) right--;
      }
    }
  }

  return foursomes;
};

function solve() {
  const sum = readInt();
  const array = readIntArray();
  const foursomes = getFoursome(sum, array);

  console.log(foursomes.size);
  foursomes.forEach((foursome) => {
    console.log(foursome);
  });
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readIntArray() {
  const arr = _inputLines[_curLine].trim(" ").split(" ").map(Number);
  _curLine++;
  return arr;
}
