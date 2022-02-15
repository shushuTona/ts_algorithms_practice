export type toStringCallbackType<T> = (value: T) => string;

export class DoublyLinkedListNode<T> {
    public value: T;
    public next: DoublyLinkedListNode<T>|null;
    public previous: DoublyLinkedListNode<T>|null;

    constructor(
        value: T,
        next: DoublyLinkedListNode<T>|null = null,
        previous: DoublyLinkedListNode<T>|null = null
    ){
        this.value = value;
        this.next = next;
        this.previous = previous;
    }

    public toString(callback: toStringCallbackType<T>|null = null){
        return callback ? callback(this.value) : `${this.value}`;
    }
}
