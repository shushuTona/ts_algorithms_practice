export type toStringCallbackType<T> = (value: T) => string;
export type doublyLinkedListNodeType<T> = DoublyLinkedListNode<T>|null;

export class DoublyLinkedListNode<T> {
    public value: T;
    public next: doublyLinkedListNodeType<T>;
    public previous: doublyLinkedListNodeType<T>;

    constructor(
        value: T,
        next: doublyLinkedListNodeType<T> = null,
        previous: doublyLinkedListNodeType<T> = null
    ){
        this.value = value;
        this.next = next;
        this.previous = previous;
    }

    public toString(callback: toStringCallbackType<T>|null = null){
        return callback ? callback(this.value) : `${this.value}`;
    }
}
