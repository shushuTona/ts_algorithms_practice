import { Sort } from '@/algorithms/sorting/Sort';

class BubbleSort<T> extends Sort<T> {
    sort(originalArray: T[]) {
        let swapped = false;

        // 処理の中で配列要素の配置変更が発生する為、加工用の配列を作成する
        const array = [...originalArray];

        for (let i = 1; i < array.length; i++) {
            swapped = false;

            const item = array[i];
            if(item && this.callbacks.visitingCallback) this.callbacks.visitingCallback(item);

            for (let j = 0; j < array.length - i; j++) {
                const item = array[j];
                if(item && this.callbacks.visitingCallback) this.callbacks.visitingCallback(item);

                // currentItemとnextItemを比較して、currentItemの方が値が大きいかを判定
                const nextItem = array[j + 1];
                const currentItem = array[j];

                if(
                    nextItem !== undefined &&
                    currentItem !== undefined &&
                    this.comparator.lessthan(nextItem, currentItem)
                ) {
                    // currentItemがnextItemより値が大きい場合、配列内の位置を入れ替える
                    [array[j], array[j + 1]] = [nextItem, currentItem];

                    // 要素の配置入れ替えが発生したのでフラグを有効化する
                    swapped = true;
                }
            }

            // 要素の配置入れ替えが発生しなかった場合、これ以降ソート処理は必要無い為、繰り返し処理を終了する
            if(
                !swapped
            ) {
                return array;
            }
        }

        return array;
    }
}

export { BubbleSort }
