/**
 * Гоше дали задание написать красивую сортировку слиянием. Поэтому Гоше обязательно надо реализовать
 * отдельно функцию merge и функцию merge_sort.
 * Функция merge принимает два отсортированных массива, сливает их в один отсортированный массив и возвращает его.
 * Функция merge_sort принимает некоторый подмассив, который нужно отсортировать.
 * Подмассив задаётся полуинтервалом — его началом и концом.
 * Функция должна отсортировать передаваемый в неё подмассив, она ничего не возвращает.
 * Функция merge_sort разбивает полуинтервал на две половинки и рекурсивно вызывает сортировку отдельно для каждой.
 * Затем два отсортированных массива сливаются в один с помощью merge.
 */

function merge_sort(arr, left, right) {
  if (left >= right - 1) return;

  const mid = Math.floor((left + right) / 2);
  merge_sort(arr, left, mid);
  merge_sort(arr, mid, right);

  const result = merge(arr, left, mid, right);
  for (let i = 0; i < result.length; i++) {
    arr[left + i] = result[i];
  }
}

function merge(arr, left, mid, right) {
  let l = left;
  let r = mid;
  const result = [];
  let i = 0;

  while (l < mid && r < right) {
    if (arr[l] <= arr[r]) {
      result[i] = arr[l];
      i++;
      l++;
    } else {
      result[i] = arr[r];
      i++;
      r++;
    }
  }

  while (l < mid) {
    result[i] = arr[l];
    i++;
    l++;
  }
  while (r < right) {
    result[i] = arr[r];
    i++;
    r++;
  }

  return result;
}

function test() {
  var a = [1, 4, 9, 2, 10, 11];
  var b = merge(a, 0, 3, 6);
  var expected = [1, 2, 4, 9, 10, 11];

  var c = [1, 4, 2, 10, 1, 2];
  merge_sort(c, 0, 6);
  expected = [1, 1, 2, 2, 4, 10];
}
