import { Heap } from '@/data-structures/heap/Heap';

export class MinHeap<T> extends Heap<T> {
    public pairIsInCorrectOrder(firstItem: T, secondItem: T): boolean {
        return this.compare.lessThanOrEqual(firstItem, secondItem);
    }
}
