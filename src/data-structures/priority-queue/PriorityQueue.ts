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

    public add(item: T, priority = 0): this {
        this.priorities.set(item, priority);

        super.add(item);

        return this;
    }

    public remove(item: T, customFindingComparator: Comparator<T>): this {
        super.remove(item, customFindingComparator);

        this.priorities.delete(item);

        return this;
    }

    public changepriorty(item: T, priority: number): this {
        this.remove(item, new Comparator(this.compareValue));

        this.add(item, priority);

        return this;
    }

    public findByValue(item: T): number[] {
        return this.find(item, new Comparator(this.compareValue));
    }

    public hasValue(item: T): boolean {
        return this.findByValue(item).length > 0;
    }

    public comparePriority(a: T, b: T): number {
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

    public compareValue(a: T, b: T): number {
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