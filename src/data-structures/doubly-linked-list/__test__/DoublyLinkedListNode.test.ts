import { DoublyLinkedListNode, toStringCallbackType } from '../DoublyLinkedListNode';

describe('DoublyLinkedListNode test', () => {
    it('create node', () => {
        const newNode = new DoublyLinkedListNode<number>(1);

        expect(newNode.value).toBe(1);
        expect(newNode.next).toBeNull();
        expect(newNode.previous).toBeNull();
    });

    it('create node with obj', () => {
        const obj = {
            value: 100,
            key: 'test',
        };
        const newNode = new DoublyLinkedListNode<typeof obj>(obj);

        expect(newNode.value.value).toBe(100);
        expect(newNode.value.key).toBe('test');
        expect(newNode.next).toBeNull();
        expect(newNode.previous).toBeNull();
    });

    it('set previous/next', () => {
        const nextNode = new DoublyLinkedListNode<number>(100);
        const previousNode = new DoublyLinkedListNode<number>(200);
        const newNode = new DoublyLinkedListNode<number>(1, nextNode, previousNode);

        expect(newNode.value).toBe(1);
        expect(newNode.next).toBeInstanceOf(DoublyLinkedListNode);
        expect(newNode.next?.value).toBe(100);
        expect(newNode.previous).toBeInstanceOf(DoublyLinkedListNode);
        expect(newNode.previous?.value).toBe(200);
    });

    it('execute toString method', () => {
        const newNode = new DoublyLinkedListNode<number>(1);

        expect(newNode.toString()).toBe('1');
    });

    it('execute toString method with callback function', () => {
        const newNode = new DoublyLinkedListNode<number>(1);
        const callbackFunction: toStringCallbackType<number> = (value) => {
            return value + '!';
        };

        expect(newNode.toString(callbackFunction)).toBe('1!');
    });
});
