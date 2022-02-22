import { DoublyLinkedList } from '@/data-structures/doubly-linked-list/DoublyLinkedList';

describe('DoublyLinkedList test', () => {
    it('create empty DoublyLinkedList', () => {
        const linkedList = new DoublyLinkedList<number>();

        expect(linkedList.head).toBeNull();
        expect(linkedList.tail).toBeNull();
        expect(linkedList.toString()).toBe('');
    });

    it('prepend node', () => {
        const linkedList = new DoublyLinkedList<number>();

        linkedList.prepend(1);
        linkedList.prepend(2);
        linkedList.prepend(3);

        expect(linkedList.head?.value).toBe(3);
        expect(linkedList.head?.previous).toBeNull();
        expect(linkedList.head?.next?.value).toBe(2);

        expect(linkedList.tail?.value).toBe(1);
        expect(linkedList.tail?.previous?.value).toBe(2);
        expect(linkedList.tail?.next).toBeNull();

        expect(linkedList.toString()).toBe('3,2,1');
    });

    it('append node', () => {
        const linkedList = new DoublyLinkedList<number>();

        linkedList.append(1);
        linkedList.append(2);
        linkedList.append(3);

        expect(linkedList.head?.value).toBe(1);
        expect(linkedList.head?.previous).toBeNull();
        expect(linkedList.head?.next?.value).toBe(2);

        expect(linkedList.tail?.value).toBe(3);
        expect(linkedList.tail?.previous?.value).toBe(2);
        expect(linkedList.tail?.next).toBeNull();

        expect(linkedList.toString()).toBe('1,2,3');
    });

    it('delete node', () => {
        const linkedList = new DoublyLinkedList<number>();

        linkedList.append(1);
        linkedList.append(2);
        linkedList.append(3);

        expect(linkedList.toString()).toBe('1,2,3');

        linkedList.delete(2);

        expect(linkedList.head?.value).toBe(1);
        expect(linkedList.head?.previous).toBeNull();
        expect(linkedList.head?.next?.value).toBe(3);

        expect(linkedList.tail?.value).toBe(3);
        expect(linkedList.tail?.previous?.value).toBe(1);
        expect(linkedList.tail?.next).toBeNull();

        expect(linkedList.toString()).toBe('1,3');
    });

    it('find node', () => {
        const linkedList = new DoublyLinkedList<number>();

        linkedList.append(1);
        linkedList.append(2);
        linkedList.append(3);

        expect(linkedList.toString()).toBe('1,2,3');

        expect(linkedList.find({value: 100})).toBeNull();
        expect(linkedList.find({value: 3})).toBeDefined();

        const findNode = linkedList.find({value: 2});

        expect(findNode?.value).toBe(2);
    });

    it('deleteTail node', () => {
        const linkedList = new DoublyLinkedList<number>();

        linkedList.append(1);
        linkedList.append(2);
        linkedList.append(3);

        expect(linkedList.toString()).toBe('1,2,3');

        linkedList.deleteTail();

        expect(linkedList.toString()).toBe('1,2');
    });

    it('deleteHead node', () => {
        const linkedList = new DoublyLinkedList<number>();

        linkedList.append(1);
        linkedList.append(2);
        linkedList.append(3);

        expect(linkedList.toString()).toBe('1,2,3');

        linkedList.deleteHead();

        expect(linkedList.toString()).toBe('2,3');
    });

    it('toArray node', () => {
        const linkedList = new DoublyLinkedList<number>();

        linkedList.append(1);
        linkedList.append(2);
        linkedList.append(3);

        expect(linkedList.toString()).toBe('1,2,3');

        const nodes = linkedList.toArray();
        expect(nodes.length).toBe(3);
        expect(nodes[0]?.value).toBe(1);
    });

    it('fromArray node', () => {
        const linkedList = new DoublyLinkedList<number>();

        expect(linkedList.toString()).toBe('');

        linkedList.fromArray([100, 200, 300, 400, 500]);

        expect(linkedList.toString()).toBe('100,200,300,400,500');
    });

    it('reverse node', () => {
        const linkedList = new DoublyLinkedList<number>();

        linkedList.append(1);
        linkedList.append(2);
        linkedList.append(3);
        linkedList.append(4);
        linkedList.append(5);

        expect(linkedList.toString()).toBe('1,2,3,4,5');
        
        linkedList.reverse();

        expect(linkedList.toString()).toBe('5,4,3,2,1');
    });
});
