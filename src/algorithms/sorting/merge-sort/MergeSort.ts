import { Sort } from '@/algorithms/sorting/Sort';

class MergeSort<T> extends Sort<T> {
    sort(originalArray: T[]): T[] {
        this.callbacks.visitingCallback && originalArray[0] !== undefined && this.callbacks.visitingCallback(originalArray[0]);

        if(
            originalArray.length <= 1
        ) {
            return originalArray;
        }

        // get the middle index number of originalArray
        const middleIndex = Math.floor(originalArray.length / 2);

        // based on middleIndex, create leftArray and rightArray.
        // leftArray includes elements which index number is to middleIndex from 0 in originalArray.
        // rightArray includes elements which index number is to originalArray last index from middleIndex in originalArray.
        const leftArray = originalArray.slice(0, middleIndex);
        const rightArray = originalArray.slice(middleIndex, originalArray.length);

        // sort splited array
        // this.sort recursively until leftArray and rightArray are single-element arrays.
        const sortedLeftArray = this.sort(leftArray);
        const sortedRightArray = this.sort(rightArray);

        return this.mergeSortedArrays(sortedLeftArray, sortedRightArray);
    }

    mergeSortedArrays(leftArray: T[], rightArray: T[]): T[] {
        const sortedArray = [];

        let leftIndex = 0;
        let rightIndex = 0;
        let leftElement = leftArray[leftIndex];
        let rightElement = rightArray[rightIndex];
        while(
            leftIndex < leftArray.length &&
            rightIndex < rightArray.length &&
            leftElement !== undefined &&
            rightElement !== undefined
        ) {
            let minElement: T;

            // compare leftElement and rightElement, assigns the smaller value to minElement and increses index number of the smaller value side.
            if(
                this.comparator.lessThanOrEqual(leftElement, rightElement)
            ) {
                minElement = leftElement;
                leftIndex++;
            } else {
                minElement = rightElement;
                rightIndex++;
            }

            // add minElement to sortedArray and reassign value to leftElement and rightElement.
            sortedArray.push(minElement);

            leftElement = leftArray[leftIndex];
            rightElement = rightArray[rightIndex];

            this.callbacks.visitingCallback && this.callbacks.visitingCallback(minElement);
        }

        return sortedArray
                .concat(leftArray.slice(leftIndex))
                .concat(rightArray.slice(rightIndex));
    }
}

export { MergeSort }
