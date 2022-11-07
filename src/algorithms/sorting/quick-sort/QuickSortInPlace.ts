import { Sort } from '@/algorithms/sorting/Sort';

class QuickSortInPlace<T> extends Sort<T> {
    sort(
        originalArray: T[],
        inputLowIndex = 0,
        inputHighIndex = originalArray.length - 1,
        recursiveCall = false,
    ): T[] {
        const array = recursiveCall ? originalArray : [...originalArray];

        if(inputLowIndex < inputHighIndex) {
            const partionIndex = this.partionArray(array, inputLowIndex, inputHighIndex);
            const RECURSIVE_CALL = true;

            this.sort(array, inputLowIndex, partionIndex - 1, RECURSIVE_CALL);
            this.sort(array, partionIndex + 1, inputHighIndex, RECURSIVE_CALL);
        }

        return array;
    }

    partionArray(originalArray: T[], lowIndex: number, highIndex: number): number {
        const pivot = originalArray[highIndex];

        pivot !== undefined && this.callbacks.visitingCallback && this.callbacks.visitingCallback(pivot);

        let partionIndex = lowIndex;
        for(let currentIndex = lowIndex; currentIndex < highIndex; currentIndex++){
            const currentElement = originalArray[currentIndex];
            if(
                currentElement !== undefined &&
                pivot !== undefined &&
                this.comparator.lessthan(currentElement, pivot)
            ) {
                this.swap(originalArray, partionIndex, currentIndex);
                partionIndex++;
            }
        }

        this.swap(originalArray, partionIndex, highIndex);

        return partionIndex;
    }

    swap(originalArray: T[], leftIndex: number, rightIndex: number) {
        const leftElement = originalArray[leftIndex];
        const rightElement = originalArray[rightIndex];
        if(
            leftElement !== undefined &&
            rightElement !== undefined
        ) {
            originalArray[leftIndex] = rightElement;
            originalArray[rightIndex] = leftElement;
        }
    }
}

export { QuickSortInPlace }
