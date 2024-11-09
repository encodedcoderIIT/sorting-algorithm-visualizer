// Import the Algorithm type from our types file
import { Algorithm } from "../types/sorting";

// Helper function to create a step in the sorting process
export const createSortingStep = (
  array: number[],
  comparing: number[] = [],
  swapping: number[] = [],
  sorted: number[] = []
) => ({
  array: [...array],
  comparing,
  swapping,
  sorted,
});

// Helper function to swap elements in an array
export const swap = (arr: number[], i: number, j: number) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

// Helper function to add delay in async functions
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Function to generate a random array
export const generateRandomArray = (
  length: number,
  min: number = 1,
  max: number = 100
): number[] => {
  return Array.from({ length }, () =>
    Math.floor(Math.random() * (max - min + 1) + min)
  );
};

// Helper function to check if array is sorted
export const isSorted = (arr: number[]): boolean => {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) return false;
  }
  return true;
};

// Available sorting algorithms and their details
export const algorithms: Record<string, Algorithm> = {
  bubble: {
    name: "Bubble Sort",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    description:
      "Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    pseudocode: `for i = 1 to n-1
  for j = 0 to n-i-1
    if arr[j] > arr[j+1]
      swap(arr[j], arr[j+1])`,
  },
  insertion: {
    name: "Insertion Sort",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    description:
      "Builds the final sorted array one item at a time, by repeatedly inserting a new element into the sorted portion of the array.",
    pseudocode: `for i = 1 to n-1
  key = arr[i]
  j = i - 1
  while j >= 0 and arr[j] > key
    arr[j+1] = arr[j]
    j = j - 1
  arr[j+1] = key`,
  },
  selection: {
    name: "Selection Sort",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    description:
      "Divides the input list into a sorted and an unsorted region, and repeatedly selects the smallest element from the unsorted region to add to the sorted region.",
    pseudocode: `for i = 0 to n-1
  min_idx = i
  for j = i+1 to n
    if arr[j] < arr[min_idx]
      min_idx = j
  swap(arr[i], arr[min_idx])`,
  },
  quick: {
    name: "Quick Sort",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(log n)",
    description:
      "Picks a 'pivot' element and partitions the array around it, recursively sorting the sub-arrays.",
    pseudocode: `quickSort(arr, low, high)
  if low < high
    pi = partition(arr, low, high)
    quickSort(arr, low, pi-1)
    quickSort(arr, pi+1, high)`,
  },
  merge: {
    name: "Merge Sort",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    description:
      "Divides the array into two halves, recursively sorts them, and then merges the sorted halves.",
    pseudocode: `mergeSort(arr)
  if length of arr <= 1
    return arr
  mid = length of arr / 2
  left = mergeSort(arr[0...mid])
  right = mergeSort(arr[mid+1...n])
  return merge(left, right)`,
  },
  heapsort: {
    name: "Heap Sort",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    description:
      "Builds a heap from the input data and then repeatedly extracts the maximum element from the heap and rebuilds the heap.",
    pseudocode: `heapSort(arr)
    buildMaxHeap(arr)
    for i = length of arr - 1 to 1
      swap(arr[0], arr[i])
      heapify(arr, 0, i)
  
    function buildMaxHeap(arr)
      for i = length of arr / 2 - 1 to 0
        heapify(arr, i, length of arr)
    
    function heapify(arr, i, n)
      largest = i
      left = 2 * i + 1
      right = 2 * i + 2
      if left < n and arr[left] > arr[largest]
        largest = left
      if right < n and arr[right] > arr[largest]
        largest = right
      if largest != i
        swap(arr[i], arr[largest])
        heapify(arr, largest, n)`,
  },
};

// Helper function to calculate delay based on array size and speed setting
export const calculateDelay = (arraySize: number, speed: number): number => {
  // Base delay is 1000ms (1 second)
  const baseDelay = 1000;
  // Adjust delay based on array size (smaller arrays = longer delays)
  const sizeFactor = Math.max(1, 16 - arraySize) / 15;
  // Adjust delay based on speed setting (higher speed = shorter delays)
  const speedFactor = (100 - speed) / 100;
  return baseDelay * sizeFactor * speedFactor;
};

// Helper to color-code elements based on their state
export const getElementColor = (
  index: number,
  comparing: number[],
  swapping: number[],
  sorted: number[]
): string => {
  if (comparing.includes(index)) return "bg-yellow-400";
  if (swapping.includes(index)) return "bg-red-400";
  if (sorted.includes(index)) return "bg-green-400";
  return "bg-blue-400";
};

// Helper function for timing operations
export const timeFunction = async <T>(
  fn: () => Promise<T>
): Promise<[T, number]> => {
  const start = performance.now();
  const result = await fn();
  const end = performance.now();
  return [result, end - start];
};

// Function to validate array input
export const validateArray = (arr: number[]): boolean => {
  if (!Array.isArray(arr)) return false;
  if (arr.length === 0 || arr.length > 15) return false;
  return arr.every(
    (num) => typeof num === "number" && !isNaN(num) && num >= 0 && num <= 100
  );
};
