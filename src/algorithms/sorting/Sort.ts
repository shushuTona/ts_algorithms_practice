import { Comparator, compareFunction } from "@/utils/comparator/Comparator";

interface originalCallbacksInterface<T> {
    compareCallback?: compareFunction<T>
    visitingCallback?: () => {}
}

class Sort<T> {
    public callbacks: originalCallbacksInterface<T>;
    public comparator: Comparator<T>;

    constructor(originalCallbacks?: originalCallbacksInterface<T>) {
        this.callbacks = Sort.initSortingCallbacks(originalCallbacks);
        this.comparator = new Comparator(this.callbacks.compareCallback);
    }

    static initSortingCallbacks(originalCallbacks?: originalCallbacksInterface<any>): originalCallbacksInterface<any> {
        const callbacks = originalCallbacks || {};
        const stubCallback = () => { return {} };

        callbacks.compareCallback = callbacks.compareCallback || undefined;
        callbacks.visitingCallback = callbacks.visitingCallback || stubCallback;

        return callbacks;
    }

    sort() {
        throw new Error('sort method must be implemented');
    }
}

export default Sort;
