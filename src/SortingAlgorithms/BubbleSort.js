//bubblesort
export function getBubbleSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    bubblesort(auxiliaryArray, animations);
    return animations;
  }
  
  function bubblesort(mainArray, animations){
    for (let i = 0; i < mainArray.length; i++) {
        for (let j = 0; j < mainArray.length - i - 1; j++) {
            animations.push(["compare", j, j + 1]);
            animations.push(["revert", j, j + 1]);  
            if (mainArray[j] > mainArray[j + 1]) {
              animations.push(["swap", j, mainArray[j + 1], j + 1, mainArray[j]]);
              swap(mainArray, j, j+1);
            }
        }
    }
  }
  
  function swap(arr, firstIndex, secondIndex) {
    let temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  }