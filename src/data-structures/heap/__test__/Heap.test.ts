import { Heap } from '@/data-structures/heap/Heap';

describe('Heap test', () => {
    it('check create instance', () => {
        const instantiateHeap = () => {
            const heap = new Heap();
            heap.getParentIndex(5);
        };

        // 例外が発生することをテストする
        expect(instantiateHeap).toThrowError(TypeError);
    });
});
