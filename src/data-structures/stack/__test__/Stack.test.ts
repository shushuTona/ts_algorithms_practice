import { Stack } from '@/data-structures/stack/Stack';

describe('Stack test', () => {
    let stack: Stack<number>;

    beforeEach(() => {
        stack = new Stack<number>();
    });

    it('empty stack', () => {
        expect(stack.isEmpty()).toBeTruthy();
    });

    it('check stack peek', () => {
        expect(stack.peek()).toBeNull();
        
        stack.push(1);
        expect(stack.peek()).toBe(1);

        stack.push(2);
        expect(stack.peek()).toBe(2);
    });

    it('push value to stack', () => {
        stack.push(1);
        stack.push(2);
        stack.push(3);

        expect(stack.toString()).toBe('3,2,1');
    });

    it('pop value from stack', () => {
        stack.push(1);
        stack.push(2);
        stack.push(3);

        expect(stack.toString()).toBe('3,2,1');
        
        stack.pop();
        expect(stack.toString()).toBe('2,1');

        stack.pop();
        expect(stack.toString()).toBe('1');

        stack.pop();
        expect(stack.isEmpty).toBeTruthy();
    });

    it('stack toArray', () => {
        stack.push(1);
        stack.push(2);
        stack.push(3);

        expect(stack.toArray()).toEqual([3,2,1]);
    });

    it('stack toString', () => {
        stack.push(1);
        stack.push(2);
        stack.push(3);

        expect(stack.toString()).toBe('3,2,1');
    });
});