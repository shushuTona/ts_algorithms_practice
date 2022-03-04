import { HashTable } from '@/data-structures/hash-table/HashTable';

describe('HashTable test', () => {
    it('check hashTablesize', () => {
        const hashTable = new HashTable<number>();
        expect(hashTable.buckets.length).toBe(32);

        const biggerHashTable = new HashTable<number>(64);
        expect(biggerHashTable.buckets.length).toBe(64);
    });

    it('create hash', () => {
        const hash = new HashTable<number>();

        expect(hash.hash('a')).toBe(1);
        expect(hash.hash('b')).toBe(2);
        expect(hash.hash('c')).toBe(3);
        expect(hash.hash('abc')).toBe(6);
    });
});
