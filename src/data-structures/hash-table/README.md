# [Hash Table](https://github.com/trekhleb/javascript-algorithms/tree/master/src/data-structures/hash-table)

## memo

### HashTable

- `this.buckets`には、`hashTableSize`で指定した長さの`LinkedList`が格納される
- `LinkedList`のNodeとして`key`と`value`を持ったオブジェクトが格納される
- `this.keys`には、キー（文字列）とそのキーのハッシュ値（文字列）のペアが格納される

- hash
    - キー（文字列）の`charCodeAt`の合計値を生成する
    - 生成した合計値を`this.buckets`の長さ（=`hashTableSize`）を割った剰余をハッシュ値とする
- set
    - 引数のキー（文字列）からハッシュ値を生成して、対象の`LinkedList`を取得する
    - 取得したLinkedListのfindメソッドでキーを基に対象のNodeを取得する
    - 対象のNodeが存在しない場合、`append`メソッドで引数のキーとvalueのペアを追加する
    - 対象のNodeが存在する場合、既存のvalueの値を更新する
- delete
    - `delete`演算子で`this.keys`の対象キーの値を削除する
    - 引数のキー（文字列）からハッシュ値を生成して、対象の`LinkedList`を取得する
    - 取得したLinkedListのfindメソッドでキーを基に対象のNodeを取得する
    - 対象のNodeが存在する場合、対象Nodeを`LinkedList`の`delete`メソッドで削除する
- get
    - 引数のキー（文字列）からハッシュ値を生成して、対象の`LinkedList`を取得する
    - 取得したLinkedListのfindメソッドでキーを基に対象のNodeを取得する
- has
    - `this.keys`に引数のキー（文字列）がプロパティとして設定されているかを判定する
- getKeys
    - `this.keys`のキー一覧を取得する
- getValues
    - `this.buckets`にそれぞれ設定されている`LinkedList`内の各Nodeに設定されているvalueの一覧を取得する
