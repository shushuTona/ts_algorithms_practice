import { LinkedList } from '@/data-structures/linked-list/LinkedList';

export class Queue<T> {
    public linkedList: LinkedList<T>;

    constructor(){
        this.linkedList = new LinkedList<T>();
    }

    /**
     * isEmpty
     *
     * 
     */
    public isEmpty(): boolean {
        return !this.linkedList.head;
    }

    public peek(): T|null {
        if(
            this.isEmpty()
        ){
            return null;
        }

        return this.linkedList.head?.value;
    }
}
