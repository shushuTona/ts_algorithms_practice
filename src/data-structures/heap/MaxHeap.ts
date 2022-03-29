import { Heap } from '@/data-structures/heap/Heap';

export class MaxHeap<T> extends Heap<T> {
    public pairIsInCorrectOrder(firstItem: T, secondItem: T): boolean {
        return this.compare.greaterThanOrEqual(firstItem, secondItem);
    }
}
