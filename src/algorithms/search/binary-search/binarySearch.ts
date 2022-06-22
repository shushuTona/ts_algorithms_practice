import { Comparator, compareFunction } from '@/utils/comparator/Comparator';

const binarySearch = <T>(sortedArray: T[], seekElement: T, comparatorCallback?: compareFunction<T>): number => {
    const comparator = new Comparator(comparatorCallback);

    let startIndex = 0;
    let endIndex = sortedArray.length - 1;

    while(
        startIndex <= endIndex
    ) {
        const middleIndex = startIndex + Math.floor((endIndex - startIndex) / 2);
        const middleIndexElement = sortedArray[middleIndex];

        if(
            !middleIndexElement
        ) {
            return -1;
        }

        if(
            comparator.equal(middleIndexElement, seekElement)
        ){
            return middleIndex;
        }

        if(
            comparator.lessthan(middleIndexElement, seekElement)
        ){
            startIndex = middleIndex + 1;
        } else {
            endIndex = middleIndex - 1;
        }
    }

    return -1;
}

export default binarySearch;
