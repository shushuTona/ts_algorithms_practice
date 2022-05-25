import { MinHeap } from '@/data-structures/heap/MinHeap';
import { Comparator } from '@/utils/comparator/Comparator';

export class PriorityQueue<T> extends MinHeap<T> {
    public priorities: Map<T, number>;

    constructor() {
        super();

        this.priorities = new Map();

        const func = this.comparePriority.bind(this);
        this.compare = new Comparator<T>(func);
    }

    /**
     * 対象データと優先度を基に、prioritiesに追加する
     *
     * @param item 
     * @param priority 
     * @returns 
     */
    public add(item: T, priority = 0): this {
        this.priorities.set(item, priority);

        super.add(item);

        return this;
    }

    /**
     * 一覧に保存されている対象データを削除する
     *
     * @param item 
     * @param customFindingComparator 
     * @returns 
     */
    public remove(item: T, customFindingComparator: Comparator<T>): this {
        super.remove(item, customFindingComparator);

        this.priorities.delete(item);

        return this;
    }

    /**
     * XXX
     *
     * @param item 
     * @param priority 
     * @returns 
     */
    public changepriorty(item: T, priority: number): this {
        this.remove(item, new Comparator(this.compareValue));

        this.add(item, priority);

        return this;
    }

    /**
     * heapContainer内の対象データのindex番号一覧を取得する
     *
     * @param item 
     * @returns 
     */
    private findByValue(item: T): number[] {
        return this.find(item, new Comparator(this.compareValue));
    }

    /**
     * 対象データが一覧に存在するか判定する
     *
     * @param item 
     * @returns 
     */
    public hasValue(item: T): boolean {
        return this.findByValue(item).length > 0;
    }

    /**
     * 対象データAとBの優先度を比較する
     *
     * @param a 
     * @param b 
     * @returns 
     */
    private comparePriority(a: T, b: T): number {
        const itemA = this.priorities.get(a);
        const itemB = this.priorities.get(b);

        if(
            itemA === itemB ||
            (
                itemA === undefined ||
                itemB === undefined
            )
        ) {
            return 0;
        }

        return itemA < itemB ? -1 : 1;
    }

    /**
     * 対象データAとBの値を比較する
     *
     * @param a 
     * @param b 
     * @returns 
     */
    private compareValue(a: T, b: T): number {
        if(
            a === b ||
            (
                a === undefined ||
                b === undefined
            )
        ) {
            return 0;
        }

        return a < b ? -1 : 1;
    }
}