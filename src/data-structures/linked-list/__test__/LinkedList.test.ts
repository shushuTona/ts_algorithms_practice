import { LinkedList } from '../LinkedList';

describe('LinkedList Number node Test', () => {
    it('create empty linkedList', () => {
        const linkedList = new LinkedList<number>();

        expect(linkedList.head).toBeNull();
        expect(linkedList.tail).toBeNull();
        expect(linkedList.toString()).toBe('');
    });

    it('prepend node', () => {
        const linkedList = new LinkedList<number>();

        linkedList.prepend(1);
        linkedList.prepend(2);

        expect(linkedList.head?.value).toBe(2);
        expect(linkedList.tail?.value).toBe(1);
        expect(linkedList.toString()).toBe('2,1');
        expect(linkedList.tail?.next).toBeNull();
    });

    it('append node', () => {
        const linkedList = new LinkedList<number>();

        linkedList.append(1);
        linkedList.append(2);

        expect(linkedList.head?.value).toBe(1);
        expect(linkedList.tail?.value).toBe(2);
        expect(linkedList.toString()).toBe('1,2');
        expect(linkedList.tail?.next).toBeNull();
    });

    it('insert node', () => {
        const linkedList = new LinkedList<number>();

        linkedList.insert(1, 3);
        expect(linkedList.head?.value).toBe(1);
        expect(linkedList.tail?.value).toBe(1);
        
        linkedList.insert(2, 3);
        linkedList.insert(3, 3);
        linkedList.insert(0, -1);
        expect(linkedList.toString()).toBe('0,1,2,3');
    });

    it('delete node', () => {
        const linkedList = new LinkedList<number>();

        linkedList.prepend(1);
        linkedList.prepend(2);
        linkedList.prepend(3);
        linkedList.prepend(4);
        linkedList.prepend(1);
        expect(linkedList.toString()).toBe('1,4,3,2,1');

        linkedList.delete(1);     
        expect(linkedList.head?.toString()).toBe('4');
        expect(linkedList.tail?.toString()).toBe('2');

        linkedList.delete(2);
        expect(linkedList.head?.toString()).toBe('4');
        expect(linkedList.tail?.toString()).toBe('3');

        linkedList.delete(3);
        expect(linkedList.head?.toString()).toBe('4');
        expect(linkedList.tail?.toString()).toBe('4');

        linkedList.delete(3);
        expect(linkedList.head?.toString()).toBe('4');
        expect(linkedList.tail?.toString()).toBe('4');

        linkedList.delete(4);
        expect(linkedList.head).toBeNull();
        expect(linkedList.tail).toBeNull();
    });

    it('find node', () => {
        const linkedList = new LinkedList<number>();

        expect(linkedList.find({value: 1 })).toBeNull();

        linkedList.append(1);
        expect(linkedList.find({value: 1 })).toBeDefined();
        
        linkedList.append(2);
        linkedList.append(3);
        
        const node = linkedList.find({value: 2 });
        expect(node?.value).toBe(2);
    });

    it('deleteTail node', () => {
        const linkedList = new LinkedList<number>();

        expect(linkedList.deleteTail()).toBeNull();

        linkedList.append(1);
        linkedList.append(2);
        linkedList.append(3);

        const deleteNode1 = linkedList.deleteTail();

        expect(deleteNode1?.value).toBe(3);
        expect(linkedList.toString()).toBe('1,2');
        expect(linkedList.head?.value).toBe(1);
        expect(linkedList.tail?.value).toBe(2);

        const deleteNode2 = linkedList.deleteTail();

        expect(deleteNode2?.value).toBe(2);
        expect(linkedList.toString()).toBe('1');
        expect(linkedList.head?.value).toBe(1);
        expect(linkedList.tail?.value).toBe(1);

        const deleteNode3 = linkedList.deleteTail();

        expect(deleteNode3?.value).toBe(1);
        expect(linkedList.toString()).toBe('');
        expect(linkedList.head).toBeNull();
        expect(linkedList.tail).toBeNull();
    });

    it('deleteHead node', () => {
        const linkedList = new LinkedList<number>();

        expect(linkedList.deleteHead()).toBeNull();

        linkedList.append(1);
        linkedList.append(2);
        linkedList.append(3);

        const deleteNode1 = linkedList.deleteHead();

        expect(deleteNode1?.value).toBe(1);
        expect(linkedList.toString()).toBe('2,3');
        expect(linkedList.head?.value).toBe(2);
        expect(linkedList.tail?.value).toBe(3);

        const deleteNode2 = linkedList.deleteHead();

        expect(deleteNode2?.value).toBe(2);
        expect(linkedList.toString()).toBe('3');
        expect(linkedList.head?.value).toBe(3);
        expect(linkedList.tail?.value).toBe(3);

        const deleteNode3 = linkedList.deleteHead();

        expect(deleteNode3?.value).toBe(3);
        expect(linkedList.toString()).toBe('');
        expect(linkedList.head).toBeNull();
        expect(linkedList.tail).toBeNull();
    });

    it('node fromArray', () => {
        const linkedList = new LinkedList<number>();

        linkedList.fromArray([1, 1, 2, 3, 3, 3, 4, 5]);

        expect(linkedList.head?.value).toBe(1);
        expect(linkedList.tail?.value).toBe(5);
        expect(linkedList.toString()).toBe('1,1,2,3,3,3,4,5');
    });

    it('node toArray', () => {
        const linkedList = new LinkedList<number>();

        linkedList.append(1);
        linkedList.append(2);
        linkedList.append(3);

        expect(linkedList.toArray().join(',')).toBe('1,2,3');
    });

    it('default toString node', () => {
        const linkedList = new LinkedList<number>();

        linkedList.append(1);
        linkedList.append(2);
        linkedList.append(3);

        expect(linkedList.toString()).toBe('1,2,3');
    });

    it('custom toString node', () => {
        const linkedList = new LinkedList<number>();

        linkedList.append(1);
        linkedList.append(2);
        linkedList.append(3);

        const callback = (value: number) => {
            return `${value}!`;
        };

        expect(linkedList.toString(callback)).toBe('1!,2!,3!');
    });

    it('reverse node', () => {
        const linkedList = new LinkedList<number>();

        linkedList.append(1);
        linkedList.append(2);
        linkedList.append(3);
        expect(linkedList.toString()).toBe('1,2,3');
        expect(linkedList.head?.value).toBe(1);
        expect(linkedList.tail?.value).toBe(3);

        linkedList.reverse();
        expect(linkedList.toString()).toBe('3,2,1');
        expect(linkedList.head?.value).toBe(3);
        expect(linkedList.tail?.value).toBe(1);

        linkedList.reverse();
        expect(linkedList.toString()).toBe('1,2,3');
        expect(linkedList.head?.value).toBe(1);
        expect(linkedList.tail?.value).toBe(3);
    });
});

