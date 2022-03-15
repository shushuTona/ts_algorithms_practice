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
     * 引数のkeyとvalueを基に、新規Nodeの追加 or 既存Nodeのvalueを更新する
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
     * 引数のkeyを基に対象Nodeを一覧から削除する
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
     * 引数のkeyを基に対象のNodeを取得する
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
     * this.keysに引数のキー（文字列）がプロパティとして設定されているかを判定する
     */
    public has(key: string): boolean {
        return Object.hasOwnProperty.call(this.keys, key);
    }

    /**
     * getKeys
     *
     * this.keysのキー一覧を取得する
     */
    public getKeys(): string[] {
        return Object.keys(this.keys);
    }

    /**
     * getValues
     *
     * this.bucketsにそれぞれ設定されているLinkedList内の各Nodeに設定されているvalueの一覧を取得する
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
