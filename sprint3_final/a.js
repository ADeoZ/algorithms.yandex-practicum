/**
 * Алла ошиблась при копировании из одной структуры данных в другую.
 * Она хранила массив чисел в кольцевом буфере. Массив был отсортирован по возрастанию,
 * и в нём можно было найти элемент за логарифмическое время.
 * Алла скопировала данные из кольцевого буфера в обычный массив,
 * но сдвинула данные исходной отсортированной последовательности
 * (при этом массив все равно мог остаться отсортированным).
 * Тем не менее, нужно обеспечить возможность находить в нем элемент за O(logn).
 * Можно предполагать, что в массиве только уникальные элементы.
 */

function brokenSearch(array, x, left = 0, right = array.length) {
  // массив не сломан
  if (array[left] <= array[right - 1]) return binarySearch(array, x, left, right);

  const mid = Math.floor((left + right) / 2);
  if (x === array[mid]) return mid;

  // если левая часть сломана
  if (array[left] > array[mid - 1]) {
    if (x >= array[left] || x <= array[mid - 1]) {
      return brokenSearch(array, x, left, mid);
    } else {
      return binarySearch(array, x, mid + 1, right);
    }
    // если левая часть не сломана и искомое в левой части
  } else if (x >= array[left] && x <= array[mid - 1]) {
    return binarySearch(array, x, left, mid);
  } else return brokenSearch(array, x, mid + 1, right);
}

function binarySearch(array, x, left, right) {
  if (left >= right) return -1;
  const mid = Math.floor((left + right) / 2);
  if (x === array[mid]) return mid;
  else if (x < array[mid]) return binarySearch(array, x, left, mid);
  else return binarySearch(array, x, mid + 1, right);
}
