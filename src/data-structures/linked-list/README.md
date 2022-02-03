https://github.com/trekhleb/javascript-algorithms/tree/master/src/data-structures/linked-list

## memo

### LinkedListNode

- `value`でそのNodeの値を設定、`next`で次のNodeへの参照を設定する
- 下記の各`value`は、結局同じvalueのことを指している為、型が一致している必要がある
    - `value`プロパティ
    - `next`プロパティに設定するLinkedListNodeの引数のvalue
    - `toString`メソッドのcallback関数の引数value

### LinkedList
- prepend
- append
- insert
- delete
- find
- deleteTail
- deleteHead
- fromArray
- toArray
- toString
- reverse
