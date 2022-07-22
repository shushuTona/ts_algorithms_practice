import { Comparator, compareFunction } from "@/utils/comparator/Comparator";

interface originalCallbacksInterface<T> {
    compareCallback?: compareFunction<T>
    visitingCallback?: (item: T) => {}
}

class Sort<T> {
    public callbacks: originalCallbacksInterface<T>;
    public comparator: Comparator<T>;

    constructor(originalCallbacks?: originalCallbacksInterface<T>) {
        this.callbacks = Sort.initSortingCallbacks<T>(originalCallbacks);
        this.comparator = new Comparator(this.callbacks.compareCallback);
    }

    static initSortingCallbacks<U>(originalCallbacks?: originalCallbacksInterface<U>): originalCallbacksInterface<U> {
        const callbacks = originalCallbacks || {} as originalCallbacksInterface<U>;
        const stubCallback = () => { return {} };

        callbacks.compareCallback = callbacks.compareCallback || undefined;
        callbacks.visitingCallback = callbacks.visitingCallback || stubCallback;

        return callbacks;
    }

    sort(originalArray: T[]) {
        console.log(originalArray);

        throw new Error('sort method must be implemented');
    }
}

export { Sort, originalCallbacksInterface };
