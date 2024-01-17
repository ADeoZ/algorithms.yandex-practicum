/**
 * Дано бинарное дерево поиска, в котором хранятся ключи.
 * Ключи — уникальные целые числа. Найдите вершину с заданным ключом
 * и удалите её из дерева так, чтобы дерево осталось корректным бинарным деревом поиска.
 * Если ключа в дереве нет, то изменять дерево не надо.
 * На вход вашей функции подаётся корень дерева и ключ, который надо удалить.
 * Функция должна вернуть корень изменённого дерева.
 */

function remove(node, key) {
  // если узел не найден, то ничего не меняем
  if (!node) return null;

  // если значение в левом поддереве, то переходим в левое поддерево
  if (node.value > key) {
    node.left = remove(node.left, key);
  }
  // если значение в правом поддереве, то переходим в правое поддерево
  if (node.value < key) {
    node.right = remove(node.right, key);
  }
  if (node.value === key) {
    // если у найденного узла нет одного поддерева, то подсоединяем имеющееся к родителю
    if (!node.left) return node.right;
    if (!node.right) return node.left;

    // если у найденного узла есть левое поддерево, то ищем там крайний правый узел
    const rightestNode = findRightest(node.left);
    // он занимает место удаляемого узла и забирает его правое поддерево
    rightestNode.right = node.right;
    return rightestNode;
  }

  return node;
}

function findRightest(startNode) {
  let node = startNode;
  let previousNode;
  while (node.right) {
    previousNode = node;
    node = node.right;
  }
  // если крайний правый не единственный в левом поддереве
  if (previousNode) {
    // то его предок забирает его левые узлы
    previousNode.right = node.left;
    // а он забирает обновлённое левое поддерево удаляемого узла
    node.left = startNode;
  }
  return node;
}
