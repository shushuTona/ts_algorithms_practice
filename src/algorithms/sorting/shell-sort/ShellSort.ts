import { Sort } from '@/algorithms/sorting/Sort';

class ShellSort<T> extends Sort<T> {
    public sort(originalArray: T[]) {
        const array = [...originalArray];

        let gap = Math.floor(array.length / 2);

        while(gap > 0) {
            for(let index = 0; index < (array.length - gap); index++) {
                let currentIndex = index;
                let gapShiftedIndex = index + gap;

                while(currentIndex >= 0) {
                    const currentElem = array[currentIndex];

                    currentElem !== undefined && this.callbacks.visitingCallback && this.callbacks.visitingCallback(currentElem);

                    const gapShiftedElem = array[gapShiftedIndex];
                    if(
                        currentElem !== undefined &&
                        gapShiftedElem !== undefined &&
                        this.comparator.lessthan(gapShiftedElem, currentElem)
                    ) {
                        array[currentIndex] = gapShiftedElem;
                        array[gapShiftedIndex] = currentElem;
                    }

                    gapShiftedIndex = currentIndex;
                    currentIndex -= gap;
                }
            }

            gap = Math.floor(gap / 2);
        }

        return array;
    }
}

export { ShellSort }
