/**
 * Гоша едет в гости к друзьям. Ему придётся сначала ехать на метро,
 * а потом пересаживаться на автобус. Гоша не любит долго ждать,
 * поэтому хочет выбрать такую станцию метро, рядом с которой расположено
 * как можно больше остановок автобуса. Гоша считает,
 * что остановка находится рядом с метро, если расстояние между ними
 * не превосходит 20 метров. Обратите внимание, что в одной точке могут
 * располагаться несколько остановок.
 * Гоше известны все координаты автобусных остановок и координаты
 * выходов из метро. Помогите ему найти выход из метро,
 * рядом с которым расположено больше всего остановок.
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

const getBestMetroStation = (metro, bus) => {
  // собираем Map, где ключи - координата X
  // значения - ещё один внутренний Map,
  // где ключи - координата Y, а значения - массив полных координат [X, Y]
  const busMap = bus.reduce((map, i) => {
    if (map.has(i[0])) {
      const yValues = map.get(i[0]);
      if (yValues.has(i[1])) {
        const values = yValues.get(i[1]);
        values.push(i);
      } else {
        yValues.set(i[1], [i]);
      }
      map.set(i[0], yValues);
    } else {
      map.set(i[0], new Map([[i[1], [i]]]));
    }
    return map;
  }, new Map());

  let best = [-1, 0];
  // перебираем станции метро
  for (let i = 0; i < metro.length; i++) {
    let nearMetro = 0;

    // будем брать из Map только те станции, что не дальше +-20 метров по X и Y от метро
    const minimumX = metro[i][0] - 20;
    const minimumY = metro[i][1] - 20;
    for (let x = minimumX; x <= minimumX + 40; x++) {
      // если есть остановки близкие по X
      if (busMap.has(x)) {
        const xNearMap = busMap.get(x);
        for (let y = minimumY; y <= minimumY + 40; y++) {
          // если из них есть остановки близкие по Y
          if (xNearMap.has(y)) {
            const distance = (x - metro[i][0]) ** 2 + (y - metro[i][1]) ** 2;
            if (distance <= 400) {
              // может быть несколько остановок в одной точке, поэтому получаем длину массива
              const count = xNearMap.get(y).length;
              nearMetro = nearMetro + count;
            }
          }
        }
      }
    }
    // если для этого метро насчитали много остановок, то записываем его индекс и посчитанный максимум
    if (nearMetro > best[1]) best = [i, nearMetro];
  }

  return best[0] + 1;
};

function solve() {
  const metroLength = readInt();
  const metro = readIntArray(metroLength);
  const busLength = readInt();
  const bus = readIntArray(busLength);

  process.stdout.write(`${getBestMetroStation(metro, bus)}`);
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line;
}

function readIntArray(lines) {
  const array = new Array(lines);
  for (let i = 0; i < lines; i++) {
    array[i] = readLine().split(" ").map(Number);
  }
  return array;
}
