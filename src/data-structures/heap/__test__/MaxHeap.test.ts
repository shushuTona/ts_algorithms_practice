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

    it('check parent', () => {
        const maxHeap = new MaxHeap<number>();

        maxHeap.add(1);
        maxHeap.add(2);
        maxHeap.add(3);
        maxHeap.add(4);
        maxHeap.add(5);

        expect(maxHeap.parent(0)).toBeUndefined();
        expect(maxHeap.parent(1)).toBe(5);
        expect(maxHeap.parent(3)).toBe(4);
    });

    it('check swap', () => {
        const maxHeap = new MaxHeap<number>();

        maxHeap.add(1);
        maxHeap.add(2);
        maxHeap.add(3);
        maxHeap.add(4);
        maxHeap.add(5);
        expect(maxHeap.toString()).toBe('5,4,2,1,3');

        maxHeap.swap(0, 1);
        expect(maxHeap.toString()).toBe('4,5,2,1,3');
    });

    it('check peek', () => {
        const maxHeap = new MaxHeap<number>();

        expect(maxHeap.peek()).toBeNull();

        maxHeap.add(1);
        maxHeap.add(2);
        maxHeap.add(3);

        expect(maxHeap.peek()).toBe(3);
    });

    it('check poll', () => {
        const maxHeap = new MaxHeap<number>();

        expect(maxHeap.poll()).toBeNull();

        maxHeap.add(1);
        maxHeap.add(2);
        maxHeap.add(3);
        maxHeap.add(4);
        maxHeap.add(5);
        expect(maxHeap.toString()).toBe('5,4,2,1,3');

        const item = maxHeap.poll();
        
        expect(item).toBe(5);
        expect(maxHeap.toString()).toBe('4,3,2,1');
    });

    it('check add', () => {
        const maxHeap = new MaxHeap<number>();

        maxHeap.add(1);
        expect(maxHeap.toString()).toBe('1');
        
        maxHeap.add(2);
        expect(maxHeap.toString()).toBe('2,1');
        
        maxHeap.add(3);
        expect(maxHeap.toString()).toBe('3,1,2');
        
        maxHeap.add(4);
        expect(maxHeap.toString()).toBe('4,3,2,1');

        maxHeap.add(5);
        expect(maxHeap.toString()).toBe('5,4,2,1,3');
    });

    it('check remove', () => {
        const maxHeap = new MaxHeap<number>();

        maxHeap.add(1);
        maxHeap.add(2);
        maxHeap.add(3);
        maxHeap.add(4);
        maxHeap.add(5);
        expect(maxHeap.toString()).toBe('5,4,2,1,3');
        
        maxHeap.remove(3);
        expect(maxHeap.toString()).toBe('5,4,2,1');
        
        maxHeap.add(3);
        maxHeap.add(2);
        maxHeap.add(1);
        expect(maxHeap.toString()).toBe('5,4,2,1,3,2,1');

        maxHeap.remove(2);
        expect(maxHeap.toString()).toBe('5,4,1,1,3');
    });

    it('check find', () => {
        const maxHeap = new MaxHeap<number>();

        maxHeap.add(1);
        maxHeap.add(2);
        maxHeap.add(3);
        maxHeap.add(4);
        maxHeap.add(5);
        maxHeap.add(5);

        const itemList = maxHeap.find(5);
        expect(itemList).toEqual([0,2]);
    });

    it('check isEmpty', () => {
        const maxHeap = new MaxHeap<number>();

        expect(maxHeap.isEmpty()).toBe(true);
        
        maxHeap.add(1);
        
        expect(maxHeap.isEmpty()).toBe(false);
    });

    it('check toString', () => {
        const maxHeap = new MaxHeap<number>();

        expect(maxHeap.toString()).toBe('');
        
        maxHeap.add(1);
        maxHeap.add(2);
        maxHeap.add(3);
        
        expect(maxHeap.toString()).toBe('3,1,2');
    });

    it('check heapifyUp', () => {
        const maxHeap = new MaxHeap<number>();

        maxHeap.heapContainer.push(1);
        maxHeap.heapContainer.push(2);
        maxHeap.heapContainer.push(3);
        maxHeap.heapContainer.push(4);
        maxHeap.heapContainer.push(5);

        expect(maxHeap.toString()).toBe('1,2,3,4,5');

        maxHeap.heapifyUp();
        expect(maxHeap.toString()).toBe('5,1,3,4,2');

        maxHeap.heapifyUp(3);
        expect(maxHeap.toString()).toBe('5,4,3,1,2');
    });

    it('check heapifyDown', () => {
        const maxHeap = new MaxHeap<number>();

        maxHeap.heapContainer.push(1);
        maxHeap.heapContainer.push(2);
        maxHeap.heapContainer.push(3);
        maxHeap.heapContainer.push(4);
        maxHeap.heapContainer.push(5);

        expect(maxHeap.toString()).toBe('1,2,3,4,5');

        maxHeap.heapifyDown();
        expect(maxHeap.toString()).toBe('3,2,1,4,5');

        maxHeap.heapifyDown(1);
        expect(maxHeap.toString()).toBe('3,5,1,4,2');
    });

    it('check maxheap pairIsInCorrectOrder', () => {
        const maxHeap = new MaxHeap<number>();

        expect(maxHeap.pairIsInCorrectOrder(1, 2)).toBe(false);
        expect(maxHeap.pairIsInCorrectOrder(1, 1)).toBe(true);
        expect(maxHeap.pairIsInCorrectOrder(2, 1)).toBe(true);
    });
});
