import type { toStringCallbackType } from '@/data-structures/linked-list/LinkedListNode';
import { LinkedList } from '@/data-structures/linked-list/LinkedList';

export class Stack<T> {
    public linkedList: LinkedList<T>;

    public constructor() {
        this.linkedList = new LinkedList<T>();
    }

    public isEmpty(): boolean {
        return !this.linkedList.head;
    }

    public peek(): T|null {
        if(this.isEmpty()) {
            return null;
        }

        return this.linkedList.head ? this.linkedList.head.value : null;
    }

    public push(value: T): void {
        this.linkedList.prepend(value);
    }

    public pop(): T|null {
        const remocedHead = this.linkedList.deleteHead();
        return remocedHead ? remocedHead.value : null;
    }

    public toArray(): T[] {
        const linkedListArray = this.linkedList.toArray();

        return linkedListArray.map((linkedListNode) => {
            return linkedListNode.value;
        });
    }

    public toString(callback?: toStringCallbackType<T>): string {
        return this.linkedList.toString(callback);
    }
}