/**
 * Тимофей пишет свою поисковую систему.
 * Имеется n документов, каждый из которых представляет собой текст из слов.
 * По этим документам требуется построить поисковый индекс. На вход системе будут подаваться запросы.
 * Запрос —– некоторый набор слов. По запросу надо вывести 5 самых релевантных документов.
 * Релевантность документа оценивается следующим образом: для каждого уникального слова из запроса
 * берётся число его вхождений в документ, полученные числа для всех слов из запроса суммируются.
 * Итоговая сумма и является релевантностью документа. Чем больше сумма, тем больше документ
 * подходит под запрос.
 * Сортировка документов на выдаче производится по убыванию релевантности.
 * Если релевантности документов совпадают —– то по возрастанию их порядковых номеров в базе
 * (то есть во входных данных).
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

class EngineSearch {
  constructor() {
    this.index = new Map();
    this.serpSize = 5;
  }

  // индексация массива строк
  indexingBase(base, size) {
    for (let i = 0; i < size; i++) {
      this.indexingDocument({ id: i + 1, text: base[i] });
    }
  }

  // индексация строки
  indexingDocument({ id, text }) {
    const words = text.split(" ");
    const wordsFrequency = new Map();
    // собираем для каждого слова частотность в строке
    words.forEach((word) => {
      if (wordsFrequency.has(word)) {
        const currentFrequency = wordsFrequency.get(word) + 1;
        wordsFrequency.set(word, currentFrequency);
      } else wordsFrequency.set(word, 1);
    });
    // заносим информацию по данной строке в общий индекс
    wordsFrequency.forEach((frequency, word) => {
      if (this.index.has(word)) {
        const currentFrequency = this.index.get(word);
        this.index.set(word, [...currentFrequency, { id, frequency }]);
      } else this.index.set(word, [{ id, frequency }]);
    });
  }

  // формирование выдачи из идентификаторов релевантных запросу строк
  getSerp(request) {
    const relevantDocuments = this.getRelevantDocuments(request);
    return relevantDocuments
      .map(([id, frequency]) => ({ id, frequency }))
      .sort((a, b) => (b.frequency !== a.frequency ? b.frequency - a.frequency : a.id - b.id))
      .slice(0, this.serpSize)
      .map(({ id }) => id)
      .join(" ");
  }

  // получение строк релевантных запросу
  getRelevantDocuments(request) {
    const reqWords = new Set(request.split(" "));
    const relevantDocuments = new Map();
    // разбираем все слова из запроса
    reqWords.forEach((word) => {
      if (this.index.has(word)) {
        // все строки с частотностью по заданному слову
        const documentsFrequency = this.index.get(word);
        documentsFrequency.forEach((document) => {
          const { id, frequency } = document;
          // обновляем информацию по релевантности строки
          if (relevantDocuments.has(id)) {
            const currentFrequency = relevantDocuments.get(id);
            relevantDocuments.set(id, currentFrequency + frequency);
          } else relevantDocuments.set(id, frequency);
        });
      }
    });
    return [...relevantDocuments.entries()];
  }
}

function solve() {
  const baseLength = readInt();
  const base = readLineArray(baseLength);
  const requestsCount = readInt();
  const requests = readLineArray(requestsCount);

  const goondex = new EngineSearch();
  goondex.indexingBase(base, baseLength);

  requests.forEach((request) => {
    process.stdout.write(goondex.getSerp(request));
    process.stdout.write("\n");
  });
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
