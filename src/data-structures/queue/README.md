# [Queue](https://github.com/trekhleb/javascript-algorithms/tree/master/src/data-structures/queue)

## memo

### Queue

- `LinkedList`をラップしているから、コードもシンプルで分かりやすい
- `isEmpty` での `this.linkedList.head` の判定を `peek` の中でも再度行っている為、モヤっとが残る
    - isEmptyが引数 `head` とか受け取って、戻り値の型として `head is null` とかすれば良いのかもだけど
