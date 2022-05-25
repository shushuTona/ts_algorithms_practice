import { PriorityQueue } from '@/data-structures/priority-queue/PriorityQueue';

describe('PriorityQueue test', () => {
    it('check create instance', () => {
        const priorityQueue = new PriorityQueue();

        expect(priorityQueue).toBeDefined();
    });

    it('check add', () => {
        const priorityQueue = new PriorityQueue<number>();

        priorityQueue.add(10, 1);
        expect(priorityQueue.peek()).toBe(10);

        priorityQueue.add(5, 2);
        expect(priorityQueue.peek()).toBe(10);

        priorityQueue.add(100);
        expect(priorityQueue.peek()).toBe(100);

        priorityQueue.add(1000);
        expect(priorityQueue.peek()).toBe(100);

        expect(priorityQueue.heapContainer).toEqual([100, 1000, 10, 5]);
    });

    it('check changepriorty', () => {
        const priorityQueue = new PriorityQueue<number>();

        priorityQueue.add(10, 1);
        priorityQueue.add(5, 2);
        priorityQueue.add(100, 0);
        priorityQueue.add(200, 0);

        expect(priorityQueue.peek()).toBe(100);

        priorityQueue.changepriorty(100, 10);
        priorityQueue.changepriorty(10, 20);

        expect(priorityQueue.heapContainer).toEqual([200, 5, 100, 10]);
    });

    it('check hasValue', () => {
        const priorityQueue = new PriorityQueue<number>();

        priorityQueue.add(10, 1);
        priorityQueue.add(5, 2);
        priorityQueue.add(100, 0);
        priorityQueue.add(200, 0);

        expect(priorityQueue.hasValue(10)).toBe(true);
        expect(priorityQueue.hasValue(100)).toBe(true);
        expect(priorityQueue.hasValue(300)).toBe(false);
    });
});