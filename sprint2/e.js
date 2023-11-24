/**
 * Вася решил запутать маму —– делать дела в обратном порядке.
 * Список его дел теперь хранится в двусвязном списке.
 * Напишите функцию, которая вернёт список в обратном порядке.
 */

if (process.env.REMOTE_JUDGE !== "true") {
  class Node {
    constructor(value = null, next = null, prev = null) {
      this.value = value;
      this.next = next;
      this.prev = prev;
    }
  }
}

function solution(node) {
  let head = node;
  while (node) {
    [node.prev, node.next] = [node.next, node.prev];
    node = node.prev;
    if (node) head = node;
  }

  return head;
}

function test() {
  var node3 = new Node("node3");
  var node2 = new Node("node2", node3);
  var node1 = new Node("node1", node2);
  var node0 = new Node("node0", node1);
  node1.prev = node0;
  node2.prev = node1;
  node3.prev = node2;
  var newHead = solution(node0);
  /*
  result is newHead === node3
  node0.prev === node1
  node1.next === node0
  node1.prev === node2
  node2.next === node1
  node2.prev === node3
  node3.next === node2
  */
}
