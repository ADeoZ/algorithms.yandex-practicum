/**
 * Гоша увлёкся хоккеем и часто смотрит трансляции матчей.
 * Чтобы более-менее разумно оценивать силы команд, он сравнивает очки,
 * набранные во всех матчах каждой командой.
 * Гоша попросил вас написать программу, которая по результатам игр
 * двух выбранных команд найдёт наибольший по длине отрезок матчей,
 * когда эти команды зарабатывали одинаковые очки.
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

// константы для рассчёта хэша
const base = 1000;
const mod = 10000009;

// собираем хэш-префиксы
const getHashesArray = (string) => {
  let hashes = [0];
  for (let i = 0; i < string.length; i++) {
    hashes[i + 1] = (hashes[i] * base + string[i]) % mod;
  }
  return hashes;
};

// собираем коэффициенты умножения для экономии времени
const getCoeffsArray = (length) => {
  const coeffs = [1];
  for (let i = 1; i <= length; i++) {
    coeffs[i] = (coeffs[i - 1] * base) % mod;
  }
  return coeffs;
};

// функция расчёта хэша подстроки с помощью префиксов хэшей
const getHashSubstring = (bases, hashes, l, r) => {
  return (hashes[r] + mod - ((hashes[l - 1] * bases[r - l + 1]) % mod)) % mod;
};

const getMaximumCommonSubarray = (first, second) => {
  let left = 0;
  let right = Math.min(first.length, second.length);
  let maxSeries = 0;
  // собираем префиксы хэшей для строк
  const firtsHashes = getHashesArray(first);
  const secondHashes = getHashesArray(second);
  // рассчитываем коэффициенты умножения хэшей
  const bases = getCoeffsArray(right);

  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    // если подмассива длины mid нет, то сокращаем поиск и наоборот
    if (checkCommonSubarray(firtsHashes, secondHashes, bases, mid, first, second)) {
      left = mid + 1;
      maxSeries = mid;
    } else {
      right = mid - 1;
    }
  }

  return maxSeries;
};

const checkCommonSubarray = (firstHashes, secondHashes, bases, length, first, second) => {
  const firstSubstrings = new Map();
  // собираем хэши заданной длины из первого массива с использованием сдвига по префиксам
  for (let i = 1; i <= firstHashes.length - length; i++) {
    firstSubstrings.set(getHashSubstring(bases, firstHashes, i, i + length - 1), i);
  }

  // сверям хэши заданной длины второго массива с собранными хэшами из первого
  for (let i = 1; i <= secondHashes.length - length; i++) {
    if (firstSubstrings.has(getHashSubstring(bases, secondHashes, i, i + length - 1))) {
      // дополнительная проверка на случай коллизий
      const firstIndex = firstSubstrings.get(getHashSubstring(bases, secondHashes, i, i + length - 1));
      const firstValue = first.slice(firstIndex - 1, firstIndex + length - 1).join(" ");
      const secondValue = second.slice(i - 1, i + length - 1).join(" ");
      if (firstValue === secondValue) return true;
    }
  }
  return false;
};

function solve() {
  const firstLength = readInt();
  const first = readIntArray();
  const secondLength = readInt();
  const second = readIntArray();

  process.stdout.write(`${getMaximumCommonSubarray(first, second)}`);
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readIntArray() {
  const arr = _inputLines[_curLine].trim(" ").split(" ").map(Number);
  _curLine++;
  return arr;
}
