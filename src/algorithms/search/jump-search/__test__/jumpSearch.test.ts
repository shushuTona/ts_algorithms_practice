import jumpSearch from '@/algorithms/search/jump-search/jumpSearch';

describe('jumpSearch func', () => {
    it('check search number', () => {
        const sortedArray = [...Array(10)].map((_, index) => index);
    
        expect(jumpSearch([], 1)).toBe(-1);
        expect(jumpSearch(sortedArray, 100)).toBe(-1);
        expect(jumpSearch(sortedArray, 3)).toBe(3);
        expect(jumpSearch([1, 1, 1, 1, 1], 1)).toBe(0);
    });

    it('check search object', () => {
        interface sortedArrayItem {
            age: number;
        }
        const sortedArray: sortedArrayItem[] = [
            {
                age: 10
            },
            {
                age: 20
            },
            {
                age: 30
            }
        ];

        const comparator = (a: sortedArrayItem, b: sortedArrayItem) => {
            if(
                a.age === b.age
            ){
                return 0;
            }

            return a.age < b.age ? -1 : 1;
        }

        expect(jumpSearch([], {age: 1}, comparator)).toBe(-1);
        expect(jumpSearch(sortedArray, {age: 1}, comparator)).toBe(-1);
        expect(jumpSearch(sortedArray, {age: 10}, comparator)).toBe(0);
        expect(jumpSearch(sortedArray, {age: 20}, comparator)).toBe(1);
        expect(jumpSearch(sortedArray, {age: 30}, comparator)).toBe(2);
        expect(jumpSearch([
            {
                age: 1
            },
            {
                age: 2
            },
            {
                age: 2
            },
        ], {age: 2}, comparator)).toBe(1);
    });
});
