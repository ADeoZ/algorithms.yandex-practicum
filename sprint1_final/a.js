/**
 * Тимофей ищет место, чтобы построить себе дом. Улица, на которой он хочет жить, имеет длину n,
 * то есть состоит из n одинаковых идущих подряд участков. Каждый участок либо пустой,
 * либо на нём уже построен дом.
 * Общительный Тимофей не хочет жить далеко от других людей на этой улице.
 * Поэтому ему важно для каждого участка знать расстояние до ближайшего пустого участка.
 * Если участок пустой, эта величина будет равна нулю — расстояние до самого себя.
 * Помогите Тимофею посчитать искомые расстояния. Для этого у вас есть карта улицы.
 * Дома в городе Тимофея нумеровались в том порядке, в котором строились,
 * поэтому их номера на карте никак не упорядочены. Пустые участки обозначены нулями.
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

function calcZeros(length, line) {
  let prevZero = null;
  const result = [...line];
  if (result[0] !== 0) result[0] = length;

  for (let i = 1; i < length; i++) {
    if (line[i] === 0) {
      for (let k = i - 1; k >= prevZero; k--) {
        if (result[k] > i - k) result[k] = i - k;
        else break;
      }
      prevZero = i;
    } else {
      result[i] = result[i - 1] + 1;
    }
  }

  return result;
}

function solve() {
  const firstLine = readInt();
  const secondLine = readIntArray();
  process.stdout.write(`${calcZeros(firstLine, secondLine).join(" ")}`);
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readIntArray() {
  const arr = _inputLines[_curLine]
    .trim()
    .split(" ")
    .map((num) => Number(num));
  _curLine++;
  return arr;
}
