import { MinHeap } from '@/data-structures/heap/MinHeap';

describe('MinHeap class test', () => {
    it('create instance', () => {
        const minHeap = new MinHeap();

        expect(minHeap).toBeDefined();
        expect(minHeap.peek()).toBeNull();
        expect(minHeap.isEmpty()).toBe(true);
    });

    it('check getLeftChildIndex', () => {
        const minHeap = new MinHeap();

        expect(minHeap.getLeftChildIndex(0)).toBe(1);
        expect(minHeap.getLeftChildIndex(1)).toBe(3);
        expect(minHeap.getLeftChildIndex(2)).toBe(5);
    });

    it('check getRightChildIndex', () => {
        const minHeap = new MinHeap();

        expect(minHeap.getRightChildIndex(0)).toBe(2);
        expect(minHeap.getRightChildIndex(1)).toBe(4);
        expect(minHeap.getRightChildIndex(2)).toBe(6);
    });

    it('check getParentIndex', () => {
        const minHeap = new MinHeap();

        expect(minHeap.getParentIndex(1)).toBe(0);
        expect(minHeap.getParentIndex(3)).toBe(1);
        expect(minHeap.getParentIndex(5)).toBe(2);
        expect(minHeap.getParentIndex(0)).toBe(-1);
    });

    it('check hasParent', () => {
        const minHeap = new MinHeap();

        expect(minHeap.hasParent(0)).toBe(false);
        expect(minHeap.hasParent(1)).toBe(true);
        expect(minHeap.hasParent(3)).toBe(true);
        expect(minHeap.hasParent(5)).toBe(true);
    });

    it('check hasLeftChild', () => {
        const minHeap = new MinHeap<number>();

        minHeap.add(1);
        minHeap.add(2);
        minHeap.add(3);
        minHeap.add(4);
        minHeap.add(5);

        expect(minHeap.hasLeftChild(0)).toBe(true);
        expect(minHeap.hasLeftChild(1)).toBe(true);
        expect(minHeap.hasLeftChild(2)).toBe(false);
    });

    it('check hasRightChild', () => {
        const minHeap = new MinHeap<number>();

        minHeap.add(1);
        minHeap.add(2);
        minHeap.add(3);
        minHeap.add(4);
        minHeap.add(5);

        expect(minHeap.hasRightChild(0)).toBe(true);
        expect(minHeap.hasRightChild(1)).toBe(true);
        expect(minHeap.hasRightChild(2)).toBe(false);
    });

    it('check leftChild', () => {
        const minHeap = new MinHeap<number>();

        minHeap.add(1);
        minHeap.add(2);
        minHeap.add(3);
        minHeap.add(4);
        minHeap.add(5);      

        expect(minHeap.leftChild(0)).toBe(2);
        expect(minHeap.leftChild(1)).toBe(4);
        expect(minHeap.leftChild(2)).toBeUndefined();
    });

    it('check rightChild', () => {
        const minHeap = new MinHeap<number>();

        minHeap.add(1);
        minHeap.add(2);
        minHeap.add(3);
        minHeap.add(4);
        minHeap.add(5);      

        expect(minHeap.rightChild(0)).toBe(3);
        expect(minHeap.rightChild(1)).toBe(5);
        expect(minHeap.rightChild(2)).toBeUndefined();
    });

    it('check parent', () => {
        const minHeap = new MinHeap<number>();

        minHeap.add(1);
        minHeap.add(2);
        minHeap.add(3);
        minHeap.add(4);
        minHeap.add(5);

        expect(minHeap.parent(0)).toBeUndefined();
        expect(minHeap.parent(1)).toBe(1);
        expect(minHeap.parent(3)).toBe(2);
    });

    it('check swap', () => {
        const minHeap = new MinHeap<number>();

        minHeap.add(1);
        minHeap.add(2);
        minHeap.add(3);
        minHeap.add(4);
        minHeap.add(5);
        expect(minHeap.toString()).toBe('1,2,3,4,5');

        minHeap.swap(0, 1);
        expect(minHeap.toString()).toBe('2,1,3,4,5');
    });

    it('check peek', () => {
        const minHeap = new MinHeap<number>();

        expect(minHeap.peek()).toBeNull();

        minHeap.add(1);
        minHeap.add(2);
        minHeap.add(3);

        expect(minHeap.peek()).toBe(1);
    });

    it('check poll', () => {
        const minHeap = new MinHeap<number>();

        expect(minHeap.poll()).toBeNull();

        minHeap.add(1);
        minHeap.add(2);
        minHeap.add(3);
        minHeap.add(4);
        minHeap.add(5);
        expect(minHeap.toString()).toBe('1,2,3,4,5');

        const item = minHeap.poll();

        expect(item).toBe(1);
        expect(minHeap.toString()).toBe('2,4,3,5');
    });

    it('check add', () => {
        const minHeap = new MinHeap<number>();

        minHeap.add(5);
        expect(minHeap.toString()).toBe('5');

        minHeap.add(4);
        expect(minHeap.toString()).toBe('4,5');

        minHeap.add(3);
        expect(minHeap.toString()).toBe('3,5,4');

        minHeap.add(2);
        expect(minHeap.toString()).toBe('2,3,4,5');

        minHeap.add(1);
        expect(minHeap.toString()).toBe('1,2,4,5,3');
    });

    it('check remove', () => {
        const minHeap = new MinHeap<number>();

        minHeap.add(5);
        minHeap.add(4);
        minHeap.add(3);
        minHeap.add(2);
        minHeap.add(1);
        expect(minHeap.toString()).toBe('1,2,4,5,3');

        minHeap.remove(1);
        expect(minHeap.toString()).toBe('2,3,4,5');

        minHeap.add(3);
        minHeap.add(2);
        minHeap.add(1);
        expect(minHeap.toString()).toBe('1,3,2,5,3,4,2');

        minHeap.remove(2);
        expect(minHeap.toString()).toBe('1,3,4,5,3');
    });

    it('check find', () => {
        const minHeap = new MinHeap<number>();

        minHeap.add(5);
        minHeap.add(4);
        minHeap.add(3);
        minHeap.add(2);
        minHeap.add(1); // 1,2,4,5,3
        minHeap.add(2); // 1,2,2,5,3,4

        const itemList = minHeap.find(2);
        expect(itemList).toEqual([1,2]);
    });

    it('check isEmpty', () => {
        const minHeap = new MinHeap<number>();

        expect(minHeap.isEmpty()).toBe(true);

        minHeap.add(1);

        expect(minHeap.isEmpty()).toBe(false);
    });

    it('check toString', () => {
        const minHeap = new MinHeap<number>();

        expect(minHeap.toString()).toBe('');

        minHeap.add(1);
        minHeap.add(2);
        minHeap.add(3);

        expect(minHeap.toString()).toBe('1,2,3');
    });

    it('check heapifyUp', () => {
        const minHeap = new MinHeap<number>();

        minHeap.heapContainer.push(5);
        minHeap.heapContainer.push(4);
        minHeap.heapContainer.push(3);
        minHeap.heapContainer.push(2);
        minHeap.heapContainer.push(1);

        expect(minHeap.toString()).toBe('5,4,3,2,1');

        minHeap.heapifyUp();
        expect(minHeap.toString()).toBe('1,5,3,2,4');

        minHeap.heapifyUp(3);
        expect(minHeap.toString()).toBe('1,2,3,5,4');
    });

    it('check heapifyDown', () => {
        const minHeap = new MinHeap<number>();

        minHeap.heapContainer.push(5);
        minHeap.heapContainer.push(4);
        minHeap.heapContainer.push(3);
        minHeap.heapContainer.push(2);
        minHeap.heapContainer.push(1);

        expect(minHeap.toString()).toBe('5,4,3,2,1');

        minHeap.heapifyDown();
        expect(minHeap.toString()).toBe('3,4,5,2,1');

        minHeap.heapifyDown(1);
        expect(minHeap.toString()).toBe('3,1,5,2,4');
    });

    it('check minheap pairIsInCorrectOrder', () => {
        const minHeap = new MinHeap<number>();

        expect(minHeap.pairIsInCorrectOrder(1, 2)).toBe(true);
        expect(minHeap.pairIsInCorrectOrder(1, 1)).toBe(true);
        expect(minHeap.pairIsInCorrectOrder(2, 1)).toBe(false);
    });
});
