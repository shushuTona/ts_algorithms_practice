import { Sort } from '@/algorithms/sorting/Sort';

class SelectionSort<T> extends Sort<T> {
    sort(originalArray: T[]) {
        const array = [...originalArray];

        for(let i = 0; i < array.length - 1; i++) {
            // 最小値のindex番号を繰り返し処理のスタート値で初期化
            let minIndex = i;

            const item = array[i];
            item && this.callbacks.visitingCallback && this.callbacks.visitingCallback(item);
            for(let j = i + 1; j < array.length; j++) {
                const currentItem = array[j];
                currentItem && this.callbacks.visitingCallback && this.callbacks.visitingCallback(currentItem);

                const minItem = array[minIndex];

                if(
                    currentItem !== undefined &&
                    minItem !== undefined &&
                    this.comparator.lessthan(currentItem, minItem)
                ) {
                    // currentItemの方が現状minItemよりも値が小さい為、minIndexを更新する
                    minIndex = j;
                }
            }

            // 前段の繰り返し処理でminIndexが更新されている場合、配列内の対象要素位置を入れ替える
            // （各繰り返し処理毎に、最小値だった要素が繰り返し処理の初期インデックス番号の位置になる）
            if(
                minIndex !== i
            ) {
                const minItem = array[minIndex];
                const currentItem = array[i];

                if(
                    minItem !== undefined &&
                    currentItem !== undefined
                ) {
                    [array[i], array[minIndex]] = [minItem, currentItem];
                }
            }
        }

        return array;
    }
}

export { SelectionSort }