describe('LinkedList Object node test', () => {
    interface testObj {
        id: number,
        name: string,
    }

    const compareFunction = (a: testObj, b: testObj): number => {
        if(
            a.id === b.id &&
            a.name === b.name
        ){
            return 0;
        }

        return a.id < b.id ? -1 : 1;
    };

    const callback = (value: testObj) => {
        return `${value.id}:${value.name}`;
    };

    it('prepend node', () => {
        const linkedList = new LinkedList<testObj>();

        linkedList.prepend({id: 1, name: 'test1'});
        linkedList.prepend({id: 2, name: 'test2'});

        expect(linkedList.head?.value.id).toBe(2);
        expect(linkedList.head?.value.name).toBe('test2');
        expect(linkedList.tail?.value.id).toBe(1);
        expect(linkedList.tail?.value.name).toBe('test1');
        expect(linkedList.toString(callback)).toBe('2:test2,1:test1');
        expect(linkedList.tail?.next).toBeNull();
    });

    it('append node', () => {
        const linkedList = new LinkedList<testObj>();

        linkedList.append({id: 1, name: 'test1'});
        linkedList.append({id: 2, name: 'test2'});

        expect(linkedList.head?.value.id).toBe(1);
        expect(linkedList.head?.value.name).toBe('test1');
        expect(linkedList.tail?.value.id).toBe(2);
        expect(linkedList.tail?.value.name).toBe('test2');
        expect(linkedList.toString(callback)).toBe('1:test1,2:test2');
        expect(linkedList.tail?.next).toBeNull();
    });

    it('insert node', () => {
        const linkedList = new LinkedList<testObj>();

        linkedList.insert({id: 1, name: 'test1'}, 3);
        expect(linkedList.head?.value.id).toBe(1);
        expect(linkedList.tail?.value.name).toBe('test1');
        
        linkedList.insert({id: 2, name: 'test2'}, 3);
        linkedList.insert({id: 3, name: 'test3'}, 3);
        linkedList.insert({id: 4, name: 'test4'}, -1);
        expect(linkedList.toString(callback)).toBe('4:test4,1:test1,2:test2,3:test3');
    });

    it('delete node', () => {
        const linkedList = new LinkedList<testObj>(compareFunction);

        linkedList.prepend({id: 1, name: 'test1'});
        linkedList.prepend({id: 2, name: 'test2'});
        linkedList.prepend({id: 3, name: 'test3'});
        linkedList.prepend({id: 4, name: 'test4'});
        linkedList.prepend({id: 1, name: 'test1'});
        expect(linkedList.toString(callback)).toBe('1:test1,4:test4,3:test3,2:test2,1:test1');
        
        linkedList.delete({id: 1, name: 'test1'});     
        expect(linkedList.toString(callback)).toBe('4:test4,3:test3,2:test2');
        expect(linkedList.head?.value.id).toBe(4);
        expect(linkedList.tail?.value.id).toBe(2);
        
        // not delete so name is 'test1'.
        linkedList.delete({id: 2, name: 'test1'});
        expect(linkedList.toString(callback)).toBe('4:test4,3:test3,2:test2');
        expect(linkedList.head?.value.id).toBe(4);
        expect(linkedList.tail?.value.id).toBe(2);

        linkedList.delete({id: 2, name: 'test2'});
        expect(linkedList.toString(callback)).toBe('4:test4,3:test3');
        expect(linkedList.head?.value.id).toBe(4);
        expect(linkedList.tail?.value.id).toBe(3);

        linkedList.delete({id: 3, name: 'test3'});
        expect(linkedList.toString(callback)).toBe('4:test4');
        expect(linkedList.head?.value.id).toBe(4);
        expect(linkedList.tail?.value.id).toBe(4);

        linkedList.delete({id: 4, name: 'test4'});
        expect(linkedList.toString(callback)).toBe('');
        expect(linkedList.head).toBeNull();
        expect(linkedList.tail).toBeNull();
    });

    it('find node', () => {
        const linkedList = new LinkedList<testObj>(compareFunction);

        expect(linkedList.find({
            value: {
                id: 1,
                name: 'test1'
            }
        })).toBeNull();

        linkedList.append({id: 1, name: 'test1'});
        expect(linkedList.find({
            value: {
                id: 1,
                name: 'test1'
            }
        })).toBeDefined();
        
        linkedList.append({id: 2, name: 'test2'});
        linkedList.append({id: 3, name: 'test3'});
        
        const node = linkedList.find({
            value: {
                id: 2,
                name: 'test2'
            }
        });
        expect(node?.value.id).toBe(2);
    });

    it('node fromArray', () => {
        const linkedList = new LinkedList<testObj>(compareFunction);

        linkedList.fromArray([
            {id: 1, name: 'test1'},
            {id: 2, name: 'test2'},
            {id: 3, name: 'test3'},
            {id: 4, name: 'test4'},
            {id: 5, name: 'test5'},
        ]);

        expect(linkedList.head?.value.id).toBe(1);
        expect(linkedList.tail?.value.id).toBe(5);
        expect(linkedList.toString(callback)).toBe('1:test1,2:test2,3:test3,4:test4,5:test5');
    });

    it('node toArray', () => {
        const linkedList = new LinkedList<testObj>(compareFunction);

        linkedList.append({id: 1, name: 'test1'});
        linkedList.append({id: 2, name: 'test2'});
        linkedList.append({id: 3, name: 'test3'});

        expect(linkedList.toArray().length).toBe(3);
        expect(linkedList.toArray()[0]?.value.id).toBe(1);
        expect(linkedList.toArray()[1]?.value.id).toBe(2);
        expect(linkedList.toArray()[2]?.value.id).toBe(3);
    });
});
