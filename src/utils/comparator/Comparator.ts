type compareItem = number|string;
type compareFunction = (a: compareItem, b: compareItem) => number;
type compareExtendFunction = (a: compareItem, b: compareItem) => boolean;

interface ComparatorClassInterface {
    compare: compareFunction;
    equal: compareExtendFunction;
    lessthan: compareExtendFunction;
    greaterThan: compareExtendFunction;
    lessThanOrEqual: compareExtendFunction;
    greaterThanOrEqual: compareExtendFunction;
    reverse(): void;
}

export interface ComparatorClassConstructor {
    new (): ComparatorClassInterface
    defaultCompareFunction: compareFunction
}

export class Comparator implements ComparatorClassInterface {
    public compare: compareFunction;

    private argCompareFunction: compareFunction|undefined;

    constructor(compareFunction?: compareFunction) {
        this.argCompareFunction = compareFunction;
        this.initCompareFunction();
    }

    /**
     * compareの初期化
     */
    public initCompareFunction(): void {
        this.compare = this.argCompareFunction
            ? this.argCompareFunction
            : Comparator.defaultCompareFunction;
    }

    /**
     * 引数aとbを比較して
     * 同値な場合：0
     * a > b： 1
     * b > a： -1
     */
    static defaultCompareFunction(a: compareItem, b: compareItem): number {
        if(a === b){
            return 0;
        }

        return a < b ? -1 : 1;
    }

    /**
     * 引数aとbが同値かを判定する
     */
    public equal(a: compareItem, b: compareItem): boolean {
        return this.compare(a, b) === 0;
    }

    /**
     * 引数aとbを比較して、bの方が大きいかを判定
     */
    public lessthan(a: compareItem, b: compareItem): boolean {
        return this.compare(a, b) < 0;
    }

    /**
     * 引数aとbを比較して、aの方が大きいかを判定
     */
    public greaterThan(a: compareItem, b: compareItem): boolean {
        return this.compare(a, b) > 0;
    }

    /**
     * 引数aとbを比較して、bの方が大きい or aとbが同値かを判定
     */
    public lessThanOrEqual(a: compareItem, b: compareItem): boolean {
        return this.lessthan(a, b) || this.equal(a, b);
    }

    /**
     * 引数aとbを比較して、aの方が大きい or aとbが同値かを判定
     */
    public greaterThanOrEqual(a: compareItem, b: compareItem): boolean {
        return this.greaterThan(a, b) || this.equal(a, b);
    }

    /**
     * 引数aとbの順番を逆にして比較関数を設定する
     */
    public reverse(): void {
        const compareOriginal = this.compare;
        this.compare = (a: compareItem, b: compareItem) => compareOriginal(b, a);
    }
}
