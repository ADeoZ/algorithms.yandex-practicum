/**
 * Вася размышляет, что ему можно не делать из того списка дел,
 * который он составил. Но, кажется, все пункты очень важные!
 * Вася решает загадать число и удалить дело, которое идёт под этим номером.
 * Список дел представлен в виде односвязного списка. Напишите функцию solution,
 * которая принимает на вход голову списка и номер удаляемого дела
 * и возвращает голову обновлённого списка.
 */

if (process.env.REMOTE_JUDGE !== "true") {
  class Node {
    constructor(value = null, next = null) {
      this.value = value;
      this.next = next;
    }
  }
}

function solution(head, deleteIndex) {
  let index = 0;
  let currentNode = head;
  if (deleteIndex === 0) {
    return head.next;
  }
  while (currentNode) {
    if (index === deleteIndex - 1) {
      const deleteNode = currentNode.next;
      currentNode.next = deleteNode.next;
    }
    currentNode = currentNode.next;
    index++;
  }
  return head;
}

function test() {
  var node3 = new Node("node3");
  var node2 = new Node("node2", node3);
  var node1 = new Node("node1", node2);
  var node0 = new Node("node0", node1);
  var newHead = solution(node0, 1);
  // result is node0 -> node2 -> node3
}
