import { Sort } from '@/algorithms/sorting/Sort';
import { MinHeap } from '@/data-structures/heap/MinHeap';

class HeapSort<T> extends Sort<T> {
    sort(originalArray: T[]) {
        const sortedArray: T[] = [];
        const minHeap = new MinHeap(this.callbacks.compareCallback);

        originalArray.forEach((element) => {
            this.callbacks.visitingCallback && this.callbacks.visitingCallback(element);

            minHeap.add(element);
        });

        while(!minHeap.isEmpty()) {
            const nextMinElement = minHeap.poll();

            if(
                nextMinElement !== undefined &&
                nextMinElement !== null
            ) {
                this.callbacks.visitingCallback && this.callbacks.visitingCallback(nextMinElement);

                sortedArray.push(nextMinElement);
            }
        }

        return sortedArray;
    }
}

export { HeapSort }
