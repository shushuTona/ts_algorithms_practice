import { HeapSort } from '@/algorithms/sorting/heap-sort/HeapSort';
import {
    equalArr,
    notSortedArr,
    reverseArr,
    sortedArr,
    SortTester
} from '@/algorithms/sorting/SortTester';

const SORTED_ARRAY_VISITING_COUNT = 40;
const NOT_SORTED_ARRAY_VISITING_COUNT = 40;
const REVERSE_SORTED_ARRAY_VISITING_COUNT = 40;
const EQUAL_ARRAY_VISITING_COUNT = 40;

describe('HeapSort', () => {
    it('should sort array', () => {
        SortTester.testSort(HeapSort);
    });

    it('should sort array with custom comparator', () => {
        SortTester.testSortWithCustomComparator(HeapSort);
    });

    it('should sort negative numbers', () => {
        SortTester.testNegativeNumbersSort(HeapSort);
    });

    it('should visit EQUAL array element specified number of times', () => {
        SortTester.testAlgorithmTimeComplexity(
            HeapSort,
            equalArr,
            EQUAL_ARRAY_VISITING_COUNT,
        );
    });

    it('should visit SORTED array element specified number of times', () => {
        SortTester.testAlgorithmTimeComplexity(
            HeapSort,
            sortedArr,
            SORTED_ARRAY_VISITING_COUNT,
        );
    });

    it('should visit NOT SORTED array element specified number of times', () => {
        SortTester.testAlgorithmTimeComplexity(
            HeapSort,
            notSortedArr,
            NOT_SORTED_ARRAY_VISITING_COUNT,
        );
    });

    it('should visit REVERSE SORTED array element specified number of times', () => {
        SortTester.testAlgorithmTimeComplexity(
            HeapSort,
            reverseArr,
            REVERSE_SORTED_ARRAY_VISITING_COUNT,
        );
    });
});
