export type toStringCallbackType<T> = (value: T) => string;

export class LinkedListNode<T> {
    public value: NonNullable<T>;
    public next: LinkedListNode<NonNullable<T>>|null;

    constructor(value: NonNullable<T>, next: LinkedListNode<NonNullable<T>>|null = null) {
        this.value = value;
        this.next = next;
    }

    toString(callback: toStringCallbackType<NonNullable<T>>|null = null) {
        return callback ? callback(this.value) : `${this.value}`;
    }
}
