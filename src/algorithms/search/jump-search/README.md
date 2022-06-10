# [Jump Search](https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/search/jump-search)

## memo

### JumpSearch

- ソートされた値が入った配列の頭から値を1つずつ確認（linearSearch）するのでは無くて、 `jumpSize` の間隔で値を確認して、対象の値よりも大きい値になった位置から配列の先頭方向に `linearSearch` で値を検索する
    - `jumpSize` で大雑把に対象値に近い位置まで検索位置を移動させることで、値が多い場合などlinearSearchよりも効率が良い（？）
- `Math.min` で `jumpSize` の着地位置 or 配列の終端のindex番号を取得しているのが面白いと思った
