import { Sort } from '@/algorithms/sorting/Sort';

class CountingSort extends Sort<number> {
    public sort(
        originalArray: number[],
        smallestElem: number|undefined = undefined,
        biggestElem: number|undefined = undefined
    ) {
        let detectedSmallestElem = (smallestElem !== undefined)
                                    ? smallestElem
                                    : 0;
        let detectedBiggestElem = (biggestElem !== undefined)
                                    ? biggestElem
                                    : 0;

        // If either the maximum or minimum value is undefined, set the value based on the originalArray.
        if(
            smallestElem === undefined ||
            biggestElem === undefined
        ) {
            originalArray.forEach((element) => {
                this.callbacks.visitingCallback && this.callbacks.visitingCallback(element);

                if(
                    this.comparator.greaterThan(element, detectedBiggestElem)
                ) {
                    detectedBiggestElem = element;
                }

                if(
                    this.comparator.lessthan(element, detectedSmallestElem)
                ) {
                    detectedSmallestElem = element;
                }
            });
        }

        // init bucket array
        const buckets: number[] = Array(detectedBiggestElem - detectedSmallestElem + 1).fill(0);
        originalArray.forEach((element) => {
            this.callbacks.visitingCallback && this.callbacks.visitingCallback(element);

            buckets[element - detectedSmallestElem] += 1;
        });

        for(let bucketIndex = 1; bucketIndex < buckets.length; bucketIndex += 1) {
            const addelem = buckets[bucketIndex - 1];
            if(
                addelem !== undefined
            ) {
                buckets[bucketIndex] += addelem;
            }
        }

        buckets.pop();
        buckets.unshift(0);

        const sortedArray: number[] = Array(originalArray.length).fill(null);
        for (let elemIndex = 0; elemIndex < originalArray.length; elemIndex++) {
            const element = originalArray[elemIndex];
            
            if(
                element !== undefined
            ) {
                this.callbacks.visitingCallback && this.callbacks.visitingCallback(element);

                const elementSortedPosition = buckets[element - detectedSmallestElem];

                elementSortedPosition !== undefined && (sortedArray[elementSortedPosition] = element);

                buckets[element - detectedSmallestElem] += 1;
            }
        }

        return sortedArray;
    }
}

export { CountingSort }
