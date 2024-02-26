/**
 * Расстоянием Левенштейна между двумя строками s и t называется
 * количество атомарных изменений, с помощью которых можно одну
 * строку превратить в другую. Под атомарными изменениями
 * подразумеваются: удаление одного символа, вставка одного
 * символа, замена одного символа на другой.
 * Найдите расстояние Левенштейна для предложенной пары строк.
 * Выведите единственное число — расстояние между строками.
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

const getLevenshteinDistance = (first, second) => {
  const fL = first.length;
  const sL = second.length;
  // будем использовать две строки значений — предыдущие и текущие
  // первую строку заполняем [0..M] значениями, как базовыми значениями
  let prevDistance;
  let curDistance = Array.from({ length: sL + 1 }, (_, i) => i);

  for (let x = 1; x <= fL; x++) {
    // на каждом шаге сменяем строки значений
    prevDistance = curDistance;
    curDistance = [x, ...new Array(sL)];

    for (let y = 1; y <= sL; y++) {
      // добавление символа
      const addLetter = curDistance[y - 1] + 1;
      // удаление символа
      const delLetter = prevDistance[y] + 1;
      // изменение символа, если требуется
      const needChange = first[x - 1] === second[y - 1] ? 0 : 1;
      const changeLetter = prevDistance[y - 1] + needChange;

      // выбираем вариант, что требует меньше изменений с учётом предыдущих подстрок
      curDistance[y] = Math.min(addLetter, delLetter, changeLetter);
    }
  }

  return curDistance[sL];
};

function solve() {
  const first = readLine();
  const second = readLine();

  process.stdout.write(`${getLevenshteinDistance(first, second)}`);
}

function readLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line;
}
