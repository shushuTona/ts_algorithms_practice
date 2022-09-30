import { Comparator, compareFunction } from '@/utils/comparator/Comparator';

export class Heap<T> {
    public heapContainer: (T|undefined)[];
    public compare: Comparator<T>;

    constructor(compareFunction?: compareFunction<T>) {
        if(new.target === Heap) {
            throw new TypeError('Error:Heap classは直接インスタンス作成できないです');
        }

        this.heapContainer = [];
        this.compare = new Comparator<T>(compareFunction);
    }

    /**
     * getLeftChildIndex
     *
     * 引数で指定したindex番号（parentIndex）を基に、そのNodeが持つツリーの左側の子Nodeのindex番号を取得する
     */
    public getLeftChildIndex(parentIndex: number): number {
        return (2 * parentIndex) + 1;
    }

    /**
     * getRightChildIndex
     *
     * 引数で指定したindex番号（parentIndex）を基に、そのNodeが持つツリーの右側の子Nodeのindex番号を取得する
     */
    public getRightChildIndex(parentIndex: number): number {
        return (2 * parentIndex) + 2;
    }

    /**
     * getParentIndex
     *
     * 引数で指定したindex番号（childIndex）を基に、親Nodeのindex番号を取得する
     * ※ 引数に0（ルートノードのindex番号）を指定した場合、戻り値は-1になる
     */
    public getParentIndex(childIndex: number): number {
        return Math.floor((childIndex - 1) / 2);
    }

    /**
     * hasParent
     *
     * 引数で指定したindex番号（childIndex）を基に、親Nodeが存在するか判定する
     */
    public hasParent(childIndex: number): boolean {
        return this.getParentIndex(childIndex) >= 0;
    }

    /**
     * hasLeftChild
     *
     * 引数で指定したindex番号（parentIndex）を基に、そのNodeの子Nodeとして左側にNodeが存在するか判定する
     */
    public hasLeftChild(parentIndex: number): boolean {
        return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
    }

    /**
     * hasRightChild
     *
     * 引数で指定したindex番号（parentIndex）を基に、そのNodeの子Nodeとして右側にNodeが存在するか判定する
     */
    public hasRightChild(parentIndex: number): boolean {
        return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
    }

    /**
     * leftChild
     *
     * 引数で指定したindex番号（parentIndex）を基に、そのNodeの左側の子Nodeを取得する
     */
    public leftChild(parentIndex: number): T|undefined {
        return this.heapContainer[this.getLeftChildIndex(parentIndex)];
    }

    /**
     * rightChild
     *
     * 引数で指定したindex番号（parentIndex）を基に、そのNodeの右側の子Nodeを取得する
     */
    public rightChild(parentIndex: number): T|undefined {
        return this.heapContainer[this.getRightChildIndex(parentIndex)];
    }

    /**
     * parent
     *
     * 引数で指定したindex番号（parentIndex）を基に、そのNodeの親Nodeを取得する
     */
    public parent(childIndex: number): T|undefined {
        return this.heapContainer[this.getParentIndex(childIndex)];
    }

    /**
     * swap
     *
     * 引数の2つのindex番号を基に、各index番号に対応する2つのNodeの位置を変更する
     */
    public swap(indexOne: number, indexTwo: number): void {
        const tmp = this.heapContainer[indexTwo];
        this.heapContainer[indexTwo] = this.heapContainer[indexOne];
        this.heapContainer[indexOne] = tmp;
    }

    /**
     * peek
     *
     * ルートノードの値を取得する
     */
    public peek(): (T | undefined)|null {
        if (
            this.heapContainer.length === 0
        ) {
            return null;
        }

        return this.heapContainer[0];
    }

    /**
     * poll
     *
     * heapContainer内の最後のNodeをルートノードに設定＆元々のルートノードは削除する
     */
    public poll(): (T | undefined)|null {
        if (
            this.heapContainer.length === 0
        ) {
            return null;
        }

        if (
            this.heapContainer.length === 1
        ) {
            return this.heapContainer.pop();
        }

        const item = this.heapContainer[0];

        // 最後のNodeをルートNodeに設定する
        this.heapContainer[0] = this.heapContainer.pop();
        this.heapifyDown();

        return item;
    }

    /**
     * add
     *
     * 引数で指定したitemをheapContainerに追加する
     */
    public add(item: T): this {
        this.heapContainer.push(item);

        this.heapifyUp();

        return this;
    }

    /**
     * remove
     *
     * heapContainerからitemで指定した値を削除＆削除後に都度heapContainer内のNode位置をHeapのルールに沿って調整する
     */
    public remove(item: T, comparator = this.compare): this {
        const numberOfItemsToRemove = this.find(item, comparator).length;

        // findの取得結果の要素数分（＝取得対象の個数分）繰り返し処理を実行する
        for (let iteration = 0; iteration < numberOfItemsToRemove; iteration += 1) {
            // this.heapContainer内の削除対象のindex
            const indexToRemove = this.find(item, comparator).pop();

            if(
                indexToRemove === undefined
            ) {
                continue;
            }

            if (
                // 削除対象が最後のNodeの場合
                indexToRemove === (this.heapContainer.length - 1)
            ) {
                this.heapContainer.pop();
            } else {
                // heapContainerの最後のNodeを削除対象の位置に移動する
                this.heapContainer[indexToRemove] = this.heapContainer.pop();

                // 削除対象位置にあるNodeの親Node
                const parentItem = this.parent(indexToRemove);

                // 削除対象位置にあるNode
                const heapContainerItem = this.heapContainer[indexToRemove];
                
                if (
                    // 削除対象位置にあるNodeが左側の子Nodeを持っているか
                    this.hasLeftChild(indexToRemove) &&
                    heapContainerItem &&
                    (
                        // 親Nodeが存在しない or 親Nodeと対象Nodeの比較結果がtrue
                        !parentItem ||
                        this.pairIsInCorrectOrder(parentItem, heapContainerItem)
                    )
                ) {
                    this.heapifyDown(indexToRemove);
                } else {
                    this.heapifyUp(indexToRemove);
                }
            }
        }

        return this;
    }

