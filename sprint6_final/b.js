/**
 * В стране X есть n городов, которым присвоены номера от 1 до n.
 * Столица страны имеет номер n. Между городами проложены железные дороги.
 * Однако дороги могут быть двух типов по ширине полотна.
 * Любой поезд может ездить только по одному типу полотна.
 * Условно один тип дорог помечают как R, а другой как B.
 * То есть если маршрут от одного города до другого имеет как дороги типа R,
 * так и дороги типа B, то ни один поезд не сможет по этому маршруту проехать.
 * От одного города до другого можно проехать только по маршруту,
 * состоящему исключительно из дорог типа R или только из дорог типа B.
 * Но это ещё не всё. По дорогам страны X можно двигаться только от города
 * с меньшим номером к городу с большим номером.
 * Это объясняет большой приток жителей в столицу, у которой номер n.
 * Карта железных дорог называется оптимальной, если не существует
 * пары городов A и B такой, что от A до B можно добраться как по дорогам
 * типа R, так и по дорогам типа B. Иными словами, для любой пары городов
 * верно, что от города с меньшим номером до города с бОльшим номером
 * можно добраться по дорогам только какого-то одного типа или же что
 * маршрут построить вообще нельзя. Выясните, является ли данная вам карта
 * оптимальной.
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

class RailwayMap {
  typeA = "R";
  typeB = "B";

  constructor(cities, roads) {
    // список смежности
    this.roadsList = Array.from({ length: cities + 1 }, () => []);

    this.buildMap(roads);
  }

  // построение списка смежности
  // считаем, что рёбра typeA идут в одном направлении, а рёбра typeB в обратном
  buildMap(roads) {
    for (let i = 1; i <= roads.length; i++) {
      const connections = roads[i - 1].split("");
      for (let x = 1; x <= connections.length; x++) {
        connections[x - 1] === this.typeA ? this.roadsList[i].push(i + x) : this.roadsList[i + x].push(i);
      }
    }
  }

  // цикл поиска в глубину DFS
  // с дополнительной проверкой на наличие цикла
  hasCycleDFS(start, colors) {
    const stack = [];
    stack.push(start);

    while (stack.length > 0) {
      const v = stack.pop();

      if (colors[v] === "white") {
        colors[v] = "gray";
        stack.push(v);

        const outgoingEdges = this.roadsList[v];
        for (let edge of outgoingEdges) {
          // если есть вершина промежуточного цвета "gray"
          // значит мы обрабатывали исходящие из неё вершины
          // но вошли снова к ней — это цикл
          if (colors[edge] === "gray") return true;
          if (colors[edge] === "white") stack.push(edge);
        }
      } else if (colors[v] === "gray") colors[v] = "black";
    }
  }

  // проверка на оптимальность путей
  isMapOptimal() {
    const colors = new Array(this.roadsList.length).fill("white");

    for (let v = 0; v < colors.length; v++) {
      if (colors[v] === "white") {
        // если в графе есть цикл, то пути не оптимальны
        if (this.hasCycleDFS(v, colors)) return false;
      }
    }

    return true;
  }
}

function solve() {
  const cities = readInt();
  const roads = readArray(cities - 1);

  const map = new RailwayMap(cities, roads);
  process.stdout.write(map.isMapOptimal() ? "YES" : "NO");
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

function readArray(lines) {
  const array = new Array(lines);
  for (let i = 0; i < lines; i++) {
    array[i] = readLine();
  }
  return array;
}
