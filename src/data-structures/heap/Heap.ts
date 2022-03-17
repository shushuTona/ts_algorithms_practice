import { Comparator, compareFunction } from '@/utils/comparator/Comparator';

export class Heap<T> {
    public heapContainer: number[];
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
     *  
     */
    public getLeftChildIndex(parentIndex: number): number {
        return (2 * parentIndex) + 1;
    }

    /**
     * getRightChildIndex
     *
     *  
     */
    public getRightChildIndex(parentIndex: number): number {
        return (2 * parentIndex) + 2;
    }

    /**
     * getParentIndex
     *
     *  
     */
    public getParentIndex(childIndex: number): number {
        return Math.floor((childIndex - 1) / 2);
    }

    /**
     * hasParent
     *
     *  
     */
    public hasParent(childIndex: number): boolean {
        return this.getParentIndex(childIndex) >= 0;
    }

    /**
     * hasLeftChild
     *
     * 
     */
    public hasLeftChild(parentIndex: number): boolean {
        return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
    }

    /**
     * hasRightChild
     *
     * 
     */
    public hasRightChild(parentIndex: number): boolean {
        return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
    }

    /**
     * leftChild
     *
     * 
     */
    public leftChild(parentIndex: number): number|undefined {
        return this.heapContainer[this.getLeftChildIndex(parentIndex)];
    }

    /**
     * rightChild
     *
     * 
     */
    public rightChild(parentIndex: number): number|undefined {
        return this.heapContainer[this.getRightChildIndex(parentIndex)];
    }
}