    /**
     * find
     *
     * 引数の値と一致するNodeのindex番号を追加した配列を取得する
     */
    public find(item: T, comparator = this.compare): number[] {
        const foundItemIndices = [];

        for (let itemIndex = 0; itemIndex < this.heapContainer.length; itemIndex += 1) {
            const heapContainerItem = this.heapContainer[itemIndex];
            if (
                heapContainerItem &&
                comparator.equal(item, heapContainerItem)
            ) {
                foundItemIndices.push(itemIndex);
            }
        }

        return foundItemIndices;
    }

    /**
     * isEmpty
     *
     * heapContainerに要素が存在するかを判定する
     */
    public isEmpty(): boolean {
        return !this.heapContainer.length;
    }

    /**
     * toString
     *
     * heapContainerを文字列化する
     */
    public toString(): string {
        return this.heapContainer.toString();
    }

    /**
     * heapifyUp
     *
     * 対象Nodeとその親Nodeの値を比較して、pairIsInCorrectOrderの結果によって子Nodeと親Nodeの値を入れ替える
     * 上記処理を必要であればルートNodeまで繰り返す
     * 
     * MaxHeapの場合：ルートNodeが最大値になるように値を入れ替えていく
     * MaxHeapの場合：ルートNodeが最小値になるように値を入れ替えていく
     */
    public heapifyUp(customStartIndex?: number): void {
        let currentIndex = customStartIndex || this.heapContainer.length -1;
        let parentItem = this.parent(currentIndex);
        let heapContainerItem = this.heapContainer[currentIndex];

        while(
            this.hasParent(currentIndex) &&
            parentItem !== undefined &&
            heapContainerItem !== undefined &&
            !this.pairIsInCorrectOrder(parentItem, heapContainerItem)
        ) {
            this.swap(currentIndex, this.getParentIndex(currentIndex));

            currentIndex = this.getParentIndex(currentIndex);
            parentItem = this.parent(currentIndex);
            heapContainerItem = this.heapContainer[currentIndex];
        }
    }

    /**
     * heapifyDown
     *
     * 対象indexのNodeとそのNodeの子Nodeを比較して、子Nodeの方が値が大きい場合、一覧内の位置を入れ替える
     * 上記をその子Nodeまで行う
     */
    public heapifyDown(customStartIndex = 0): void {
        let currentIndex = customStartIndex;
        let nextIndex = null;
        let rightItem = this.rightChild(currentIndex);
        let leftItem = this.leftChild(currentIndex);

        while(
            // 対象Nodeが左側の子Nodeを持っているか（左から子Nodeが設定されるから左側を判定している？）
            this.hasLeftChild(currentIndex)
        ) {
            if(
                // 対象Nodeが右側の子Nodeを持っているか
                this.hasRightChild(currentIndex) &&
                rightItem !== undefined &&
                leftItem !== undefined &&

                // rightItem >= leftItemが成立する場合true
                this.pairIsInCorrectOrder(rightItem, leftItem)
            ) {
                // 対象Nodeの右側の子Nodeのindexを取得
                nextIndex = this.getRightChildIndex(currentIndex);
            } else {
                // 対象Nodeの左側の子Nodeのindexを取得
                nextIndex = this.getLeftChildIndex(currentIndex);
            }

            // 親Nodeの値と右側or左側の子Nodeの値
            const currentIndexItem = this.heapContainer[currentIndex];
            const nextIndexItem = this.heapContainer[nextIndex];

            if(
                currentIndexItem !== undefined &&
                nextIndexItem !== undefined &&
                // 親Nodeの値 >= 子Nodeの値が成立する場合true
                this.pairIsInCorrectOrder(currentIndexItem, nextIndexItem)
            ) {
                break;
            }

            // ▼▼▼▼▼ 親Nodeの値 < 子Nodeの値が成立する ▼▼▼▼▼

            // 親Nodeの値 と 子Nodeの値 の位置を切り替える
            this.swap(currentIndex, nextIndex);

            // currentIndexに子Nodeのindexを設定
            currentIndex = nextIndex;
            rightItem = this.rightChild(currentIndex);
            leftItem = this.leftChild(currentIndex);
        }
    }

    /**
     * pairIsInCorrectOrder
     *
     * 継承先のClassで上書きするメソッド
     * 上書きしないで実行した際にエラーを発生させる
     */
    public pairIsInCorrectOrder(firstItem: T, secondItem: T): boolean {
        throw new Error(`
            You have to implement heap pair comparision method
            for ${firstItem} and ${secondItem} values.
        `);
    }
}
