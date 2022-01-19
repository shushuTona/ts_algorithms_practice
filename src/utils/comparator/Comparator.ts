type compareFunction = (a: number|string, b: number|string) => number;
type compareExtendFunction = (a: number|string, b: number|string) => boolean;

interface ComparatorClassInterface {
    compare: compareFunction;
    equal: compareExtendFunction;
    lessthan: compareExtendFunction;
    greaterThan: compareExtendFunction;
    lessThanOrEqual: compareExtendFunction;
    greaterThanOrEqual: compareExtendFunction;
    reverse(): void;
};

export interface ComparatorClassConstructor {
    new (): ComparatorClassInterface
    defaultCompareFunction: compareFunction
}

export class Comparator implements ComparatorClassInterface {
    public compare: compareFunction;

    constructor(compareFunction: compareFunction) {
        this.compare = compareFunction || Comparator.defaultCompareFunction;
    }

    /**
     * 引数aとbを比較して
     * 同値な場合：0
     * a > b： 1
     * b > a： -1
     */
    static defaultCompareFunction(a: number|string, b: number|string): number {
        if(a === b){
            return 0;
        }

        return a < b ? -1 : 1;
    }

    /**
     * 引数aとbが同値かを判定する
     */
    public equal(a: number|string, b: number|string): boolean {
        return this.compare(a, b) === 0;
    }

    /**
     * 引数aとbを比較して、bの方が大きいかを判定
     */
    public lessthan(a: number|string, b: number|string): boolean {
        return this.compare(a, b) > 0;
    }

    /**
     * 引数aとbを比較して、aの方が大きいかを判定
     */
    public greaterThan(a: number|string, b: number|string): boolean {
        return this.compare(a, b) < 0;
    }

    /**
     * 引数aとbを比較して、bの方が大きい or aとbが同値かを判定
     */
    public lessThanOrEqual(a: number|string, b: number|string): boolean {
        return this.lessthan(a, b) || this.equal(a, b);
    }

    /**
     * 引数aとbを比較して、aの方が大きい or aとbが同値かを判定
     */
    public greaterThanOrEqual(a: number|string, b: number|string): boolean {
        return this.greaterThan(a, b) || this.equal(a, b);
    }

    /**
     * 引数aとbの順番を逆にして比較関数を設定する
     */
    public reverse(): void {
        const compareOriginal = this.compare;
        this.compare = (a: number|string, b: number|string) => compareOriginal(b, a);
    }
}
