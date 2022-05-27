import linearSearch from '@/algorithms/search/linear-search/linearSearch';

describe('linearSearch func', () => {
    it('check search all number array', () => {
        const array = [1, 2, 4, 6, 2];

        expect(linearSearch(array, 10)).toEqual([]);
        expect(linearSearch(array, 1)).toEqual([0]);
        expect(linearSearch(array, 2)).toEqual([1, 4]);
    });

    it('check search all string array', () => {
        const array = ['a', 'b', 'a'];

        expect(linearSearch(array, 'c')).toEqual([]);
        expect(linearSearch(array, 'b')).toEqual([1]);
        expect(linearSearch(array, 'a')).toEqual([0, 2]);
    });

    it('check search all object array', () => {
        interface Obj {
            key: number;
        }

        const comparatorCallback = (a: Obj, b: Obj) => {
            if (a.key === b.key) {
                return 0;
            }

            return a.key <= b.key ? -1 : 1;
        };
      
        const array = [
            { key: 5 },
            { key: 6 },
            { key: 7 },
            { key: 6 },
        ];
      
        expect(linearSearch(array, { key: 10 }, comparatorCallback)).toEqual([]);
        expect(linearSearch(array, { key: 5 }, comparatorCallback)).toEqual([0]);
        expect(linearSearch(array, { key: 6 }, comparatorCallback)).toEqual([1, 3]);
    });
});
