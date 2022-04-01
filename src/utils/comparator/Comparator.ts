export type compareFunction<T>= (a: T, b: T) => number;

export class Comparator<T> {
    public compare: compareFunction<T>;
    private argCompareFunction: compareFunction<T>|undefined;

    constructor(compareFunction?: compareFunction<T>|undefined) {
        this.argCompareFunction = compareFunction;
        this.initCompareFunction();
    }

    /**
     * compareの初期化
     */
    public initCompareFunction(): void {
        this.compare = this.argCompareFunction
            ? this.argCompareFunction
            : this.defaultCompareFunction;
    }

    /**
     * 引数aとbを比較して
     * 同値な場合：0
     * a > b： 1
     * b > a： -1
     */
    public defaultCompareFunction(a: T, b: T): number {
        if(a === b){
            return 0;
        }

        return a < b ? -1 : 1;
    }

    /**
     * 引数aとbが同値かを判定する
     */
    public equal(a: T, b: T): boolean {
        return this.compare(a, b) === 0;
    }

    /**
     * 引数aとbを比較して、bの方が大きいかを判定
     */
    public lessthan(a: T, b: T): boolean {
        return this.compare(a, b) < 0;
    }

    /**
     * 引数aとbを比較して、aの方が大きいかを判定
     */
    public greaterThan(a: T, b: T): boolean {
        return this.compare(a, b) > 0;
    }

    /**
     * 引数aとbを比較して、bの方が大きい or aとbが同値かを判定
     */
    public lessThanOrEqual(a: T, b: T): boolean {
        return this.lessthan(a, b) || this.equal(a, b);
    }

    /**
     * 引数aとbを比較して、aの方が大きい or aとbが同値の場合true, aよりbの方が大きい場合falseを返却する
     */
    public greaterThanOrEqual(a: T, b: T): boolean {
        return this.greaterThan(a, b) || this.equal(a, b);
    }

    /**
     * 引数aとbの順番を逆にして比較関数を設定する
     */
    public reverse(): void {
        const compareOriginal = this.compare;
        this.compare = (a: T, b: T) => compareOriginal(b, a);
    }
}
