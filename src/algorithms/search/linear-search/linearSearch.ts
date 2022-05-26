import { Comparator, compareFunction } from '@/utils/comparator/Comparator';

const linearSearch = <T>(list: T[], seekElem: T, comparatorCallback: compareFunction<T>): number[] => {
    const comparator = new Comparator<T>(comparatorCallback);
    const foundIndexList: number[] = [];

    list.forEach((elem, index) => {
        if(
            comparator.equal(elem, seekElem)
        ) {
            foundIndexList.push(index);
        }
    });

    return foundIndexList;
};

export default linearSearch;
