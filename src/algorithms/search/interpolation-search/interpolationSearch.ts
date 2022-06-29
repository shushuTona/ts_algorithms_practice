const interpolationSearch = (sortedArray: number[], seekElement: number) => {
    let leftIndex = 0;
    let rightIndex = sortedArray.length - 1;

    let rightElement = sortedArray[rightIndex];
    let leftElement = sortedArray[leftIndex];
    while(
        leftIndex <= rightIndex &&
        rightElement &&
        leftElement
    ) {
        const rangeDelta = rightElement - leftElement;
        const indexDelta = rightElement - leftElement;
        const valueDelta = seekElement - leftElement;

        if(
            valueDelta < 0
        ){
            return -1;
        }

        if(
            !rangeDelta
        ) {
            return leftElement === seekElement ? leftElement : -1;
        }

        const middleIndex = leftIndex + Math.floor((valueDelta * indexDelta) / rangeDelta);
        const middleElement = sortedArray[middleIndex];
        if(
            middleElement === seekElement
        ) {
            return middleIndex;
        }

        if(
            middleElement &&
            middleElement < seekElement
        ){
            leftIndex = middleIndex + 1;
        } else {
            rightIndex = middleIndex - 1;
        }

        rightElement = sortedArray[rightIndex];
        leftElement = sortedArray[leftIndex];
    }

    return -1;
}

export default interpolationSearch;
