# [BubbleSort](https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/sorting/bubble-sort)

## memo

### BubbleSort

- 繰り返し処理の入れ子で実装されている。
- 外側の繰り返し処理は、ソートの比較対象位置の最大値を制御する。
- 内側の繰り返し処理は、実際のソートの判定と要素位置の入れ替えを実行する。
- ソート対象の配列の最後の要素からソートが確定していく為、内側の繰り返し処理の繰り返し回数は外側の繰り返し処理が進むに合わせて減っていく。
