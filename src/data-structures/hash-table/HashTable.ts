import type { linkedListNodeType } from '@/data-structures/linked-list/LinkedListNode';
import { LinkedList } from '@/data-structures/linked-list/LinkedList';

const defaultHashTableSize = 32;

interface HashTableKeys {
    [key: string]: number
}

interface HashTableLinkedListNode<T> {
    key: string,
    value: T
}

type bucketsType<T> = LinkedList<HashTableLinkedListNode<T>>;

type findCallbackType<T> = (nodeValue: HashTableLinkedListNode<T>) => boolean;

export class HashTable<T> {
    public buckets: bucketsType<T>[];
    public keys: HashTableKeys;

    constructor(hashTableSize = defaultHashTableSize) {
        this.buckets = Array(hashTableSize).fill(null).map(() => new LinkedList<HashTableLinkedListNode<T>>());
        this.keys = {};
    }

    public findCallback(key: string): findCallbackType<T> {
        return (nodeValue: HashTableLinkedListNode<T>) => {
            return nodeValue.key === key;
        };
    }

    /**
     * hash
     *
     * 引数の文字列（key）を基に、ハッシュ値を生成する
     */
    public hash(key: string): number {
        // 引数keyの文字列の一文字ずつバラして、各文字に対応するcharCodeAtの戻り値の合計を取得する
        const hash = Array.from(key).reduce(
            (hashAccumulator, keySymbol) => {
                return hashAccumulator + keySymbol.charCodeAt(0);
            },
            0
        );

        // hashの値をthis.bucketsの要素数で割った余り値を返す
        return hash % this.buckets.length;
    }

    /**
     * set
     *
     * 
     */
    public set(key: string, value: T): void {
        const keyHash = this.hash(key);
        this.keys[key] = keyHash;
        const bucketLinkedList = this.buckets[keyHash];

        if(bucketLinkedList){
            const node = bucketLinkedList.find({ callback: this.findCallback(key) });

            if(
                !node
            ) {
                bucketLinkedList.append({ key, value });
            } else {
                node.value.value = value;
            }
        }
    }

    /**
     * delete
     *
     * 
     */
    public delete(key: string): linkedListNodeType<HashTableLinkedListNode<T>>|null {
        const keyHash = this.hash(key);
        delete this.keys[key];
        
        const bucketLinkedList = this.buckets[keyHash];
        if(bucketLinkedList){
            const node = bucketLinkedList.find({ callback: this.findCallback(key) });

            if(node) {
                return bucketLinkedList.delete(node.value);
            }

            return null;
        }

        return null;
    }

    /**
     * get
     *
     * 
     */
    public get(key: string): T|undefined {
        const keyHash = this.hash(key);
        const bucketLinkedList = this.buckets[keyHash];

        if(bucketLinkedList){
            const node = bucketLinkedList.find({ callback: this.findCallback(key) });
            return node ? node.value.value : undefined;
        }

        return undefined;
    }

    /**
     * has
     *
     * 
     */
    public has(key: string) {
        return Object.hasOwnProperty.call(this.keys, key);
    }

    /**
     * getKeys
     *
     *  
     */
    public getKeys(): string[] {
        return Object.keys(this.keys);
    }

    /**
     * getValues
     *
     * 
     */
    public getValues(): T[] {
        return this.buckets.reduce((values: T[], bucket: bucketsType<T>) => {
            const bucketValues = bucket.toArray().map((linkedListNode) => {
                return linkedListNode.value.value;
            });

            return values.concat(bucketValues);
        }, []);
    }
}
