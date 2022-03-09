import { HashTable } from '@/data-structures/hash-table/HashTable';

describe('HashTable test', () => {
    it('check hashTablesize', () => {
        const hashTable = new HashTable<number>();
        expect(hashTable.buckets.length).toBe(32);

        const biggerHashTable = new HashTable<number>(64);
        expect(biggerHashTable.buckets.length).toBe(64);
    });

    it('create hash', () => {
        const hashTable = new HashTable<number>();

        expect(hashTable.hash('a')).toBe(1);
        expect(hashTable.hash('b')).toBe(2);
        expect(hashTable.hash('c')).toBe(3);
        expect(hashTable.hash('abc')).toBe(6);
    });

    it('check set', () => {
        const hashTable = new HashTable<string>(3);

        expect(hashTable.hash('a')).toBe(1);
        expect(hashTable.hash('b')).toBe(2);
        expect(hashTable.hash('c')).toBe(0);
        expect(hashTable.hash('d')).toBe(1);

        hashTable.set('a', 'test_value_a');
        hashTable.set('b', 'test_value_b');
        hashTable.set('c', 'test_value_c');
        hashTable.set('d', 'test_value_d');

        expect(hashTable.has('a')).toBeTruthy();
        expect(hashTable.has('test')).toBeFalsy();
    });
});
