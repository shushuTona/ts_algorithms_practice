import { Sort } from '@/algorithms/sorting/Sort';

class QuickSort<T> extends Sort<T> {
    sort( originalArray: T[] ): T[] {
        const array = [...originalArray];

        if(
            array.length <= 1
        ) {
            return array;
        }

        const leftArray = [];
        const rightArray = [];

        const pivotElement = array.shift();
        if(pivotElement === undefined) {
            return array;
        }

        const centerArray = [pivotElement];

        while (array.length) {
            const currentElement = array.shift();

            this.callbacks.visitingCallback && currentElement !== undefined && this.callbacks.visitingCallback(currentElement);

            if (
                currentElement !== undefined &&
                pivotElement !== undefined
            ) {
                if(
                    this.comparator.equal(currentElement, pivotElement)
                ) {
                    centerArray.push(currentElement);
                } else if(
                    this.comparator.lessThanOrEqual(currentElement, pivotElement)
                ) {
                    leftArray.push(currentElement);
                } else {
                    rightArray.push(currentElement);
                }
            }
        }

        const leftSortedArray = this.sort(leftArray);
        const rightSortedArray = this.sort(rightArray);

        return leftSortedArray.concat(centerArray, rightSortedArray);
    }
}

export { QuickSort }
