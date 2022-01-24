import { LinkedListNode } from './LinkedListNode';
import { Comparator, compareFunction } from '../../utils/comparator/Comparator';

export class LinkedList {
    constructor(comparatorFunction: compareFunction){
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
    prepend(value) {
        const newNode = new LinkedListNode(value, this.head);
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
    append(value) {
        const newNode = new LinkedListNode(value);

        // headがnull = まだ何も値が設定されていない場合
        if(!this.head){
            this.head = newNode;
            this.tail = newNode;

            return this;
        }

        // ▼▼▼▼▼ this.headに値が設定されている場合 ▼▼▼▼▼
        this.tail!.next = newNode;
        this.tail = newNode;

        return this;
    }

    /**
     * 対象の値を一覧から削除する
     *
     * @param {*} value 
     * @returns LinkedList|null
     */
    delete(value) {
        // まだ値が設定されていない場合
        if(!this.head){
            return null;
        }

        let deleteNode: LinkedListNode|null = null;

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
        if(this.compare.equal(this.tail.value, value)){
            this.tail = currentNode;
        }

        return deleteNode;
    }

    public find( {
        value = undefined,
        callback = undefined,
    }) {
        if(!this.head){
            return null;
        }

        let currentNode = this.head;

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

    public deleteTail() {
        const deletedTail = this.tail;

        if(this.head === this.tail){
            this.head = null;
            this.tail = null;

            return deletedTail;
        }

        let currentNode = this.head;
        while(currentNode.next){
            if(!currentNode?.next.next){
                currentNode.next = null;
            } else {
                currentNode = currentNode.next;
            }
        }

        this.tail = currentNode;

        return deletedTail;
    }

    public deleteHead() {
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

    public fromArray(values) {
        values.forEach((value) => {
            this.append(value);
        });

        return this;
    }

    public toArray() {
        const nodes = [];

        let currentNode = this.head;
        while(currentNode){
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }

        return nodes;
    }

    public toString(callback) {
        return this.toArray.map((node) => {
            return node.toString(callback);
        }).toString();
    }

    public reverse() {
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
