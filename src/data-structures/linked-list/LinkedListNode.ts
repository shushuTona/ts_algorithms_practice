export type toStringCallbackType<T> = (value: T) => string;

export class LinkedListNode<T> {
    public value: T;
    public next: LinkedListNode<T>|null;

    constructor(value: T, next: LinkedListNode<T>|null = null) {
        this.value = value;
        this.next = next;
    }

    toString(callback?: toStringCallbackType<T>) {
        return callback ? callback(this.value) : `${this.value}`;
    }
}
