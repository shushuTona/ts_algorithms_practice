import { BubbleSort } from '@/algorithms/sorting/bubble-sort/BubbleSort';
import {
    equalArr,
    notSortedArr,
    reverseArr,
    sortedArr,
    SortTester
} from '@/algorithms/sorting/SortTester';

const SORTED_ARRAY_VISITING_COUNT = 20;
const NOT_SORTED_ARRAY_VISITING_COUNT = 189;
const REVERSE_SORTED_ARRAY_VISITING_COUNT = 209;
const EQUAL_ARRAY_VISITING_COUNT = 20;

describe('BubbleSort class', () => {
    it('sort array', () => {
        SortTester.testSort(BubbleSort);
    });
    
    it('sort array with custom comparator', () => {
        SortTester.testSortWithCustomComparator(BubbleSort);
    });
    
    it('do stable sorting', () => {
        SortTester.testSortStability(BubbleSort);
    });
    
    it('sort negative numbers', () => {
        SortTester.testNegativeNumbersSort(BubbleSort);
    });
    
    it('visit EQUAL array element specified number of times', () => {
        SortTester.testAlgorithmTimeComplexity(
            BubbleSort,
            equalArr,
            EQUAL_ARRAY_VISITING_COUNT,
        );
    });
    
    it('visit SORTED array element specified number of times', () => {
        SortTester.testAlgorithmTimeComplexity(
            BubbleSort,
            sortedArr,
            SORTED_ARRAY_VISITING_COUNT,
        );
    });
    
    it('should visit NOT SORTED array element specified number of times', () => {
        SortTester.testAlgorithmTimeComplexity(
            BubbleSort,
            notSortedArr,
            NOT_SORTED_ARRAY_VISITING_COUNT,
        );
    });
    
    it('should visit REVERSE SORTED array element specified number of times', () => {
        SortTester.testAlgorithmTimeComplexity(
            BubbleSort,
            reverseArr,
            REVERSE_SORTED_ARRAY_VISITING_COUNT,
        );
    });
});
