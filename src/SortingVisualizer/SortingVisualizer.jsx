import React from 'react';
import {getMergeSortAnimations} from '../SortingAlgorithms/MergeSort.js';
import {getQuickSortAnimations} from '../SortingAlgorithms/QuickSort.js';

import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 500;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 10;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    // const array = [50,200,100,400,400,330,600,210,250,50];
    // 50, 50, 100, 200, 210, 250, 330, 400, 400, 700
    const array = []
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(20, 670));
    }
    this.setState({array});
  }

  mergeSort() {
    const nameHeader = document.getElementById('name-holder');
    nameHeader.textContent = 'Merge Sort';

    const animations = getMergeSortAnimations(this.state.array);
    console.log(animations.length);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barOneValue = arrayBars[barOneIdx];
          barOneStyle.height = `${newHeight}px`;
          barOneValue.textContent = newHeight;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    const nameHeader = document.getElementById('name-holder');
    nameHeader.textContent = 'Quick Sort';

    const animations = getQuickSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [action, barOneIdx, barTwoIdx] = animations[i];
      if (action === "compare" || action === "revert") {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = action === "compare" ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else if (action === "swap") {
        const [barOneIdx, newHeightOne, barTwoIdx, newHeightTwo] = [animations[i][1], animations[i][2], animations[i][3], animations[i][4]];
        setTimeout(() => {
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const barOneValue = arrayBars[barOneIdx];
            const barTwoValue = arrayBars[barTwoIdx];

            barOneStyle.height = `${newHeightOne}px`;
            barTwoStyle.height = `${newHeightTwo}px`;
            barOneValue.textContent = newHeightOne;
            barTwoValue.textContent = newHeightTwo;
          
          
        }, i * ANIMATION_SPEED_MS);
      }
    } 
  }

  heapSort() {
    
  }

  bubbleSort() {
    
  }

  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }

  render() {
    const {array} = this.state;

    return (
        <div className='main-container'>
            <div id='name-holder'>Sorting Algorithm Visualizer</div>
            <div className="array-container">
                {array.map((value, idx) => (
                <div className="array-bar" key={idx} 
                style={{
                        backgroundColor: PRIMARY_COLOR,
                        height: `${value}px`,
                    }}>
                        {value}
                    </div>
                ))}
                </div>

            <div className='button-container'>
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
                <button onClick={() => this.heapSort()}>Heap Sort</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button onClick={() => this.testSortingAlgorithms()}>
                Test Sorting Algorithms (BROKEN)
                </button>
            </div>
        </div>
    
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}


