/**
 * Тимофей решил организовать соревнование по спортивному программированию,
 * чтобы найти талантливых стажёров. Задачи подобраны, участники зарегистрированы,
 * тесты написаны. Осталось придумать, как в конце соревнования будет определяться победитель.
 * Каждый участник имеет уникальный логин. Когда соревнование закончится,
 * к нему будут привязаны два показателя: количество решённых задач Pi и размер штрафа Fi.
 * Штраф начисляется за неудачные попытки и время, затраченное на задачу.
 * Тимофей решил сортировать таблицу результатов следующим образом:
 * при сравнении двух участников выше будет идти тот, у которого решено больше задач.
 * При равенстве числа решённых задач первым идёт участник с меньшим штрафом.
 * Если же и штрафы совпадают, то первым будет тот, у которого логин идёт раньше
 * в алфавитном (лексикографическом) порядке.
 * Тимофей заказал толстовки для победителей и накануне поехал за ними в магазин.
 * В своё отсутствие он поручил вам реализовать алгоритм быстрой сортировки (англ. quick sort)
 * для таблицы результатов. Так как Тимофей любит спортивное программирование
 * и не любит зря расходовать оперативную память, то ваша реализация сортировки
 * не может потреблять O(n) дополнительной памяти для промежуточных данных
 * (такая модификация быстрой сортировки называется "in-place").
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

const greaterOrLess = (playerA, playerB) => {
  const [nameA, tasksA, penA] = playerA;
  const [nameB, tasksB, penB] = playerB;

  if (tasksA !== tasksB) return tasksA > tasksB ? 1 : -1;
  else if (penA !== penB) return penA < penB ? 1 : -1;
  else if (nameA !== nameB) return nameA < nameB ? 1 : -1;
  return 0;
};

const getResultsTable = (playerPoints, left = 0, right = playerPoints.length - 1) => {
  if (left === right) return playerPoints;

  let pivotValues = playerPoints[Math.floor((left + right) / 2)];

  let l = left;
  let r = right;
  while (l <= r) {
    while (greaterOrLess(playerPoints[l], pivotValues) > 0) l++;
    while (greaterOrLess(playerPoints[r], pivotValues) < 0) r--;

    if (l <= r) {
      [playerPoints[l], playerPoints[r]] = [playerPoints[r], playerPoints[l]];
      l++;
      r--;
    }
  }

  if (l < right) getResultsTable(playerPoints, l, right);
  if (left < r) getResultsTable(playerPoints, left, r);

  return playerPoints;
};

function solve() {
  const players = readInt();
  const playerResults = readResultsMatrix(players);

  const resultsTable = getResultsTable(playerResults);
  resultsTable.forEach((row) => console.log(row[0]));
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readResultsArray() {
  const arr = _inputLines[_curLine].trim().split(" ");
  arr[1] = Number(arr[1]);
  arr[2] = Number(arr[2]);
  _curLine++;
  return arr;
}

function readResultsMatrix(rowsCount) {
  const arr = [];
  for (let i = 0; i !== rowsCount; i++) {
    arr.push(readResultsArray());
  }
  return arr;
}
