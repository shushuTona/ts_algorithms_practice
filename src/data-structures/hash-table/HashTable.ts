import { LinkedList } from '@/data-structures/linked-list/LinkedList';

const defaultHashTableSize = 32;

interface HashTableKeys {
    [key: string]: number
}

interface HashTableLinkedListNode<T> {
    key: string,
    value: T
}

export class HashTable<T> {
    public buckets: LinkedList<HashTableLinkedListNode<T>>[];
    public keys: HashTableKeys;

    constructor(hashTableSize = defaultHashTableSize) {
        this.buckets = Array(hashTableSize).fill(null).map(() => new LinkedList<HashTableLinkedListNode<T>>());
        this.keys = {};
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
            const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key });

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
     * has
     *
     * 
     */
    public has(key: string) {
        return Object.hasOwnProperty.call(this.keys, key);
    }
}
