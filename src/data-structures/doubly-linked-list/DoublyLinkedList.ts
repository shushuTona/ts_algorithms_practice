import { DoublyLinkedListNode, doublyLinkedListNodeType } from '@/data-structures/doubly-linked-list/DoublyLinkedListNode';
import { Comparator, compareFunction } from '@/utils/comparator/Comparator';

export class DoublyLinkedList<T> {
    public head: doublyLinkedListNodeType<T>;
    public tail: doublyLinkedListNodeType<T>;
    public compare: Comparator<T>;

    constructor(comparatorFunction?: compareFunction<T>){
        this.head = null;
        this.tail = null;
        this.compare = new Comparator(comparatorFunction);
    }

    /**
     * prepend
     *
     * 引数のvalueを基に、一覧の先頭に新しいNodeを追加する
     */
    public prepend(value: T): DoublyLinkedList<T> {
        const newNode = new DoublyLinkedListNode(value, this.head);

        // 既に先頭に要素が存在する場合、newNodeを先頭に設定する
        if(this.head){
            this.head.previous = newNode;
        }
        this.head = newNode;

        // まだ最後尾にNodeが設定されていない場合（＝一覧にNodeが存在しない場合）、newNodeを最後尾に設定する
        if(!this.tail){
            this.tail = newNode;
        }

        return this;
    }

    /**
     * append
     *
     * 引数のvalueを基に、一覧の最後尾に新しいNodeを追加する
     */
    public append(value: T): DoublyLinkedList<T> {
        const newNode = new DoublyLinkedListNode(value);

        // まだ先頭にNodeが設定されていない場合（＝一覧にNodeが存在しない場合）、先頭と最後尾にそれぞれnewNodeを設定する
        if(!this.tail){
            this.head = newNode;
            this.tail = newNode;

            return this;
        }

        // 前段の判定で、一覧にn個nodeが設定されている（=head, tailにNodeが設定されている）ことが確定

        // tailの次の要素としてnewNodeを設定＆newNodeの前のNodeにtailを設定する
        this.tail.next = newNode;
        newNode.previous = this.tail;

        // 最後尾にnewNodeを設定する
        this.tail = newNode;

        return this;
    }

    /**
     * delete
     *
     * 引数のvlaueを基に、一覧のNode内でvalueの値が一致するNodeを全て一覧から削除する
     */
    public delete(value: T): doublyLinkedListNodeType<T> {
        if(!this.head){
            return null;
        }

        let deletedNode: doublyLinkedListNodeType<T> = null;
        let currentNode: doublyLinkedListNodeType<T> = this.head;

        while(currentNode){
            if(
                this.compare.equal(currentNode.value, value)
            ){
                deletedNode = currentNode;

                if(deletedNode === this.head){
                    // 削除対象が先頭のNodeの場合

                    // 先頭から2番目のNodeを先頭に設定する
                    this.head = deletedNode.next;

                    // 先頭にNodeが設定されていたら（=this.headがnullでなければ）、先頭の前の項目をnullに設定する
                    if(this.head){
                        this.head.previous = null;
                    }

                    // 削除対象のNodeが最後尾のNodeでもあったら（=一覧内最後のNodeだった場合）、最後尾をnullに設定する
                    if(deletedNode === this.tail){
                        this.tail = null;
                    }
                }else if(deletedNode === this.tail){
                    // 削除対象が最後尾のNodeの場合

                    // 最後尾の前のNodeを最後尾に設定する
                    this.tail = deletedNode.previous;
                    this.tail && (this.tail.next = null);
                }else{
                    // 削除対象が先頭・最後尾以外のNodeの場合

                    // 削除対象Nodeの前後のNodeを取得して、前のNodeの次のNodeと後ろのNodeの前のNodeをそれぞれ設定する
                    // ※ headとtailに該当していない ＝ 前後にNodeが設定されている（=前後の項目はnullではない）
                    const previousNode = deletedNode.previous;
                    const nextNode = deletedNode.next;

                    previousNode && (previousNode.next = nextNode);
                    nextNode && (nextNode.previous = previousNode);
                }
            }

            currentNode = currentNode.next;
        }

        return deletedNode;
    }

    public find(findObj: {value: T, callback?: (value: T) => boolean }){
        if(!this.head){
            return null;
        }

        const { value, callback } = findObj;
        let currentNode: doublyLinkedListNodeType<T> = this.head;

        while(currentNode){
            if(
                callback &&
                callback(currentNode.value)
            ){
                return currentNode;
            }

            if(
                // 引数の時点でvalueの型をTに指定しているので、ここのタイミングでvalue自体の判定は不要
                this.compare.equal(currentNode.value, value)
            ){
                return currentNode;
            }

            currentNode = currentNode.next;
        }

        return null;
    }
}
