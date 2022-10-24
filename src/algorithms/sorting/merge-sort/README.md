# [MergeSort](https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/sorting/merge-sort)

## memo

### MergeSort

- 配列内の中央のindex番号を基に配列を分割して2つの配列を生成する処理を対象の配列要素が1つになるまで再帰実行して、その後値を比較して小さい順に配列に格納していく
- 再起処理でsortを呼び出すのが良いかんじ
