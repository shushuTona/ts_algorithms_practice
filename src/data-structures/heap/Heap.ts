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
     * 
     */
    public swap(indexOne: number, indexTwo: number) {
        const tmp = this.heapContainer[indexTwo];
        this.heapContainer[indexTwo] = this.heapContainer[indexOne];
        this.heapContainer[indexOne] = tmp;
    }

    /**
     * peek
     *
     * 
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
     * 
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

        this.heapContainer[0] = this.heapContainer.pop();
        this.heapifyDown();

        return item;
    }

    /**
     * add
     *
     * 
     */
    public add(item: T): this {
        this.heapContainer.push(item);

        this.heapifyUp();

        return this;
    }

    /**
     * remove
     *
     * 
     */
    public remove(item: T, comparator = this.compare): this {
        const numberOfItemsToRemove = this.find(item, comparator).length;

        for (let iteration = 0; iteration < numberOfItemsToRemove; iteration += 1) {
            const indexToRemove = this.find(item, comparator).pop();

            if(
                !indexToRemove
            ) {
                continue;
            }

            if (
                indexToRemove === (this.heapContainer.length - 1)
            ) {
                this.heapContainer.pop();
            } else {
                this.heapContainer[indexToRemove] = this.heapContainer.pop();

                const parentItem = this.parent(indexToRemove);
                const heapContainerItem = this.heapContainer[indexToRemove];

                if (
                    this.hasLeftChild(indexToRemove) &&
                    heapContainerItem &&
                    (
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
     * 
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
     * 
     */
    public isEmpty(): boolean {
        return !this.heapContainer.length;
    }

    /**
     * toString
     *
     * 
     */
    public toString(): string {
        return this.heapContainer.toString();
    }

    /**
     * heapifyUp
     *
     * 
     */
    public heapifyUp(customStartIndex?: number): void {
        let currentIndex = customStartIndex || this.heapContainer.length -1;
        let parentItem = this.parent(currentIndex);
        let heapContainerItem = this.heapContainer[currentIndex];

        while(
            this.hasParent(currentIndex) &&
            parentItem &&
            heapContainerItem &&
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
     * 
     */
    public heapifyDown(customStartIndex = 0): void {
        let currentIndex = customStartIndex;
        let nextIndex = null;
        let rightItem = this.rightChild(currentIndex);
        let leftItem = this.leftChild(currentIndex);

        while(
            this.hasLeftChild(currentIndex)
        ) {
            if(
                this.hasRightChild(currentIndex) &&
                rightItem &&
                leftItem &&
                this.pairIsInCorrectOrder(rightItem, leftItem)
            ) {
                nextIndex = this.getRightChildIndex(currentIndex);
            } else {
                nextIndex = this.getLeftChildIndex(currentIndex);
            }

            const currentIndexItem = this.heapContainer[currentIndex];
            const nextIndexItem = this.heapContainer[nextIndex];

            if(
                currentIndexItem &&
                nextIndexItem &&
                this.pairIsInCorrectOrder(currentIndexItem, nextIndexItem)
            ) {
                break;
            }

            this.swap(currentIndex, nextIndex);

            currentIndex = nextIndex;
            rightItem = this.rightChild(currentIndex);
            leftItem = this.leftChild(currentIndex);
        }
    }

    /**
     * pairIsInCorrectOrder
     *
     * 
     */
    public pairIsInCorrectOrder(firstItem: T, secondItem: T): never {
        throw new Error(`
            You have to implement heap pair comparision method
            for ${firstItem} and ${secondItem} values.
        `);
    }
}
