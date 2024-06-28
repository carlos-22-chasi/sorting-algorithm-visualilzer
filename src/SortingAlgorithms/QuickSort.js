//quicksort
export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    quicksort(auxiliaryArray, 0, auxiliaryArray.length - 1, animations);
    return animations;
  }
  
  function quicksort(mainArray, startIdx, endIdx, animations) {
    if (startIdx < endIdx) {
      const pivotIdx = partition(mainArray, startIdx, endIdx, animations);
      quicksort(mainArray, startIdx, pivotIdx - 1, animations);
      quicksort(mainArray, pivotIdx + 1, endIdx, animations);
    }
  }
  
  function partition(mainArray, startIdx, endIdx, animations) {
    const pivot = mainArray[endIdx];
    let i = startIdx - 1;
  
    for (let j = startIdx; j < endIdx; j++) {
      animations.push(["compare", j, endIdx]);
      animations.push(["revert", j, endIdx]);
  
      if (mainArray[j] <= pivot) {
        i++;
        animations.push(["swap", i, mainArray[j], j, mainArray[i]]);
        swap(mainArray, i, j);
      }
    }
    animations.push(["swap", i + 1, mainArray[endIdx], endIdx, mainArray[i + 1]]);
    swap(mainArray, i + 1, endIdx);
    return i + 1;
  }
  
  function swap(arr, firstIndex, secondIndex) {
    let temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  }