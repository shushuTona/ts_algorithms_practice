import type { toStringCallbackType } from '@/data-structures/linked-list/LinkedListNode';
import { LinkedList } from '@/data-structures/linked-list/LinkedList';

export class Queue<T> {
    public linkedList: LinkedList<T>;

    constructor(){
        this.linkedList = new LinkedList<T>();
    }

    /**
     * isEmpty
     *
     * 一覧にNodeが存在するかを判定する
     */
    public isEmpty(): boolean {
        return !this.linkedList.head;
    }

    /**
     * peek
     *
     * 一覧の先頭にあるNodeの値を取得する（先頭が存在しない場合nullを返却する）
     */
    public peek(): T|null {
        if(
            this.isEmpty()
        ){
            return null;
        }

        return this.linkedList.head ? this.linkedList.head.value : null;
    }

    /**
     * enqueue
     *
     * 新しいNodeを一覧の最後尾に追加する
     */
    public enqueue(value: T): void {
        this.linkedList.append(value);
    }

    /**
     * dequeue
     *
     * 一覧の先頭を一覧から削除する
     */
    public dequeue(): T|null {
        const removdHead = this.linkedList.deleteHead();
        return removdHead ? removdHead.value : null;
    }

    /**
     * toString
     *
     *  一覧を指定のcallbackを基に文字列化する
     */
    public toString(callback?: toStringCallbackType<T>): string {
        return this.linkedList.toString(callback);
    }
}
