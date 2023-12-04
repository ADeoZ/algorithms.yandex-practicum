/**
 * Рита решила оставить у себя одежду только трёх цветов:
 * розового, жёлтого и малинового.
 * После того как вещи других расцветок были убраны,
 * Рита захотела отсортировать свой новый гардероб по цветам.
 * Сначала должны идти вещи розового цвета, потом —– жёлтого,
 * и в конце —– малинового.
 * Примечание: попробуйте решить задачу за один проход по массиву!
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

const sortDresses = (wardrobe) => {
  const counter = [0, 0, 0];

  for (let i = 0; i < wardrobe.length; i++) {
    counter[wardrobe[i]]++;
  }

  let index = 0;
  for (let x = 0; x < counter.length; x++) {
    for (let y = 0; y < counter[x]; y++) {
      wardrobe[index] = x;
      index++;
    }
  }

  return wardrobe;
};

function solve() {
  const array = readIntArray();

  process.stdout.write(`${sortDresses(array).join(" ")}`);
}

function readIntArray() {
  const arr = _inputLines[_curLine].trim(" ").split(" ");
  _curLine++;
  return arr;
}
