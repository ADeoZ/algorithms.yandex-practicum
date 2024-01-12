/**
 * Напишите функцию, совершающую просеивание вниз в куче на максимум.
 * Гарантируется, что порядок элементов в куче может быть нарушен только элементом,
 * от которого запускается просеивание.
 * Функция принимает в качестве аргументов массив, в котором хранятся элементы кучи,
 * и индекс элемента, от которого надо сделать просеивание вниз.
 * Функция должна вернуть индекс, на котором элемент оказался после просеивания.
 * Также необходимо изменить порядок элементов в переданном в функцию массиве.
 */

function siftDown(heap, index) {
  const leftIndex = index * 2;
  const rightIndex = index * 2 + 1;

  if (leftIndex > heap.length - 1) return index;

  const swapIndex = heap[rightIndex] == null || heap[leftIndex] > heap[rightIndex] ? leftIndex : rightIndex;

  if (heap[index] < heap[swapIndex]) {
    [heap[index], heap[swapIndex]] = [heap[swapIndex], heap[index]];
    return siftDown(heap, swapIndex);
  } else return index;
}

function test() {
  var sample = [-1, 12, 1, 8, 3, 4, 7];
  console.assert(siftDown(sample, 2) == 5);
}
