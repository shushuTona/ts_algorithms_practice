import {
    LinkedListNode,
    toStringCallbackType
} from '@/data-structures/linked-list/LinkedListNode';

describe('LinkedListNode Test', () => {
    it('create node', () => {
        const newNode = new LinkedListNode<number>(1);

        expect(newNode.value).toBe(1);
        expect(newNode.next).toBeNull();
    });

    it('create node with obj', () => {
        const obj = {
            value: 100,
            key: 'test',
        };
        const newNode = new LinkedListNode<typeof obj>(obj);

        expect(newNode.value.value).toBe(100);
        expect(newNode.value.key).toBe('test');
        expect(newNode.next).toBeNull();
    });

    it('set next node', () => {
        const newNode2 = new LinkedListNode<number>(2);
        const newNode1 = new LinkedListNode<number>(1, newNode2);

        // newNode1
        expect(newNode1.next).toBeDefined();
        expect(newNode1.next).toBeInstanceOf(LinkedListNode);
        expect(newNode1.next?.value).toBe(2);
        expect(newNode1.next?.next).toBeNull();

        // newNode2
        expect(newNode2.value).toBe(2);
        expect(newNode2.next).toBeNull();
    });

    it('execute toString method', () => {
        const newNode = new LinkedListNode<number>(1);

        expect(newNode.toString()).toBe('1');
        
        newNode.value = 100;
        expect(newNode.toString()).toBe('100');
    });

    it('execute toString method with callback function', () => {
        const newNode = new LinkedListNode<number>(1);
        const callbackFunction: toStringCallbackType<number> = (value) => {
            return value + '!';
        };

        expect(newNode.toString(callbackFunction)).toBe('1!');
    });
});
