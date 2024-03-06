/**
 * В некоторых IDE поддерживается навигация по файлам через их сокращённые
 * названия. Если в языке принято называть классы CamelCase'ом (как в
 * Java, например), то по заглавным буквам названия можно быстро найти
 * нужный класс. Например, если название класса
 * «MyFavouriteConfigurableScannerFactory», то его можно найти по строке
 * «MFCSF». Но если в проекте есть класс
 * «theMultiFunctionalCommaSeparatedFile», то он тоже будет подходить под
 * этот паттерн, и при поиске надо будет выбрать между этими двумя
 * вариантами.
 * Вам дан набор строк в CamelCase. Далее будут поступать запросы в виде
 * строк-паттернов из прописных букв английского алфавита. Вам надо
 * находить такие строки среди исходных, которые удовлетворяют заданному
 * шаблону, и выводить их в лексикографическом порядке.
 * Также в паттерне может быть только несколько первых заглавных букв.
 * Например, если бы в указанном выше примере был бы паттерн «MFCS», то
 * существующие две строки походили бы под него, а также подходил бы,
 * например, «MamaFicusCodingSouthWestNorth». А вот
 * «MamaCodingSouthWestNorth» –— уже нет.
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

class Node {
  constructor(char) {
    this.char = char;
    this.edges = {};
    this.indexes = [];
  }
}

const addString = (root, string, index) => {
  root.indexes.push(index);
  let currentNode = root;
  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    if (char.charCodeAt() > 90) continue;

    if (!currentNode.edges[char]) {
      const newNode = new Node(char);
      currentNode.edges[char] = newNode;
    }

    currentNode = currentNode.edges[char];
    currentNode.indexes.push(index);
  }

  return currentNode;
};

const createTrie = (strings) => {
  const root = new Node("");

  strings.forEach((string, index) => addString(root, string, index));

  return root;
};

const findInTree = (root, pattern) => {
  let currentNode = root;
  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    currentNode = currentNode.edges[char];
    if (!currentNode) return [];
  }

  return currentNode.indexes;
};

const findPatterns = (strings, patterns) => {
  strings.sort();
  const root = createTrie(strings);

  for (let i = 0; i < patterns.length; i++) {
    const results = findInTree(root, patterns[i]).map((i) => strings[i]);
    process.stdout.write(results.join("\n"));
    process.stdout.write("\n");
  }
};

function solve() {
  const stringsCount = readInt();
  const strings = readLineArray(stringsCount);
  const patternsCount = readInt();
  const patterns = readLineArray(patternsCount);

  findPatterns(strings, patterns);
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

function readLineArray(lines) {
  const array = new Array(lines);
  for (let i = 0; i < lines; i++) {
    array[i] = readLine();
  }
  return array;
}
