import { Queue } from '@/data-structures/queue/Queue';

describe('Queue test', () => {
    let queue: Queue<number>;

    beforeEach(() => {
        queue = new Queue<number>();
    });

    it('init queue', () => {
        expect(queue.linkedList).toBeDefined();
        expect(queue.linkedList.head).toBeNull();
        expect(queue.linkedList.tail).toBeNull();
    });

    it('empty queue', () => {
        expect(queue.isEmpty()).toBeTruthy();
        
        queue.enqueue(1);

        expect(queue.isEmpty()).toBeFalsy();
    });

    it('enqueue queue', () => {
        expect(queue.isEmpty()).toBeTruthy();

        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);

        expect(queue.toString()).toBe('1,2,3');
    });

    it('queue peek', () => {
        expect(queue.peek()).toBeNull();

        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);

        expect(queue.peek()).toBe(1);
    });

    it('dequeue queue', () => {
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);

        expect(queue.dequeue()).toBe(1);
        expect(queue.dequeue()).toBe(2);
        expect(queue.dequeue()).toBe(3);
        expect(queue.dequeue()).toBeNull();
        expect(queue.isEmpty()).toBeTruthy();
    });
});
