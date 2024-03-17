/**
 * Вася готовится к экзамену по алгоритмам и на всякий случай пишет шпаргалки.
 * Чтобы уместить на них как можно больше информации, он не разделяет слова
 * пробелами. В итоге получается одна очень длинная строка. Чтобы на самом
 * экзамене из-за нервов не запутаться в прочитанном, он просит вас написать
 * программу, которая по этой длинной строке и набору допустимых слов
 * определит, можно ли разбить текст на отдельные слова из набора.
 * Более формально: дан текст T и набор строк s1, ... ,sn. Надо определить,
 * представим ли T как sk1sk2...skr, где ki — индексы строк. Индексы могут
 * повторяться. Строка si может встречаться в разбиении текста T произвольное
 * число раз. Можно использовать не все строки для разбиения. Строки могут
 * идти в любом порядке.
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

// узел символа для дерева с пометкой является ли он конечным листом
class Node {
  constructor(char) {
    this.char = char;
    this.edges = {};
    this.terminal = false;
  }
}

// добавление строки в дерево через последовательный перебор символов
const addString = (root, string) => {
  let currentNode = root;
  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    if (!currentNode.edges[char]) {
      const newNode = new Node(char);
      currentNode.edges[char] = newNode;
    }
    currentNode = currentNode.edges[char];
  }
  // последний символ отмечаем конечным
  currentNode.terminal = true;

  return currentNode;
};

// создание дерева для всех строк
const createTrie = (strings) => {
  const root = new Node("");
  // первый пустой символ также является конечным
  root.terminal = true;

  strings.forEach((string) => addString(root, string));

  return root;
};

// проверка на возможность разделения текста на отдельные слова
const canSplitTextIntoWords = (text, words) => {
  const root = createTrie(words);

  let currentNode = root;
  // создаём массив с пометками, где может быть разделение текста
  // пометка -1 - ещё не проверен символ, 1 - здесь может быть конец слова
  // 0 - этот конец слова был проверен и с ним разбивка не складывается
  const canBeStart = new Array(text.length).fill(-1);
  for (let n = 0; n < text.length; n++) {
    const currentChar = text[n];
    currentNode = currentNode.edges[currentChar];

    // если не находим узел или если он последний, но не является концом слова
    if (!currentNode || (n === text.length - 1 && !currentNode.terminal)) {
      // если дальнейшее разделение не складывается, ищем предыдущую возможную точку старта
      while (canBeStart[n] !== 1 && n >= 0) n--;
      // если прошли по всем вариантам, а 1 не найдена, значит разделение невозможно
      if (n === -1) return false;
      // меняем пометку, что этот вариант мы уже пробовали
      canBeStart[n] = 0;
      currentNode = root;
    }
    // если узел является конечным и не был посещён ранее, то добавляем его как возможный старт
    else if (currentNode.terminal && canBeStart[n] === -1) canBeStart[n] = 1;
  }

  return true;
};

function solve() {
  const text = readLine();
  const wordsCount = readInt();
  const words = readLineArray(wordsCount);

  process.stdout.write(canSplitTextIntoWords(text, words) ? "YES" : "NO");
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
