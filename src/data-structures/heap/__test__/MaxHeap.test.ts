import { MaxHeap } from '@/data-structures/heap/MaxHeap';

describe('MaxHeap class test', () => {
    it('create instance', () => {
        const maxHeap = new MaxHeap();

        expect(maxHeap).toBeDefined();
        expect(maxHeap.peek()).toBeNull();
        expect(maxHeap.isEmpty()).toBe(true);
    });

    it('check getLeftChildIndex', () => {
        const maxHeap = new MaxHeap();

        expect(maxHeap.getLeftChildIndex(0)).toBe(1);
        expect(maxHeap.getLeftChildIndex(1)).toBe(3);
        expect(maxHeap.getLeftChildIndex(2)).toBe(5);
    });

    it('check getRightChildIndex', () => {
        const maxHeap = new MaxHeap();

        expect(maxHeap.getRightChildIndex(0)).toBe(2);
        expect(maxHeap.getRightChildIndex(1)).toBe(4);
        expect(maxHeap.getRightChildIndex(2)).toBe(6);
    });

    it('check getParentIndex', () => {
        const maxHeap = new MaxHeap();

        expect(maxHeap.getParentIndex(1)).toBe(0);
        expect(maxHeap.getParentIndex(3)).toBe(1);
        expect(maxHeap.getParentIndex(5)).toBe(2);
        expect(maxHeap.getParentIndex(0)).toBe(-1);
    });

    it('check hasParent', () => {
        const maxHeap = new MaxHeap();

        expect(maxHeap.hasParent(0)).toBe(false);
        expect(maxHeap.hasParent(1)).toBe(true);
        expect(maxHeap.hasParent(3)).toBe(true);
        expect(maxHeap.hasParent(5)).toBe(true);
    });

    it('check hasLeftChild', () => {
        const maxHeap = new MaxHeap<number>();

        maxHeap.add(1);
        maxHeap.add(2);
        maxHeap.add(3);
        maxHeap.add(4);
        maxHeap.add(5);

        expect(maxHeap.hasLeftChild(0)).toBe(true);
        expect(maxHeap.hasLeftChild(1)).toBe(true);
        expect(maxHeap.hasLeftChild(2)).toBe(false);
    });

    it('check hasRightChild', () => {
        const maxHeap = new MaxHeap<number>();

        maxHeap.add(1);
        maxHeap.add(2);
        maxHeap.add(3);
        maxHeap.add(4);
        maxHeap.add(5);

        expect(maxHeap.hasRightChild(0)).toBe(true);
        expect(maxHeap.hasRightChild(1)).toBe(true);
        expect(maxHeap.hasRightChild(2)).toBe(false);
    });

    it('check leftChild', () => {
        const maxHeap = new MaxHeap<number>();

        maxHeap.add(1);
        maxHeap.add(2);
        maxHeap.add(3);        
        maxHeap.add(4);
        maxHeap.add(5);        

        expect(maxHeap.leftChild(0)).toBe(4);
        expect(maxHeap.leftChild(1)).toBe(1);
        expect(maxHeap.leftChild(2)).toBeUndefined();
    });

    it('check rightChild', () => {
        const maxHeap = new MaxHeap<number>();

        maxHeap.add(1);
        maxHeap.add(2);
        maxHeap.add(3);        
        maxHeap.add(4);
        maxHeap.add(5);        

        expect(maxHeap.rightChild(0)).toBe(2);
        expect(maxHeap.rightChild(1)).toBe(3);
        expect(maxHeap.rightChild(2)).toBeUndefined();
    });
});
