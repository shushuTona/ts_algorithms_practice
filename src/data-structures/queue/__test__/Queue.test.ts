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
        const queue = new Queue<number>();

        expect(queue.isEmpty()).toBeTruthy();
    });
});
