# [Doubly Linked List](https://github.com/trekhleb/javascript-algorithms/tree/master/src/data-structures/doubly-linked-list)

## memo

### DoublyLinkedListNode
- 基本は`LinkedListNode`と同じ
- メンバー変数として`previous`と`next`を持つことで、前後関係を設定することができる

### DoublyLinkedList
- 基本は`DoublyLinkedList`と同じ
- 前後関係を設定できるから、`deleteTail`だったりの実装が簡潔になっている
