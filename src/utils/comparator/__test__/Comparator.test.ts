import { Comparator, compareItem } from '../Comparator';

describe('Comparator class default compare fun test', () => {
    const comparator = new Comparator();

    beforeEach(() => {
        // reverseメソッドが実行されている場合、次のテストに影響が出る為テスト毎に初期化する
        return comparator.initCompareFunction();
    });

    it('default compare method number arg test', () => {
        expect(comparator.compare(0, 0)).toBe(0);
        expect(comparator.compare(1, 0)).toBe(1);
        expect(comparator.compare(0, 1)).toBe(-1);
    });
    it('default compare method string arg test', () => {
        expect(comparator.compare('', '')).toBe(0);
        expect(comparator.compare('test', '')).toBe(1);
        expect(comparator.compare('', 'test')).toBe(-1);
    });

    it('equal method number arg test', () => {
        expect(comparator.equal(0, 0)).toBe(true);
        expect(comparator.equal(1, 0)).toBe(false);
        expect(comparator.equal(0, 1)).toBe(false);
    });
    it('equal method string arg test', () => {
        expect(comparator.equal('', '')).toBe(true);
        expect(comparator.equal('test', '')).toBe(false);
        expect(comparator.equal('', 'test')).toBe(false);
    });

    it('lessthan method number arg test', () => {
        expect(comparator.lessthan(0, 1)).toBe(true);
        expect(comparator.lessthan(1, 0)).toBe(false);
    });
    it('lessthan method string arg test', () => {
        expect(comparator.lessthan('', 'test')).toBe(true);
        expect(comparator.lessthan('test', '')).toBe(false);
    });

    it('greaterThan method number arg test', () => {
        expect(comparator.greaterThan(1, 0)).toBe(true);
        expect(comparator.greaterThan(0, 1)).toBe(false);
    });
    it('greaterThan method string arg test', () => {
        expect(comparator.greaterThan('test', '')).toBe(true);
        expect(comparator.greaterThan('', 'test')).toBe(false);
    });

    it('lessThanOrEqual method number arg test', () => {
        expect(comparator.lessThanOrEqual(0, 1)).toBe(true);
        expect(comparator.lessThanOrEqual(0, 0)).toBe(true);
        expect(comparator.lessThanOrEqual(1, 0)).toBe(false);
    });
    it('lessThanOrEqual method string arg test', () => {
        expect(comparator.lessThanOrEqual('', 'test')).toBe(true);
        expect(comparator.lessThanOrEqual('', '')).toBe(true);
        expect(comparator.lessThanOrEqual('test', '')).toBe(false);
    });

    it('greaterThanOrEqual method number arg test', () => {
        expect(comparator.greaterThanOrEqual(1, 0)).toBe(true);
        expect(comparator.greaterThanOrEqual(0, 0)).toBe(true);
        expect(comparator.greaterThanOrEqual(0, 1)).toBe(false);
    });
    it('greaterThanOrEqual method string arg test', () => {
        expect(comparator.greaterThanOrEqual('test', '')).toBe(true);
        expect(comparator.greaterThanOrEqual('', '')).toBe(true);
        expect(comparator.greaterThanOrEqual('', 'test')).toBe(false);
    });

    it('reverse method number arg test', () => {
        comparator.reverse();
        expect(comparator.compare(0, 0)).toBe(0);
        expect(comparator.compare(1, 0)).toBe(-1);
        expect(comparator.compare(0, 1)).toBe(1);
    });
    it('reverse method string arg test', () => {
        comparator.reverse();
        expect(comparator.compare('', '')).toBe(0);
        expect(comparator.compare('test', '')).toBe(-1);
        expect(comparator.compare('', 'test')).toBe(1);
    });
});

describe('Comparator class custom compare fun test', () => {
    const comparator = new Comparator((a, b) => {
        let a_val: compareItem = a;
        let b_val: compareItem = b;

        if(
            typeof a === 'string' &&
            typeof b === 'string'
        ) {
            a_val = a.length;
            b_val = b.length;
        }

        if(a_val === b_val){
            return 0;
        }

        return a_val < b_val ? -1 : 1;
    });

    beforeEach(() => {
        // reverseメソッドが実行されている場合、次のテストに影響が出る為テスト毎に初期化する
        return comparator.initCompareFunction();
    });

    it('default compare method number arg test', () => {
        expect(comparator.compare(0, 0)).toBe(0);
        expect(comparator.compare(1, 0)).toBe(1);
        expect(comparator.compare(0, 1)).toBe(-1);
    });
    it('default compare method string arg test', () => {
        expect(comparator.compare('', '')).toBe(0);
        expect(comparator.compare('test', '')).toBe(1);
        expect(comparator.compare('', 'test')).toBe(-1);
    });

    it('equal method number arg test', () => {
        expect(comparator.equal(0, 0)).toBe(true);
        expect(comparator.equal(1, 0)).toBe(false);
        expect(comparator.equal(0, 1)).toBe(false);
    });
    it('equal method string arg test', () => {
        expect(comparator.equal('', '')).toBe(true);
        expect(comparator.equal('test', '')).toBe(false);
        expect(comparator.equal('', 'test')).toBe(false);
    });

    it('lessthan method number arg test', () => {
        expect(comparator.lessthan(0, 1)).toBe(true);
        expect(comparator.lessthan(1, 0)).toBe(false);
    });
    it('lessthan method string arg test', () => {
        expect(comparator.lessthan('', 'test')).toBe(true);
        expect(comparator.lessthan('test', '')).toBe(false);
    });

    it('greaterThan method number arg test', () => {
        expect(comparator.greaterThan(1, 0)).toBe(true);
        expect(comparator.greaterThan(0, 1)).toBe(false);
    });
    it('greaterThan method string arg test', () => {
        expect(comparator.greaterThan('test', '')).toBe(true);
        expect(comparator.greaterThan('', 'test')).toBe(false);
    });

    it('lessThanOrEqual method number arg test', () => {
        expect(comparator.lessThanOrEqual(0, 1)).toBe(true);
        expect(comparator.lessThanOrEqual(0, 0)).toBe(true);
        expect(comparator.lessThanOrEqual(1, 0)).toBe(false);
    });
    it('lessThanOrEqual method string arg test', () => {
        expect(comparator.lessThanOrEqual('', 'test')).toBe(true);
        expect(comparator.lessThanOrEqual('', '')).toBe(true);
        expect(comparator.lessThanOrEqual('test', '')).toBe(false);
    });

    it('greaterThanOrEqual method number arg test', () => {
        expect(comparator.greaterThanOrEqual(1, 0)).toBe(true);
        expect(comparator.greaterThanOrEqual(0, 0)).toBe(true);
        expect(comparator.greaterThanOrEqual(0, 1)).toBe(false);
    });
    it('greaterThanOrEqual method string arg test', () => {
        expect(comparator.greaterThanOrEqual('test', '')).toBe(true);
        expect(comparator.greaterThanOrEqual('', '')).toBe(true);
        expect(comparator.greaterThanOrEqual('', 'test')).toBe(false);
    });

    it('reverse method number arg test', () => {
        comparator.reverse();
        expect(comparator.compare(0, 0)).toBe(0);
        expect(comparator.compare(1, 0)).toBe(-1);
        expect(comparator.compare(0, 1)).toBe(1);
    });
    it('reverse method string arg test', () => {
        comparator.reverse();
        expect(comparator.compare('', '')).toBe(0);
        expect(comparator.compare('test', '')).toBe(-1);
        expect(comparator.compare('', 'test')).toBe(1);
    });
});