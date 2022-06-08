import { Comparator, compareFunction } from '@/utils/comparator/Comparator';

const jumpSearch = <T>(sortedArray: T[], seekElement: T, comparatorCallback?: compareFunction<T>): number => {
    const comparator = new Comparator(comparatorCallback);
    const arraySize = sortedArray.length;

    // 対象配列が空の場合処理を終了させる
    if(
        arraySize === 0
    ) {
        return -1;
    }

    // jumpSizeが√array.lengthの時が最適な値らしい（らしい）
    const jumpSize = Math.floor(Math.sqrt(arraySize));

    // jumpSize間隔でsortedArrayの値とseekElementの値を比較
    // seekElementよりもsortedArrayの値の方が大きくなるまでblockEndを加算していく
    let blockStart = 0;
    let blockEnd = jumpSize;
    while(
        comparator.greaterThan(
                        seekElement,
                        sortedArray[Math.min(blockEnd, arraySize) - 1]
                    )
    ) {
        blockStart = blockEnd;
        blockEnd += jumpSize;

        // 次の探索対象が配列の要素数よりも大きかった場合、処理を終了する
        if(
            blockStart > arraySize
        ) {
            return -1;
        }
    }

    // blockStartの位置からindex=0までの間の値を比較して確認する
    let currentIndex = blockStart;
    while(
        currentIndex < Math.min(blockEnd, arraySize)
    ) {
        if(
            comparator.equal(sortedArray[currentIndex], seekElement)
        ) {
            return currentIndex;
        }

        currentIndex++; 
    }

    return -1;
}

export default jumpSearch;