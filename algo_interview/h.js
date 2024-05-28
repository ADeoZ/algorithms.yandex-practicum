/**
 * В этой задаче требуется сделать разворот части односвязного списка. Каждая
 * вершина списка описывается структурой Node, каждый экземпляр хранит
 * указатель на следующую вершину или null (nullptr, None, nil), если вершина
 * последняя. По заданным индексам from и to разверните все вершины на отрезке
 * с from до to включительно. Заметьте, что нумерация в индексах from и to с
 * единицы.
 */

/** Comment it before submitting
 class Node {
    constructor(value = null, next = null) {
        this.value = value;
        this.next = next;
    }
}
*/

/**
 * @param {Node} head
 * @param {number} left
 * @param {number} right
 * @return {Node}
 */
var Reverse = function (head, left, right) {
  const reverseIt = (node, steps) => {
    let prevNode = null;
    let currentNode = node;
    while (currentNode && steps >= 0) {
      [currentNode.next, prevNode, currentNode] = [prevNode, currentNode, currentNode.next];
      steps--;
    }
    return [prevNode, currentNode];
  };

  let counter = 1;
  let prevNode = null;
  let currentNode = head;
  while (currentNode) {
    if (counter === left) {
      let [start, end] = reverseIt(currentNode, right - left);
      if (prevNode) prevNode.next = start;
      else head = start;

      currentNode.next = end;
    }
    [prevNode, currentNode] = [currentNode, currentNode.next];
    counter++;
  }

  return head;
};
