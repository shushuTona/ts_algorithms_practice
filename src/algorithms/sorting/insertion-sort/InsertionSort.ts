import { Sort } from '@/algorithms/sorting/Sort';

class InsertionSort<T> extends Sort<T> {
    sort(originalArray: T[]) {
        const array = [...originalArray];

        for(let index = 1; index < array.length; index++){
            let currentIndex = index;
            let currentTarget = array[currentIndex];
            let prevTarget = array[currentIndex - 1];

            currentTarget !== undefined && this.callbacks.visitingCallback && this.callbacks.visitingCallback(currentTarget);

            while(
                currentTarget !== undefined &&
                prevTarget !== undefined &&
                this.comparator.lessthan(currentTarget, prevTarget)
            ) {
                this.callbacks.visitingCallback && this.callbacks.visitingCallback(prevTarget);

                // swap
                [ array[currentIndex - 1], array[currentIndex]] = [ currentTarget, prevTarget ];

                currentIndex--;
                currentTarget = array[currentIndex];
                prevTarget = array[currentIndex - 1];
            }
        }

        return array;
    }
}

export { InsertionSort }
