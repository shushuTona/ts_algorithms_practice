import Sort from '@/algorithms/sorting/Sort';

describe('Sort class', () => {
    it('check ', () => {
        const throwError = () => {
            const sort = new Sort();
            sort.sort();
        }

        expect(throwError()).toThrow();
    });
});
