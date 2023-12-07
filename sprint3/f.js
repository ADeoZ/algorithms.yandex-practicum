/**
 * Перед сном Рита решила поиграть в игру на телефоне.
 * Дан массив целых чисел, в котором каждый элемент обозначает длину стороны треугольника.
 * Нужно определить максимально возможный периметр треугольника, составленного из сторон
 * с длинами из заданного массива. Помогите Рите скорее закончить игру и пойти спать.
 * Напомним, что из трёх отрезков с длинами a ≤ b ≤ c можно составить треугольник,
 * если выполнено неравенство треугольника: c < a + b.
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

const getBiggestTrianglePerimeter = (sides) => {
  const sortedSides = sides.sort((a, b) => b - a);
  for (let i = 0; i < sortedSides.length; i++) {
    if (sortedSides[i] < sortedSides[i + 1] + sortedSides[i + 2]) {
      return sortedSides[i] + sortedSides[i + 1] + sortedSides[i + 2];
    }
  }
};

function solve() {
  const sides = readIntArray();

  process.stdout.write(`${getBiggestTrianglePerimeter(sides)}`);
}

function readIntArray() {
  const arr = _inputLines[_curLine].trim().split(" ").map(Number);
  _curLine++;
  return arr;
}
