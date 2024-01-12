/**
 * Напишите функцию, совершающую просеивание вверх в куче на максимум.
 * Гарантируется, что порядок элементов в куче может быть нарушен
 * только элементом, от которого запускается просеивание.
 * Функция принимает в качестве аргументов массив, в котором хранятся элементы кучи,
 * и индекс элемента, от которого надо сделать просеивание вверх.
 * Функция должна вернуть индекс, на котором элемент оказался после просеивания.
 * Также необходимо изменить порядок элементов в переданном в функцию массиве.
 */

function siftUp(heap, index) {
  if (index === 1) return 1;

  const parentIndex = Math.trunc(index / 2);
  if (heap[parentIndex] < heap[index]) {
    [heap[parentIndex], heap[index]] = [heap[index], heap[parentIndex]];
    return siftUp(heap, parentIndex);
  } else return index;
}

function test() {
  var sample = [-1, 12, 6, 8, 3, 15, 7];
  console.assert(siftUp(sample, 5) == 1);
}
