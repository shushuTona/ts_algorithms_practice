export type toStringCallbackType<T> = (value: T) => string;
export type linkedListNodeType<T> = LinkedListNode<T>|null;

export class LinkedListNode<T> {
    public value: T;
    public next: linkedListNodeType<T>;

    constructor(value: T, next: linkedListNodeType<T> = null) {
        this.value = value;
        this.next = next;
    }

    toString(callback?: toStringCallbackType<T>): string {
        return callback ? callback(this.value) : `${this.value}`;
    }
}
