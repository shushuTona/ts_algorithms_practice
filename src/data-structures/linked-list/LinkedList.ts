import { LinkedListNode, linkedListNodeType, toStringCallbackType } from '@/data-structures/linked-list/LinkedListNode';
import { Comparator, compareFunction } from '@/utils/comparator/Comparator';

export class LinkedList<T> {
    public head: linkedListNodeType<T>;
    public tail: linkedListNodeType<T>;
    private compare: Comparator<T>;

    constructor(comparatorFunction?: compareFunction<T>){
        this.head = null;
        this.tail = null;
        this.compare = new Comparator(comparatorFunction);
    }

    /**
     * 新しい値を先頭に追加する
     * 最後尾が存在しない場合、最後尾も設定する
     * 
     * @param {*} value 
     * @returns {LinkedList}
     */
    public prepend(value: T): LinkedList<T> {
        const newNode = new LinkedListNode<T>(value, this.head);
        this.head = newNode;

        if(!this.tail){
            this.tail = newNode;
        }

        return this;
    }

    /**
     * 新しい値を最後尾に追加する
     * 
     * @param {*} value
     * @returns {LinkedList}
     */
    public append(value: T): LinkedList<T> {
        const newNode = new LinkedListNode(value);

        // headがnull = まだ何も値が設定されていない場合
        if(!this.head){
            this.head = newNode;
            this.tail = newNode;

            return this;
        }

        // ▼▼▼▼▼ this.headに値が設定されている場合 ▼▼▼▼▼
        if(this.tail){
            this.tail.next = newNode;
        }
        this.tail = newNode;

        return this;
    }

    /**
     * 指定のindex位置に値を設定する
     *
     * @param {*} value 
     * @param {number} rawIndex 
     * @returns {LinkedList}
     */
    public insert(value: T, rawIndex: number): LinkedList<T> {
        const index = rawIndex < 0 ? 0 : rawIndex;

        if(index === 0){
            this.prepend(value);
        } else {
            let count = 1;
            let currentNode = this.head;
            const newNode = new LinkedListNode<T>(value);

            // indexに対応したcurrentNodeの値を設定する
            while(currentNode){
                if(index === count) break;

                currentNode = currentNode.next;
                count += 1;
            }

            if(currentNode){
                // 下記の状態に設定する
                // currentNode [ここにnewNode] currentNode.next
                newNode.next = currentNode.next;
                currentNode.next = newNode;
            } else {
                // currentNodeが無い＝最後尾の場合

                if(this.tail){
                    // 既に最後尾のNodeが設定されている場合
                    this.tail.next = newNode;
                    this.tail = newNode;
                } else {
                    // currentNode（this.head）とthis.tailがそれぞれ設定されていない
                    this.head = newNode;
                    this.tail = newNode;
                }
            }
        }

        return this;
    }

    /**
     * 対象の値を一覧から削除する
     *
     * @param {*} value 
     * @returns LinkedListNode|null
     */
    public delete(value: T): linkedListNodeType<T> {
        // まだ値が設定されていない場合
        if(!this.head){
            return null;
        }

        let deleteNode: linkedListNodeType<T> = null;

        while(
            this.head &&
            this.compare.equal(this.head.value, value)
        ){
            // 現状のheadを削除対象に設定して、
            // headの次の要素をheadに設定する
            deleteNode = this.head;
            this.head = this.head.next;
        }

        let currentNode = this.head;
        // 各要素の値を確認する
        if(currentNode !== null){
            while(currentNode.next){
                if(this.compare.equal(currentNode.next.value, value)){
                    deleteNode = currentNode.next;
                    currentNode.next = currentNode.next.next;
                } else {
                    currentNode = currentNode.next;
                }
            }
        }

        // tailの値が指定の値と一致する場合
        if(
            this.tail &&
            this.compare.equal(this.tail.value, value)
        ){
            this.tail = currentNode;
        }

        return deleteNode;
    }

    /**
     * 
     *
     * @param findObj
     * @returns LinkedListNode|null
     */
    public find(findObj: { value?: T, callback?: (value: T) => boolean }): linkedListNodeType<T> {
        if(!this.head){
            return null;
        }

        let currentNode: linkedListNodeType<T> = this.head;
        const value = findObj.value ? findObj.value : undefined;
        const callback = findObj.callback ? findObj.callback : undefined;

        while(currentNode){
            if(
                callback &&
                callback(currentNode.value)
            ) {
                return currentNode;
            }

            if(
                value !== undefined &&
                this.compare.equal(currentNode.value, value)
            ) {
                return currentNode;
            }

            currentNode = currentNode.next;
        }

        // どの要素も一致しなかった場合
        return null;
    }

    /**
     * 
     *
     * @returns 
     */
    public deleteTail(): typeof this.tail {
        const deletedTail = this.tail;

        if(this.head === this.tail){
            this.head = null;
            this.tail = null;

            return deletedTail;
        }

        let currentNode = this.head;
        while(currentNode?.next){
            if(!currentNode?.next.next){
                currentNode.next = null;
            } else {
                currentNode = currentNode.next;
            }
        }

        this.tail = currentNode;

        return deletedTail;
    }

    /**
     * 
     *
     * @returns 
     */
    public deleteHead(): typeof this.head {
        if(!this.head){
            return null;
        }

        const deletedHead = this.head;

        if(this.head.next){
            this.head = this.head.next;
        } else {
            this.head = null;
            this.tail = null;
        }

        return deletedHead;
    }

    /**
     * 
     *
     * @returns 
     */
    public fromArray(values: T[]): LinkedList<T> {
        values.forEach((value) => {
            this.append(value);
        });

        return this;
    }

    /**
     * 
     *
     * @returns LinkedListNode<T>[]
     */
    public toArray(): LinkedListNode<T>[] {
        const nodes: LinkedListNode<T>[] = [];

        let currentNode = this.head;
        while(currentNode){
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }

        return nodes;
    }

    /**
     * 
     * @param callback 
     * @returns string
     */
    public toString(callback?: toStringCallbackType<T>): string {
        return this.toArray().map((node: LinkedListNode<T>) => {
            return node.toString(callback);
        }).toString();
    }

    /**
     * 
     *
     * @returns void
     */
    public reverse(): void {
        let currentNode = this.head;
        let prevNode = null;
        let nextNode = null;

        while(currentNode){
            nextNode = currentNode.next;
            currentNode.next = prevNode;

            prevNode = currentNode;
            currentNode = nextNode;
        }

        this.tail = this.head;
        this.head = prevNode;
    }
}
