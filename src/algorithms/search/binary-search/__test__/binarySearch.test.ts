import binarySearch from '@/algorithms/search/binary-search/binarySearch';

describe('binarySearch func', () => {
    it('check search number', () => {
        expect(binarySearch([], 1)).toBe(-1);
        expect(binarySearch([1], 1)).toBe(0);
        expect(binarySearch([1, 2], 1)).toBe(0);
        expect(binarySearch([1, 2], 2)).toBe(1);
        expect(binarySearch([1, 2, 2, 3, 4, 5, 6], 2)).toBe(1);
    });

    it('check search object', () => {
        type obj = {
            key: number;
        }
        const sortedArray: obj[] = [
            { key: 1 },
            { key: 2 },
            { key: 3 }
        ];

        const comparator = (a: obj, b: obj) => {
            const akey = a.key;
            const bkey = b.key;
            if(akey === bkey) return 0;

            return akey < bkey ? -1 : 1;
        }

        expect(binarySearch<obj>([], { key: 1 })).toBe(-1);
        expect(binarySearch<obj>(sortedArray, { key: 4 }, comparator)).toBe(-1);
        expect(binarySearch<obj>(sortedArray, { key: 1 }, comparator)).toBe(0);
        expect(binarySearch<obj>(sortedArray, { key: 2 }, comparator)).toBe(1);
        expect(binarySearch<obj>(sortedArray, { key: 3 }, comparator)).toBe(2);
    });
});
