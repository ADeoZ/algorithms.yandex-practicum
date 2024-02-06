/**
 * Дано количество учебных занятий, проходящих в одной аудитории.
 * Для каждого из них указано время начала и конца.
 * Нужно составить расписание, в соответствии с которым в классе
 * можно будет провести как можно больше занятий.
 * Если возможно несколько оптимальных вариантов, то выведите любой.
 * Возможно одновременное проведение более чем одного занятия
 * нулевой длительности.
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

const getBestSchedule = (lessons) => {
  const sortedLessons = lessons.sort((a, b) => (a[1] !== b[1] ? a[1] - b[1] : a[0] - b[0]));

  const schedule = [sortedLessons[0]];
  for (let i = 1; i < sortedLessons.length; i++) {
    if (sortedLessons[i][0] < schedule[schedule.length - 1][1]) continue;
    else schedule.push(sortedLessons[i]);
  }

  return schedule
    .reduce((result, lesson) => [...result, lesson.join(" ")], [`${schedule.length}`])
    .join("\n");
};

function solve() {
  const lines = readInt();
  const lessons = readIntArray(lines);

  process.stdout.write(getBestSchedule(lessons));
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readIntLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line.split(" ").map(Number);
}

function readIntArray(lines) {
  const array = new Array(lines);
  for (let i = 0; i < lines; i++) {
    array[i] = readIntLine();
  }
  return array;
}
